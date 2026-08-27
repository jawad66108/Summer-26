import { resolveImageUrl } from "../utils/media";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Badge from "../components/Badge";
import FilterBar from "../components/FilterBar";
import { getItems } from "../api/items";
import { getLookup } from "../api/lookups";
import { useAuth } from "../context/AuthContext";

const emptyFilters = { search: "", category: "", sport: "" };

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getItems(filters)
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : data.items || []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load items.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters]);
  useEffect(() => {
    getLookup("categories").then(setCategories);
    getLookup("sports").then(setSports);
  }, []);

  function statusFor(item) {
    const qty = item.quantity ?? item.onHand ?? 0;
    const reorder = item.reorderLevel ?? item.reorder_level ?? 0;
    return qty <= reorder ? "Low" : "OK";
  }

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Items</h2>
          <div className="sub">{items.length} ITEMS IN LEDGER</div>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary display"
            onClick={() => navigate("/items/new")}
          >
            + Add Item
          </button>
        )}
      </div>

      <div className="panel">
        <FilterBar onClear={() => setFilters(emptyFilters)}>
          <input
            type="text"
            placeholder="Search items…"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
          />
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({ ...f, category: e.target.value }))
            }
          >
            {sports.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
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
            <option value="Hockey">Hockey</option>
            <option value="Football">Football</option>
            <option value="Cricket">Cricket</option>
            <option value="Volleyball">Volleyball</option>
          </select>
        </FilterBar>

        {loading && <div className="loading-note">Loading items…</div>}
        {error && <div className="error-note">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="empty-note">No items match these filters.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Sport</th>
                <th>Unit</th>
                <th>On Hand</th>
                <th>Status</th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="data-row"
                  onClick={() => navigate(`/items/${item.id}`)}
                >
                  <td>
                    <div className="row-with-thumb">
                      {item.photoUrl || item.photo_url ? (
                        <img
                          src={resolveImageUrl(item.photoUrl || item.photo_url)}
                          alt=""
                          className="row-thumb"
                        />
                      ) : (
                        <div className="row-thumb-placeholder">
                          NO
                          <br />
                          PHOTO
                        </div>
                      )}
                      <b>{item.name}</b>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.sport}</td>
                  <td className="mono-cell">{item.unit}</td>
                  <td className="mono-cell">{item.quantity ?? item.onHand}</td>
                  <td>
                    <Badge status={statusFor(item)} />
                  </td>
                  {isAdmin && (
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/items/${item.id}`);
                        }}
                      >
                        Edit
                      </button>
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
