import express from "express";
import db from "../DB/connection.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

let router = express.Router();

router.get("/summary", authenticate, async (req, res) => {
  try {
    // 1. total items
    let totalItemsResult = await db.query(
      `SELECT COUNT(*) AS total FROM items`,
    );
    let totalItems = parseInt(totalItemsResult.rows[0].total);

    // 2. pending replacements count (lost + damaged combined)
    let pendingCountResult = await db.query(`
      SELECT COUNT(*) AS total FROM (
        SELECT id FROM lost_records WHERE status = 'Pending Replacement'
        UNION ALL
        SELECT id FROM damaged_records WHERE status = 'Pending Replacement'
      ) AS pending
    `);
    let pendingReplacements = parseInt(pendingCountResult.rows[0].total);

    // 3. estimated purchase cost — quantity * item price, summed across pending records
    let costResult = await db.query(`
      SELECT COALESCE(SUM(combined.quantity * items.current_price), 0) AS total_cost
      FROM (
        SELECT item_id, quantity FROM lost_records WHERE status = 'Pending Replacement'
        UNION ALL
        SELECT item_id, quantity FROM damaged_records WHERE status = 'Pending Replacement'
      ) AS combined
      JOIN items ON combined.item_id = items.id
    `);
    let estimatedCost = parseFloat(costResult.rows[0].total_cost);

    // 4. low-stock items
    let lowStockResult = await db.query(`
      SELECT items.id, items.name, items.total_quantity, items.low_stock_threshold,
             categories.name AS category
      FROM items
      LEFT JOIN categories ON items.category_id = categories.id
      WHERE items.total_quantity < items.low_stock_threshold
      ORDER BY items.total_quantity ASC
    `);

    res.json({
      totalItems,
      pendingReplacements,
      estimatedPurchaseCost: estimatedCost,
      lowStockItems: lowStockResult.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
