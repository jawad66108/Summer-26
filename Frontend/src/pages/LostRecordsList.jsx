import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Badge from "../components/Badge";
import FilterBar from "../components/FilterBar";
import { getLostRecords, markLostReplaced } from "../api/lostRecords";
import { useAuth } from "../context/AuthContext";
import { getLookup } from "../api/lookups";

const emptyFilters = { wing: "", status: "" };

export default function LostRecordsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [search, setSearch] = useState("");
  const { isAdmin } = useAuth();
  const [wings, setWings] = useState([]);
  const navigate = useNavigate();

  function load() {
    setLoading(true);
    getLostRecords(filters)
      .then((data) => setRecords(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError("Could not load lost records."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [filters]);

  useEffect(() => {
    getLookup("wings").then(setWings);
  }, []);

  async function handleMarkReplaced(id) {
    try {
      await markLostReplaced(id);
      load();
    } catch (err) {
      setError("Could not update this record.");
    }
  }

  const visibleRecords = records.filter((r) => {
    const item = (r.itemName || r.item_name || "").toLowerCase();
    const cadet = (r.cadetName || r.cadet_name || "").toLowerCase();
    const q = search.toLowerCase();
    return item.includes(q) || cadet.includes(q);
  });

  const pending = records.filter(
    (r) => (r.status || "").toLowerCase() === "pending replacement",
  ).length;

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Lost Records</h2>
          <div className="sub">
            {records.length} RECORDS · {pending} AWAITING REPLACEMENT
          </div>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary display"
            onClick={() => navigate("/lost-records/new")}
          >
            + Report Lost Item
          </button>
        )}
      </div>

      <div className="page-hero hero-lost" />

      <div className="panel" style={{ marginBottom: "16px" }}>
        <FilterBar
          onClear={() => {
            setFilters(emptyFilters);
            setSearch("");
          }}
        >
          <input
            type="text"
            placeholder="Search item or cadet…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filters.wing}
            onChange={(e) =>
              setFilters((f) => ({ ...f, wing: e.target.value }))
            }
          >
            <option value="">All Wings</option>
            {wings.map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
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
        </FilterBar>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3 className="display">Lost Kit Register</h3>
          <span className="form-27b">Form 27-B</span>
        </div>

        {loading && <div className="loading-note">Loading records…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && visibleRecords.length === 0 && (
          <div className="empty-note">Nothing logged under this filter.</div>
        )}

        {!loading && !error && visibleRecords.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Cadet</th>
                <th>Kit #</th>
                <th>Wing</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Status</th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {visibleRecords.map((r) => (
                <tr key={r.id} className="data-row">
                  <td>
                    <b>{r.itemName || r.item_name}</b>
                  </td>
                  <td>{r.cadetName || r.cadet_name}</td>
                  <td className="mono-cell">{r.kitNumber || r.kit_number}</td>
                  <td>{r.wing}</td>
                  <td className="mono-cell">{r.quantity}</td>
                  <td className="mono-cell">
                    {r.date || r.createdAt?.slice(0, 10)}
                  </td>
                  <td>
                    <Badge status={r.status || "Pending Replacement"} />
                  </td>
                  {isAdmin && (
                    <td>
                      {(r.status || "").toLowerCase() !== "replaced" && (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleMarkReplaced(r.id)}
                        >
                          Mark Replaced
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
