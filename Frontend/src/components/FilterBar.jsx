export default function FilterBar({ children, onClear }) {
  return (
    <div className="filter-bar">
      {children}
      {onClear && (
        <button className="btn btn-ghost btn-sm" onClick={onClear} type="button">Clear</button>
      )}
    </div>
  )
}
