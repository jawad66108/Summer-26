import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Badge from '../components/Badge'
import { getDashboardSummary } from '../api/dashboard'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    getDashboardSummary()
      .then((data) => { if (!cancelled) setSummary(data) })
      .catch(() => { if (!cancelled) setError('Could not load dashboard summary.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const lowStock = summary?.lowStockItems || summary?.low_stock_items || []

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Dashboard</h2>
          <div className="sub">WING SUPPLY OVERVIEW</div>
        </div>
        {isAdmin && (
          <button className="btn btn-ghost display" onClick={() => navigate('/lost-records/new')}>
            + Report Lost Item
          </button>
        )}
      </div>

      {loading && <div className="loading-note">Loading summary…</div>}
      {error && <div className="error-note">{error}</div>}

      {summary && (
        <>
          <div className="stat-row">
            <div className="stat-tag">
              <div className="label">Total Items</div>
              <div className="value mono">{summary.totalItems ?? summary.total_items ?? '—'}</div>
            </div>
            <div className="stat-tag alert">
              <div className="stamp">ATTN</div>
              <div className="label">Pending Replacements</div>
              <div className="value mono">{summary.pendingReplacements ?? summary.pending_replacements ?? '—'}</div>
            </div>
            <div className="stat-tag">
              <div className="label">Est. Purchase Cost</div>
              <div className="value mono">
                {summary.estimatedPurchaseCost != null
                  ? `Rs ${Number(summary.estimatedPurchaseCost ?? summary.estimated_purchase_cost).toLocaleString()}`
                  : '—'}
              </div>
            </div>
            <div className="stat-tag alert">
              <div className="label">Low Stock Items</div>
              <div className="value mono">{lowStock.length}</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h3 className="display">Low Stock — Action Needed</h3>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>
                {lowStock.length} ITEMS
              </span>
            </div>
            {lowStock.length === 0 ? (
              <div className="empty-note">Nothing here — all tracked items are above their reorder level.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Item</th><th>Category</th><th>Sport</th><th>On Hand</th><th>Reorder At</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((item) => (
                    <tr
                      key={item.id}
                      className="data-row"
                      onClick={() => navigate(`/items/${item.id}`)}
                    >
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.sport}</td>
                      <td className="mono-cell">{item.quantity ?? item.onHand}</td>
                      <td className="mono-cell">{item.reorderLevel ?? item.reorder_level}</td>
                      <td><Badge status="Low" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </Layout>
  )
}
