import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import LookupDropdown from '../components/LookupDropdown'
import { createLostRecord } from '../api/lostRecords'
import { getItems } from '../api/items'

const initialForm = { itemId: '', quantity: 1, cadetName: '', kitNumber: '', wing: '', teamName: '' }

export default function LostRecordForm() {
  const [form, setForm] = useState(initialForm)
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getItems().then((data) => setItems(Array.isArray(data) ? data : data.items || [])).catch(() => setItems([]))
  }, [])

  const selectedItem = items.find((i) => String(i.id) === String(form.itemId))
  const isTeamCategory = (selectedItem?.category || '').toLowerCase() === 'team'

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { ...form }
      if (!isTeamCategory) delete payload.teamName
      await createLostRecord(payload)
      navigate('/lost-records')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit this report. Please check the form.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Report Lost Item</h2>
          <div className="sub">LOST RECORDS / NEW</div>
        </div>
      </div>

      <div className="panel form-panel" style={{ maxWidth: '640px' }}>
        {error && <div className="error-note" style={{ marginBottom: '16px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Item *</label>
            <select required value={form.itemId} onChange={(e) => setField('itemId', e.target.value)}>
              <option value="">Select item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Quantity *</label>
              <input type="number" min="1" required value={form.quantity} onChange={(e) => setField('quantity', Number(e.target.value))} />
            </div>
            <div className="field">
              <label>Kit Number *</label>
              <input type="text" required value={form.kitNumber} onChange={(e) => setField('kitNumber', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Cadet Name *</label>
              <input type="text" required value={form.cadetName} onChange={(e) => setField('cadetName', e.target.value)} />
            </div>
            <LookupDropdown field="wing" label="Wing" value={form.wing} onChange={(v) => setField('wing', v)} required />
          </div>

          {isTeamCategory && (
            <div className="field">
              <label>Team Name *</label>
              <input type="text" required value={form.teamName} onChange={(e) => setField('teamName', e.target.value)} />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary display" disabled={saving}>
              {saving ? 'Submitting…' : 'Submit Report'}
            </button>
            <button type="button" className="btn btn-ghost display" onClick={() => navigate('/lost-records')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
