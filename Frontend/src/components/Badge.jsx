export default function Badge({ status }) {
  const normalized = (status || '').toLowerCase()
  let cls = 'badge badge-slate'
  let label = status || 'Unknown'

  if (normalized === 'low' || normalized === 'pending' || normalized === 'lost' || normalized === 'damaged') {
    cls = 'badge badge-low'
    label = normalized === 'pending' ? 'Pending' : status
  } else if (normalized === 'ok' || normalized === 'replaced' || normalized === 'in stock') {
    cls = 'badge badge-ok'
  }

  return <span className={cls}>{label}</span>
}
