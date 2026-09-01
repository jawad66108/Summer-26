import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import db from "../DB/connection.js";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

let router = express.Router();

router.get("/lost-damaged", authenticate, async (req, res) => {
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
      conditions.push(`combined.status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }
    if (startDate) {
      conditions.push(`combined.date >= $${paramIndex}`);
      values.push(startDate);
      paramIndex++;
    }
    if (endDate) {
      conditions.push(`combined.date <= $${paramIndex}`);
      values.push(endDate);
      paramIndex++;
    }

    let query = `
  SELECT combined.*, categories.name AS category, sports.name AS sport, wings.name AS wing
  FROM (
    SELECT id, item_id, item_name_snapshot AS item_name, quantity, date, status,
           cadet_name, wing_id, 'Lost' AS type
    FROM lost_records
    UNION ALL
    SELECT id, item_id, item_name_snapshot AS item_name, quantity, date, status,
           NULL AS cadet_name, NULL AS wing_id, 'Damaged' AS type
    FROM damaged_records
  ) AS combined
  JOIN items ON combined.item_id = items.id
  LEFT JOIN categories ON items.category_id = categories.id
  LEFT JOIN sports ON items.sport_id = sports.id
  LEFT JOIN wings ON combined.wing_id = wings.id
`;

    if (conditions.length > 0) query += ` WHERE ` + conditions.join(" AND ");
    query += ` ORDER BY combined.date DESC`;

    let data = await db.query(query, values);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/lost-damaged/export", authenticate, async (req, res) => {
  try {
    let { format } = req.query;
    if (!["pdf", "xlsx"].includes(format)) {
      return res.status(400).json({ msg: "format must be pdf or xlsx" });
    }

    // reuse the same query as List A (pull it into a shared helper if you like)
    let data = await db.query(`
      SELECT combined.*, categories.name AS category, sports.name AS sport
      FROM (
        SELECT id, item_id, item_name_snapshot, quantity, date, status, 'Lost' AS record_type
        FROM lost_records
        UNION ALL
        SELECT id, item_id, item_name_snapshot, quantity, date, status, 'Damaged' AS record_type
        FROM damaged_records
      ) AS combined
      JOIN items ON combined.item_id = items.id
      LEFT JOIN categories ON items.category_id = categories.id
      LEFT JOIN sports ON items.sport_id = sports.id
      ORDER BY combined.date DESC
    `);

    let rows = data.rows;

    if (format === "xlsx") {
      let workbook = new ExcelJS.Workbook();
      let sheet = workbook.addWorksheet("Lost & Damaged");

      sheet.columns = [
        { header: "Item", key: "item_name_snapshot", width: 25 },
        { header: "Type", key: "record_type", width: 12 },
        { header: "Category", key: "category", width: 15 },
        { header: "Sport", key: "sport", width: 15 },
        { header: "Quantity", key: "quantity", width: 10 },
        { header: "Status", key: "status", width: 18 },
        { header: "Date", key: "date", width: 15 },
      ];
      sheet.addRows(rows);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=lost-damaged-report.xlsx",
      );

      await workbook.xlsx.write(res); // streams the file directly into the response
      res.end();
    } else {
      // pdf
      let doc = new PDFDocument({ margin: 30 });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=lost-damaged-report.pdf",
      );
      doc.pipe(res);

      doc.fontSize(16).text("Lost & Damaged Report", { align: "center" });
      doc.moveDown();

      rows.forEach((row) => {
        doc
          .fontSize(10)
          .text(
            `${row.item_name_snapshot} | ${row.record_type} | ${row.category || "-"} | Qty: ${row.quantity} | ${row.status} | ${row.date}`,
          );
      });

      doc.end();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/purchase-list", authenticate, async (req, res) => {
  try {
    let data = await db.query(`
      SELECT
        items.id AS "itemId",
        items.name AS "name",
        categories.name AS category,
        items.total_quantity AS "onHand",
        items.current_price AS "unitCost",
        SUM(combined.quantity) AS "reorderQty",
        SUM(combined.quantity) * items.current_price AS "estCost"
      FROM (
        SELECT item_id, quantity FROM lost_records WHERE status = 'Pending Replacement'
        UNION ALL
        SELECT item_id, quantity FROM damaged_records WHERE status = 'Pending Replacement'
      ) AS combined
      JOIN items ON combined.item_id = items.id
      LEFT JOIN categories ON items.category_id = categories.id
      GROUP BY items.id, items.name, categories.name, items.total_quantity, items.current_price
      ORDER BY items.name
    `);

    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/purchase-list/draft",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      // 1. run the same live query as GET /purchase-list
      let liveData = await db.query(`
      SELECT
        items.id AS "itemId",
        items.name AS "itemName",
        categories.name AS category,
        SUM(combined.quantity) AS "totalNeeded"
      FROM (
        SELECT item_id, quantity FROM lost_records WHERE status = 'Pending Replacement'
        UNION ALL
        SELECT item_id, quantity FROM damaged_records WHERE status = 'Pending Replacement'
      ) AS combined
      JOIN items ON combined.item_id = items.id
      LEFT JOIN categories ON items.category_id = categories.id
      GROUP BY items.id, items.name, categories.name
      ORDER BY items.name
    `);

      // 2. attach a "deleted" flag to each row, default false
      let rowData = liveData.rows.map((row) => ({ ...row, deleted: false }));

      // 3. save the whole snapshot as one draft row
      let draft = await db.query(
        `INSERT INTO purchase_list_drafts (generated_date, status, row_data, created_by)
       VALUES (NOW(), 'Draft', $1, $2)
       RETURNING *`,
        [JSON.stringify(rowData), req.user.id],
      );

      res.status(201).json(draft.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.put(
  "/purchase-list/draft/:id",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      let { id } = req.params;
      let { rowData } = req.body; // client sends the full updated array back

      let updated = await db.query(
        `UPDATE purchase_list_drafts SET row_data = $1 WHERE id = $2 RETURNING *`,
        [JSON.stringify(rowData), id],
      );

      if (updated.rows.length === 0) {
        return res.status(404).json({ msg: "Draft not found" });
      }

      res.json(updated.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.get(
  "/purchase-list/draft/:id/export",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      let { id } = req.params;
      let { format } = req.query;

      if (!["pdf", "xlsx"].includes(format)) {
        return res.status(400).json({ msg: "format must be pdf or xlsx" });
      }

      let draft = await db.query(
        `SELECT * FROM purchase_list_drafts WHERE id = $1`,
        [id],
      );
      if (draft.rows.length === 0) {
        return res.status(404).json({ msg: "Draft not found" });
      }

      let rows = draft.rows[0].row_data.filter((r) => !r.deleted); // exclude soft-deleted rows from export

      if (format === "xlsx") {
        let workbook = new ExcelJS.Workbook();
        let sheet = workbook.addWorksheet("Purchase List");

        sheet.columns = [
          { header: "Item", key: "itemName", width: 25 },
          { header: "Category", key: "category", width: 15 },
          { header: "Quantity Needed", key: "totalNeeded", width: 18 },
        ];
        sheet.addRows(rows);

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=purchase-list-draft.xlsx",
        );
        await workbook.xlsx.write(res);
        res.end();
      } else {
        let doc = new PDFDocument({ margin: 30 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=purchase-list-draft.pdf",
        );
        doc.pipe(res);

        doc.fontSize(16).text("Purchase List (Draft)", { align: "center" });
        doc.moveDown();

        rows.forEach((row) => {
          doc
            .fontSize(10)
            .text(
              `${row.itemName} | ${row.category || "-"} | Qty: ${row.totalNeeded}`,
            );
        });

        doc.end();
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

router.get(
  "/purchase-list/draft/:id",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      let { id } = req.params;
      let draft = await db.query(
        `SELECT * FROM purchase_list_drafts WHERE id = $1`,
        [id],
      );

      if (draft.rows.length === 0) {
        return res.status(404).json({ msg: "Draft not found" });
      }

      res.json(draft.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
