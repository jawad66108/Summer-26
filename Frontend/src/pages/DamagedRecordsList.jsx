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

  async function handleMarkReplaced(id) {
    try {
      await markDamagedReplaced(id);
      load();
    } catch (err) {
      setError("Could not update this record.");
    }
  }
  useEffect(() => {
    getLookup("categories").then(setCategories);
    getLookup("sports").then(setSports);
  }, []);

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Damaged Records</h2>
          <div className="sub">{records.length} RECORDS</div>
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
            <option value="Pending">Pending</option>
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

        {loading && <div className="loading-note">Loading records…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && records.length === 0 && (
          <div className="empty-note">
            No damaged records match these filters.
          </div>
        )}

        {!loading && !error && records.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Repair Status</th>
                <th>Qty</th>
                <th>Date</th>
                <th>Status</th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="data-row">
                  <td>{r.itemName || r.item_name}</td>
                  <td>{r.damageDescription || r.damage_description}</td>
                  <td>{r.repairStatus || r.repair_status}</td>
                  <td className="mono-cell">{r.quantity}</td>
                  <td className="mono-cell">
                    {r.date || r.createdAt?.slice(0, 10)}
                  </td>
                  <td>
                    <Badge status={r.status || "Pending"} />
                  </td>
                  {isAdmin && (
                    <td>
                      {(r.status || "Pending").toLowerCase() !== "replaced" && (
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
