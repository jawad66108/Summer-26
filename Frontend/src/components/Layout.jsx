import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  )
}
