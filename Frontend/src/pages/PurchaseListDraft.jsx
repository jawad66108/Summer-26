import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getPurchaseDraft, updatePurchaseDraft, getPurchaseDraftExportUrl } from '../api/reports'

export default function PurchaseListDraft() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    getPurchaseDraft(id)
      .then((data) => { if (!cancelled) setRows(Array.isArray(data) ? data : data.items || []) })
      .catch(() => { if (!cancelled) setError('Could not load this draft.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [id])

  function updateRow(rowId, field, value) {
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, [field]: value } : r)))
  }

  function toggleDeleted(rowId) {
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, deleted: !r.deleted } : r)))
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      await updatePurchaseDraft(id, { items: rows })
    } catch (err) {
      setError('Could not save this draft.')
    } finally {
      setSaving(false)
    }
  }

  const total = rows
    .filter((r) => !r.deleted)
    .reduce((sum, r) => sum + (r.quantity || 0) * (r.unitCost || r.unit_cost || 0), 0)

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Purchase List Draft</h2>
          <div className="sub">DRAFT #{id}</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost display" onClick={() => window.open(getPurchaseDraftExportUrl(id, 'pdf'), '_blank')}>
            Export PDF
          </button>
          <button className="btn btn-ghost display" onClick={() => window.open(getPurchaseDraftExportUrl(id, 'xlsx'), '_blank')}>
            Export XLSX
          </button>
          <button className="btn btn-primary display" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3 className="display">Draft Items</h3>
          <span className="mono" style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>
            EST. TOTAL: Rs {total.toLocaleString()}
          </span>
        </div>

        {loading && <div className="loading-note">Loading draft…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && rows.length === 0 && <div className="empty-note">This draft has no items.</div>}

        {!loading && !error && rows.length > 0 && (
          <table>
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Unit Cost</th><th>Est. Cost</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} style={r.deleted ? { opacity: 0.45, textDecoration: 'line-through' } : undefined}>
                  <td>{r.name}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="mono-cell"
                      style={{ width: '80px', padding: '4px 8px', border: '1px solid var(--ink)', background: 'var(--parchment)' }}
                      value={r.quantity}
                      onChange={(e) => updateRow(r.id, 'quantity', Number(e.target.value))}
                      disabled={r.deleted}
                    />
                  </td>
                  <td className="mono-cell">Rs {Number(r.unitCost ?? r.unit_cost ?? 0).toLocaleString()}</td>
                  <td className="mono-cell">Rs {((r.quantity || 0) * (r.unitCost ?? r.unit_cost ?? 0)).toLocaleString()}</td>
                  <td>{r.deleted ? 'Removed' : 'Included'}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => toggleDeleted(r.id)}>
                      {r.deleted ? 'Restore' : 'Remove'}
                    </button>
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
