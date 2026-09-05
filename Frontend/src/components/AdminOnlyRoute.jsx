import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from './Layout'

export default function AdminOnlyRoute() {
  const { isAdmin } = useAuth()
  if (!isAdmin) {
    return (
      <Layout>
        <div className="access-denied">
          <h2 className="display">Access Denied</h2>
          <p>This section is restricted to admin accounts. Contact your quartermaster admin if you believe this is a mistake.</p>
        </div>
      </Layout>
    )
  }
  return <Outlet />
}
