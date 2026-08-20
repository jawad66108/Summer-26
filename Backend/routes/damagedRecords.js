import express from "express";
import db from "../DB/connection.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

let router = express.Router();

router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    let { itemId, quantity, damageDescription, repairStatus, notes } = req.body;

    let itemCheck = await db.query(`SELECT id, name FROM items WHERE id = $1`, [
      itemId,
    ]);
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ msg: "Item not found" });
    }
    let item = itemCheck.rows[0];

    let data = await db.query(
      `INSERT INTO damaged_records
        (item_id, item_name_snapshot, quantity, date, reported_by, status, notes, damage_description, repair_status)
       VALUES ($1, $2, $3, CURRENT_DATE, $4, 'Pending Replacement', $5, $6, $7)
       RETURNING *`,
      [
        itemId,
        item.name,
        quantity,
        req.user.id,
        notes || null,
        damageDescription || null,
        repairStatus || null,
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
      conditions.push(`damaged_records.status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }
    if (startDate) {
      conditions.push(`damaged_records.date >= $${paramIndex}`);
      values.push(startDate);
      paramIndex++;
    }
    if (endDate) {
      conditions.push(`damaged_records.date <= $${paramIndex}`);
      values.push(endDate);
      paramIndex++;
    }

    let query = `
      SELECT damaged_records.*, categories.name AS category, sports.name AS sport
      FROM damaged_records
      JOIN items ON damaged_records.item_id = items.id
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
      `UPDATE damaged_records SET status = 'Replaced' WHERE id = $1 RETURNING *`,
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
