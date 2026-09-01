import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Badge from "../components/Badge";
import FilterBar from "../components/FilterBar";
import { getLostDamagedReport, getLostDamagedExportUrl } from "../api/reports";
import { getLookup } from "../api/lookups";

const emptyFilters = {
  category: "",
  sport: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

export default function ReportsLostDamaged() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    setLoading(true);
    getLostDamagedReport(filters)
      .then((data) => setRows(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError("Could not load this report."))
      .finally(() => setLoading(false));
  }, [filters]);

  function handleExport(format) {
    window.open(getLostDamagedExportUrl(format, filters), "_blank");
  }

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Lost &amp; Damaged Report</h2>
          <div className="sub">{rows.length} RECORDS</div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-ghost display"
            onClick={() => handleExport("pdf")}
          >
            Export PDF
          </button>
          <button
            className="btn btn-ghost display"
            onClick={() => handleExport("xlsx")}
          >
            Export XLSX
          </button>
        </div>
      </div>

      <div className="panel">
        <FilterBar onClear={() => setFilters(emptyFilters)}>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={filters.sport}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sport: e.target.value }))
            }
          >
            <option value="">All Sports</option>
            {sports.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((f) => ({ ...f, status: e.target.value }))
            }
          >
            <option value="">All Statuses</option>
            <option value="Lost">Lost</option>
            <option value="Damaged">Damaged</option>
            <option value="Replaced">Replaced</option>
          </select>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateFrom: e.target.value }))
            }
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateTo: e.target.value }))
            }
          />
        </FilterBar>

        {loading && <div className="loading-note">Loading report…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && rows.length === 0 && (
          <div className="empty-note">No records match these filters.</div>
        )}

        {!loading && !error && rows.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Cadet</th>
                <th>Wing</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.itemName || r.item_name}</td>
                  <td>{r.type || (r.isDamaged ? "Damaged" : "Lost")}</td>
                  <td>{r.cadetName || r.cadet_name}</td>
                  <td>{r.wing}</td>
                  <td className="mono-cell">{r.quantity}</td>
                  <td className="mono-cell">
                    {r.date || r.createdAt?.slice(0, 10)}
                  </td>
                  <td>
                    <Badge status={r.status || "Pending"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
