import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { section: 'Overview', links: [{ to: '/dashboard', label: 'Dashboard' }] },
  {
    section: 'Inventory',
    links: [
      { to: '/items', label: 'Items' },
      { to: '/lost-records', label: 'Lost Records' },
      { to: '/damaged-records', label: 'Damaged Records' },
    ],
  },
  {
    section: 'Reports',
    links: [
      { to: '/reports/lost-damaged', label: 'Lost & Damaged' },
      { to: '/reports/purchase-list', label: 'Purchase List' },
    ],
  },
]

export default function Sidebar() {
  const { username, role, logout } = useAuth()

  return (
    <div className="sidebar">
      <div className="brand">
        <div className="mark">KL</div>
        <h1 className="display">Kit Ledger</h1>
        <p>SPORTS SUPPLY SYSTEM</p>
      </div>

      {navItems.map((group) => (
        <div key={group.section}>
          <div className="nav-section-label">{group.section}</div>
          {group.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'nav-item' + (isActive ? ' current' : '')}
            >
              <span className="dot"></span> {link.label}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="sidebar-foot">
        Signed in as
        <br />
        <b>{username || 'Unknown user'}</b>
        <div className="role-chip">{(role || '').toUpperCase()}</div>
        <button className="logout-link" onClick={logout}>Sign out</button>
      </div>
    </div>
  )
}
