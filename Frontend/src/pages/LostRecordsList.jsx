import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Badge from '../components/Badge'
import FilterBar from '../components/FilterBar'
import { getLostRecords, markLostReplaced } from '../api/lostRecords'
import { useAuth } from '../context/AuthContext'

const emptyFilters = { category: '', sport: '', status: '', dateFrom: '', dateTo: '' }

export default function LostRecordsList() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  function load() {
    setLoading(true)
    getLostRecords(filters)
      .then((data) => setRecords(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError('Could not load lost records.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [filters])

  async function handleMarkReplaced(id) {
    try {
      await markLostReplaced(id)
      load()
    } catch (err) {
      setError('Could not update this record.')
    }
  }

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Lost Records</h2>
          <div className="sub">{records.length} RECORDS</div>
        </div>
        {isAdmin && (
          <button className="btn btn-primary display" onClick={() => navigate('/lost-records/new')}>
            + Report Lost Item
          </button>
        )}
      </div>

      <div className="panel">
        <FilterBar onClear={() => setFilters(emptyFilters)}>
          <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
            <option value="">All Categories</option>
            <option value="Equipment">Equipment</option>
            <option value="Protective">Protective</option>
            <option value="Team">Team</option>
          </select>
          <select value={filters.sport} onChange={(e) => setFilters((f) => ({ ...f, sport: e.target.value }))}>
            <option value="">All Sports</option>
            <option value="Hockey">Hockey</option>
            <option value="Football">Football</option>
            <option value="Cricket">Cricket</option>
          </select>
          <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Replaced">Replaced</option>
          </select>
          <input type="date" value={filters.dateFrom} onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))} />
          <input type="date" value={filters.dateTo} onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))} />
        </FilterBar>

        {loading && <div className="loading-note">Loading records…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && records.length === 0 && <div className="empty-note">No lost records match these filters.</div>}

        {!loading && !error && records.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th><th>Cadet</th><th>Kit #</th><th>Wing</th><th>Qty</th><th>Date</th><th>Status</th>
                {isAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="data-row">
                  <td>{r.itemName || r.item_name}</td>
                  <td>{r.cadetName || r.cadet_name}</td>
                  <td className="mono-cell">{r.kitNumber || r.kit_number}</td>
                  <td>{r.wing}</td>
                  <td className="mono-cell">{r.quantity}</td>
                  <td className="mono-cell">{r.date || r.createdAt?.slice(0, 10)}</td>
                  <td><Badge status={r.status || 'Pending'} /></td>
                  {isAdmin && (
                    <td>
                      {(r.status || 'Pending').toLowerCase() !== 'replaced' && (
                        <button className="btn btn-ghost btn-sm" onClick={() => handleMarkReplaced(r.id)}>
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
  )
}
