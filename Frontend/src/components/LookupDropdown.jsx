import { useEffect, useState } from 'react'
import { getLookup } from '../api/lookups'

/**
 * Reusable dropdown backed by GET /lookups/:field, with an inline
 * "add new" option. When the user picks "+ Add new", an input appears;
 * on blur/enter the new value becomes the selected value and is passed
 * up via onChange. Persisting the new lookup value to the backend is
 * left to the parent form's submit (send it along with the create/update
 * payload) since lookup-creation endpoints vary by field in most APIs.
 */
export default function LookupDropdown({ field, label, value, onChange, required }) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newValue, setNewValue] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getLookup(field)
      .then((data) => {
        if (!cancelled) setOptions(Array.isArray(data) ? data : data.items || [])
      })
      .catch(() => {
        if (!cancelled) setOptions([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [field])

  function handleSelect(e) {
    const v = e.target.value
    if (v === '__add_new__') {
      setAdding(true)
      return
    }
    onChange(v)
  }

  function confirmNewValue() {
    const trimmed = newValue.trim()
    if (trimmed) {
      onChange(trimmed)
      setOptions((prev) => [...prev, trimmed])
    }
    setAdding(false)
    setNewValue('')
  }

  return (
    <div className="field">
      <label>{label}{required ? ' *' : ''}</label>
      {!adding ? (
        <select value={value || ''} onChange={handleSelect} disabled={loading}>
          <option value="">{loading ? 'Loading…' : `Select ${label.toLowerCase()}`}</option>
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.name || opt.value
            return <option key={val} value={val}>{val}</option>
          })}
          <option value="__add_new__">+ Add new…</option>
        </select>
      ) : (
        <div className="lookup-add-new">
          <input
            type="text"
            autoFocus
            placeholder={`New ${label.toLowerCase()}`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmNewValue()}
          />
          <button type="button" className="btn btn-ghost btn-sm" onClick={confirmNewValue}>Add</button>
        </div>
      )}
    </div>
  )
}
