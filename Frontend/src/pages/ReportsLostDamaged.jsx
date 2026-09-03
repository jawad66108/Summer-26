import { useEffect, useMemo, useState } from "react";
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
  const [wings, setWings] = useState([]);

  useEffect(() => {
    setLoading(true);
    getLostDamagedReport(filters)
      .then((data) => setRows(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError("Could not load this report."))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    getLookup("categories").then(setCategories);
    getLookup("sports").then(setSports);
    getLookup("wings").then(setWings);
  }, []);

  function handleExport(format) {
    window.open(getLostDamagedExportUrl(format, filters), "_blank");
  }

  const byWing = useMemo(() => {
    const buckets = wings.map((w) => ({ wing: w.name, lost: 0, damaged: 0 }));
    rows.forEach((r) => {
      if (!r.wing) return; // damaged records have no wing — correctly excluded, not faked
      const bucket = buckets.find((b) => b.wing === r.wing);
      if (!bucket) return;
      if (r.type === "Lost") bucket.lost += Number(r.quantity) || 0;
      else bucket.damaged += Number(r.quantity) || 0;
    });
    return buckets.filter((b) => b.lost > 0 || b.damaged > 0);
  }, [rows, wings]);

  const maxWing = Math.max(1, ...byWing.map((b) => b.lost + b.damaged));

  const bySport = useMemo(() => {
    const counts = {};
    sports.forEach((s) => {
      counts[s.name] = 0;
    });
    rows.forEach((r) => {
      if (r.sport && counts[r.sport] !== undefined) counts[r.sport] += 1;
    });
    return Object.entries(counts).filter(([, n]) => n > 0);
  }, [rows, sports]);

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Lost &amp; Damaged</h2>
          <div className="sub">
            {rows.length} COMBINED ENTRIES · {sports.length} SPORTS
          </div>
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

      <div className="page-hero hero-lostdamaged" />

      <div className="dash-split">
        <div className="panel">
          <div className="panel-head">
            <h3 className="display">Losses by Wing</h3>
          </div>
          <div className="panel-body">
            {byWing.length === 0 ? (
              <div className="empty-note">No wing-tagged records yet.</div>
            ) : (
              byWing.map((b) => (
                <div className="wing-bar-row" key={b.wing}>
                  <div className="wing-bar-label">
                    <span>{b.wing}</span>
                    <span className="count">
                      {b.lost} Lost · {b.damaged} Damaged
                    </span>
                  </div>
                  <div className="wing-bar-track">
                    <div
                      className="wing-bar-lost"
                      style={{ width: `${(b.lost / maxWing) * 100}%` }}
                    />
                    <div
                      className="wing-bar-damaged"
                      style={{ width: `${(b.damaged / maxWing) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="display">Losses by Sport</h3>
          </div>
          <div className="panel-body">
            <div className="sport-grid">
              {bySport.map(([sport, n]) => (
                <div className="sport-tile" key={sport}>
                  <div className="label">{sport}</div>
                  <div className="value mono">{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="panel"
        style={{ marginTop: "24px", marginBottom: "16px" }}
      >
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
            <option value="Pending Replacement">Pending Replacement</option>
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
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3 className="display">Consolidated Register</h3>
          <span
            className="mono"
            style={{ fontSize: "11px", color: "var(--ink-soft)" }}
          >
            {rows.length} ENTRIES
          </span>
        </div>

        {loading && <div className="loading-note">Loading report…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && rows.length === 0 && (
          <div className="empty-note">No records match these filters.</div>
        )}

        {!loading && !error && rows.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Item</th>
                <th>Cadet</th>
                <th>Wing</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="data-row">
                  <td>
                    <span
                      className={`type-badge ${(r.type || "").toLowerCase()}`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td>
                    <b>{r.itemName || r.item_name}</b>
                  </td>
                  <td>{r.cadetName || r.cadet_name || "—"}</td>
                  <td>{r.wing || "—"}</td>
                  <td className="mono-cell">{r.quantity}</td>
                  <td className="mono-cell">
                    {r.date || r.createdAt?.slice(0, 10)}
                  </td>
                  <td>
                    <Badge status={r.status || "Pending Replacement"} />
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
