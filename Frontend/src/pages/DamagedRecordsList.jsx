import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Badge from "../components/Badge";
import FilterBar from "../components/FilterBar";
import { getDamagedRecords, markDamagedReplaced } from "../api/damagedRecords";
import { useAuth } from "../context/AuthContext";
import { getLookup } from "../api/lookups";

const emptyFilters = {
  category: "",
  sport: "",
  status: "",
  dateFrom: "",
  dateTo: "",
};

export default function DamagedRecordsList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [search, setSearch] = useState("");
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);
  const navigate = useNavigate();

  function load() {
    setLoading(true);
    getDamagedRecords(filters)
      .then((data) => setRecords(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError("Could not load damaged records."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [filters]);

  useEffect(() => {
    getLookup("categories").then(setCategories);
    getLookup("sports").then(setSports);
  }, []);

  async function handleMarkReplaced(id) {
    try {
      await markDamagedReplaced(id);
      load();
    } catch (err) {
      setError("Could not update this record.");
    }
  }

  const visibleRecords = records.filter((r) =>
    (r.itemName || r.item_name || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const pending = records.filter(
    (r) => (r.status || "").toLowerCase() === "pending replacement",
  ).length;

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Damaged Records</h2>
          <div className="sub">
            {records.length} RECORDS · {pending} AWAITING REPLACEMENT
          </div>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary display"
            onClick={() => navigate("/damaged-records/new")}
          >
            + Report Damaged Item
          </button>
        )}
      </div>

      <div className="page-hero hero-damaged" />

      <div className="panel" style={{ marginBottom: "16px" }}>
        <FilterBar
          onClear={() => {
            setFilters(emptyFilters);
            setSearch("");
          }}
        >
          <input
            type="text"
            placeholder="Search item…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
          <h3 className="display">Damage Register</h3>
          <span className="form-27b">Form 27-B</span>
        </div>

        {loading && <div className="loading-note">Loading records…</div>}
        {/* ...rest of table code stays exactly the same... */}

        {error && <div className="error-note">{error}</div>}
        {!loading && !error && visibleRecords.length === 0 && (
          <div className="empty-note">Nothing logged under this filter.</div>
        )}

        {!loading && !error && visibleRecords.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Remarks</th>
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
                  <td className="mono-cell">{r.quantity}</td>
                  <td className="mono-cell">
                    {r.date || r.createdAt?.slice(0, 10)}
                  </td>
                  <td style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>
                    {r.damageDescription || r.damage_description}
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
