import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getPurchaseListLive, createPurchaseDraft } from '../api/reports'
import { useAuth } from '../context/AuthContext'

export default function PurchaseListLive() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getPurchaseListLive()
      .then((data) => setRows(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError('Could not load the purchase list.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreateDraft() {
    setCreating(true)
    setError('')
    try {
      const draft = await createPurchaseDraft()
      navigate(`/reports/purchase-list/draft/${draft.id}`)
    } catch (err) {
      setError('Could not create a draft. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  const total = rows.reduce((sum, r) => sum + (r.quantity || 0) * (r.unitCost || r.unit_cost || 0), 0)

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Purchase List (Live)</h2>
          <div className="sub">{rows.length} ITEMS TO REORDER</div>
        </div>
        {isAdmin && (
          <button className="btn btn-primary display" onClick={handleCreateDraft} disabled={creating}>
            {creating ? 'Creating…' : 'Create Draft'}
          </button>
        )}
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3 className="display">Reorder Needed</h3>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>
            EST. TOTAL: Rs {total.toLocaleString()}
          </span>
        </div>

        {loading && <div className="loading-note">Loading purchase list…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && rows.length === 0 && <div className="empty-note">Nothing to reorder right now.</div>}

        {!loading && !error && rows.length > 0 && (
          <table>
            <thead>
              <tr><th>Item</th><th>Category</th><th>On Hand</th><th>Reorder Qty</th><th>Unit Cost</th><th>Est. Cost</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.category}</td>
                  <td className="mono-cell">{r.quantity ?? r.onHand}</td>
                  <td className="mono-cell">{r.reorderQty ?? r.reorder_qty}</td>
                  <td className="mono-cell">Rs {Number(r.unitCost ?? r.unit_cost ?? 0).toLocaleString()}</td>
                  <td className="mono-cell">
                    Rs {(((r.reorderQty ?? r.reorder_qty) || 0) * (r.unitCost ?? r.unit_cost ?? 0)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
