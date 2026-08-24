import express from "express";
import db from "../DB/connection.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { authenticate } from "../middleware/authenticate.js";
import { createItemSchema } from "../validators/itemSchemas.js";

let router = express.Router();

router.get("/items", async (req, res) => {
  try {
    let { category, sport, search } = req.query;

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

    if (search) {
      conditions.push(`items.name ILIKE $${paramIndex}`);
      values.push(`%${search}%`);
      paramIndex++;
    }

    let query = `
      SELECT items.*, brands.name AS brand, categories.name AS category,
             sports.name AS sport, units.name AS unit
      FROM items
      LEFT JOIN brands ON items.brand_id = brands.id
      LEFT JOIN categories ON items.category_id = categories.id
      LEFT JOIN sports ON items.sport_id = sports.id
      LEFT JOIN units ON items.unit_id = units.id
    `;

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    let data = await db.query(query, values);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    let ID = req.params.id;

    let data = await db.query(`SELECT * FROM items WHERE id = $1`, [ID]);

    if (data.rows.length === 0) {
      return res.status(404).json({ msg: "Invalid ID" });
    }

    res.json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

async function findOrCreateLookup(table, name) {
  let existing = await db.query(`SELECT id FROM ${table} WHERE name = $1`, [
    name,
  ]);
  if (existing.rows.length > 0) return existing.rows[0].id;

  let created = await db.query(
    `INSERT INTO ${table} (name) VALUES ($1) RETURNING id`,
    [name],
  );
  return created.rows[0].id;
}

// single, validated POST /items — old duplicate removed
router.post("/items", authenticate, requireAdmin, async (req, res) => {
  try {
    let parsed = createItemSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    let { name, brand, category, sport, unit, quantity, threshold } =
      parsed.data;

    let brandId = await findOrCreateLookup("brands", brand);
    let categoryId = await findOrCreateLookup("categories", category);
    let sportId = await findOrCreateLookup("sports", sport);
    let unitId = await findOrCreateLookup("units", unit);

    let data = await db.query(
      `INSERT INTO items (name, brand_id, category_id, sport_id, unit_id, quantity, threshold)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, brandId, categoryId, sportId, unitId, quantity, threshold],
    );

    res.status(201).json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/items/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    let ID = req.params.id;

    let data = await db.query(`DELETE FROM items WHERE id = $1 RETURNING *`, [
      ID,
    ]);

    if (data.rows.length === 0) {
      return res.status(404).json({ msg: "Invalid ID" });
    }

    res.json({ msg: "Item deleted", item: data.rows[0] });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/lookups/:field", async (req, res) => {
  try {
    let { field } = req.params;
    let allowed = ["brands", "categories", "sports", "units"];

    if (!allowed.includes(field)) {
      return res.status(400).json({ msg: "Invalid lookup field" });
    }

    let data = await db.query(`SELECT * FROM ${field}`);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
