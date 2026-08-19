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

// POST /lost-records — admin only
router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    let {
      itemId,
      quantity,
      cadetName,
      kitNumber,
      wing,
      teamName,
      event,
      notes,
    } = req.body;

    let itemCheck = await db.query(
      `SELECT items.id, items.name, categories.name AS category
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

    // kit_number is stored as raw text on lost_records, but we still register it
    // in the kit_numbers lookup table so it shows up in future dropdowns
    if (kitNumber) {
      await findOrCreateLookup("kit_numbers", kitNumber, "number");
    }

    let data = await db.query(
      `INSERT INTO lost_records
    (item_id, item_name_snapshot, quantity, date, reported_by, status, notes, cadet_name, kit_number, wing_id, team_name, event)
   VALUES ($1, $2, $3, CURRENT_DATE, $4, 'Pending Replacement', $5, $6, $7, $8, $9, $10)
   RETURNING *`,
      [
        itemId,
        item.name,
        quantity,
        req.user.id,
        notes || null,
        cadetName || null,
        kitNumber || null,
        wingId,
        item.category === "Team" ? teamName : null,
        event || null,
      ],
    );

    res.status(201).json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /lost-records — both roles, filterable
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
      conditions.push(`lost_records.date >= $${paramIndex}`);
      values.push(startDate);
      paramIndex++;
    }
    if (endDate) {
      conditions.push(`lost_records.date <= $${paramIndex}`);
      values.push(endDate);
      paramIndex++;
    }

    let query = `
      SELECT lost_records.*, categories.name AS category, sports.name AS sport, wings.name AS wing
      FROM lost_records
      JOIN items ON lost_records.item_id = items.id
      LEFT JOIN categories ON items.category_id = categories.id
      LEFT JOIN sports ON items.sport_id = sports.id
      LEFT JOIN wings ON lost_records.wing_id = wings.id
    `;

    if (conditions.length > 0) query += ` WHERE ` + conditions.join(" AND ");

    let data = await db.query(query, values);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /lost-records/:id/replace — admin only, transactional
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
