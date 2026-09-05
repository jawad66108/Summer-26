import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getDashboardSummary } from "../api/dashboard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getLostRecords } from "../api/lostRecords";
import { getDamagedRecords } from "../api/damagedRecords";
import Badge from "../components/Badge";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState([]);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getDashboardSummary()
      .then((data) => {
        if (!cancelled) setSummary(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load dashboard summary.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    Promise.all([getLostRecords({}), getDamagedRecords({})])
      .then(([lost, damaged]) => {
        const lostRows = (Array.isArray(lost) ? lost : []).map((r) => ({
          ...r,
          type: "Lost",
        }));
        const damagedRows = (Array.isArray(damaged) ? damaged : []).map(
          (r) => ({ ...r, type: "Damaged" }),
        );
        const combined = [...lostRows, ...damagedRows]
          .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
          .slice(0, 5);
        setRecent(combined);
      })
      .catch(() => {});
  }, []);

  const lowStock = summary?.lowStockItems || summary?.low_stock_items || [];

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Dashboard</h2>
          <div className="sub">WING SUPPLY OVERVIEW</div>
        </div>
        {isAdmin && (
          <button
            className="btn btn-ghost display"
            onClick={() => navigate("/lost-records/new")}
          >
            + Report Lost Item
          </button>
        )}
      </div>

      <div className="page-hero hero-dashboard" />
      {loading && <div className="loading-note">Loading summary…</div>}
      {error && <div className="error-note">{error}</div>}

      {summary && (
        <>
          <div className="stat-row">
            <div className="stat-tag">
              <div className="label">Total Items</div>
              <div className="value mono">
                {summary.totalItems ?? summary.total_items ?? "—"}
              </div>
            </div>
            <div className="stat-tag alert">
              <div className="stamp">ATTN</div>
              <div className="label">Pending Replacements</div>
              <div className="value mono">
                {summary.pendingReplacements ??
                  summary.pending_replacements ??
                  "—"}
              </div>
            </div>
            <div className="stat-tag">
              <div className="label">Est. Purchase Cost</div>
              <div className="value mono">
                {summary.estimatedPurchaseCost != null
                  ? `Rs ${Number(summary.estimatedPurchaseCost ?? summary.estimated_purchase_cost).toLocaleString()}`
                  : "—"}
              </div>
            </div>
            <div className="stat-tag alert">
              <div className="label">Low Stock Items</div>
              <div className="value mono">{lowStock.length}</div>
            </div>
          </div>

          <div className="dash-split">
            <div className="panel">
              <div className="panel-head">
                <h3 className="display">Latest Entries</h3>
              </div>
              <div className="panel-body">
                <div className="entry-list">
                  {recent.length === 0 ? (
                    <div className="empty-note">
                      No recent lost or damaged entries.
                    </div>
                  ) : (
                    recent.map((r, idx) => (
                      <div className="entry-row" key={idx}>
                        <div style={{ minWidth: 0 }}>
                          <div className="entry-name">
                            {r.itemName || r.item_name}
                          </div>
                          <div className="entry-meta">
                            {r.type === "Lost"
                              ? `${r.cadetName || r.cadet_name || "—"} · ${r.wing || "—"} · ${r.date}`
                              : `${r.damageDescription || r.damage_description || "Damaged"} · ${r.date}`}
                          </div>
                        </div>
                        <Badge status={r.status} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3 className="display">Quick Ledger Actions</h3>
              </div>
              <div className="panel-body">
                <div className="quick-grid">
                  <Link to="/items" className="quick-card">
                    <div className="title display">Kit Inventory</div>
                    <div className="desc">
                      {summary.totalItems ?? summary.total_items} items on the
                      shelf
                    </div>
                  </Link>
                  <Link to="/lost-records" className="quick-card">
                    <div className="title display">Lost Records</div>
                    <div className="desc">Signed out, never back</div>
                  </Link>
                  <Link to="/damaged-records" className="quick-card">
                    <div className="title display">Damaged Records</div>
                    <div className="desc">Bent, split, torn</div>
                  </Link>
                  <Link to="/reports/purchase-list" className="quick-card">
                    <div className="title display">Purchase List</div>
                    <div className="desc">What to buy next</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}
