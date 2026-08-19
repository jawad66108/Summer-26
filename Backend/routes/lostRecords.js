import express from "express";
import db from "../DB/connection.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

let router = express.Router();

async function findOrCreateLookup(table, value, column = "name") {
  let existing = await db.query(
    `SELECT id FROM ${table} WHERE ${column} = $1`,
    [value],
  );
  if (existing.rows.length > 0) return existing.rows[0].id;

  let created = await db.query(
    `INSERT INTO ${table} (${column}) VALUES ($1) RETURNING id`,
    [value],
  );
  return created.rows[0].id;
}

router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    let { itemId, quantity, wing, kitNumber, teamName } = req.body;

    // check the item's category to decide if teamName is required
    let itemCheck = await db.query(
      `SELECT items.id, categories.name AS category
       FROM items
       JOIN categories ON items.category_id = categories.id
       WHERE items.id = $1`,
      [itemId],
    );

    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ msg: "Item not found" });
    }

    let item = itemCheck.rows[0];

    if (item.category === "Team" && !teamName) {
      return res
        .status(400)
        .json({ msg: "teamName is required for Team category items" });
    }

    let wingId = wing ? await findOrCreateLookup("wings", wing) : null;
    let kitNumberId = kitNumber
      ? await findOrCreateLookup("kit_numbers", kitNumber, "number")
      : null;

    let data = await db.query(
      `INSERT INTO lost_records (item_id, quantity, status, team_name, wing_id, kit_number_id, reported_date)
       VALUES ($1, $2, 'Lost', $3, $4, $5, NOW())
       RETURNING *`,
      [
        itemId,
        quantity,
        item.category === "Team" ? teamName : null,
        wingId,
        kitNumberId,
      ],
    );

    res.status(201).json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    let { category, sport, status, startDate, endDate } = req.query;

    let conditions = [];
    let values = [];
    let paramIndex = 1;

    if (category) {
      conditions.push(`categories.name = $${paramIndex}`);
      values.push(category);
      paramIndex++;
    }
    if (sport) {
      conditions.push(`sports.name = $${paramIndex}`);
      values.push(sport);
      paramIndex++;
    }
    if (status) {
      conditions.push(`lost_records.status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }
    if (startDate) {
      conditions.push(`lost_records.reported_date >= $${paramIndex}`);
      values.push(startDate);
      paramIndex++;
    }
    if (endDate) {
      conditions.push(`lost_records.reported_date <= $${paramIndex}`);
      values.push(endDate);
      paramIndex++;
    }

    let query = `
      SELECT lost_records.*, items.name AS item_name,
             categories.name AS category, sports.name AS sport
      FROM lost_records
      JOIN items ON lost_records.item_id = items.id
      LEFT JOIN categories ON items.category_id = categories.id
      LEFT JOIN sports ON items.sport_id = sports.id
    `;

    if (conditions.length > 0) query += ` WHERE ` + conditions.join(" AND ");

    let data = await db.query(query, values);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/replace", authenticate, requireAdmin, async (req, res) => {
  let client = await db.connect();
  try {
    let ID = req.params.id;

    await client.query("BEGIN");

    let updatedRecord = await client.query(
      `UPDATE lost_records SET status = 'Replaced' WHERE id = $1 RETURNING *`,
      [ID],
    );

    if (updatedRecord.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ msg: "Invalid ID, try again" });
    }

    let itemId = updatedRecord.rows[0].item_id;

    let updatedItem = await client.query(
      `UPDATE items SET total_quantity = total_quantity + 1 WHERE id = $1 RETURNING *`,
      [itemId],
    );

    await client.query("COMMIT");

    res.json({
      msg: "Status updated successfully",
      record: updatedRecord.rows[0],
      item: updatedItem.rows[0],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;
