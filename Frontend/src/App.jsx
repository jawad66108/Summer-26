import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminOnlyRoute from './components/AdminOnlyRoute'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ItemsList from './pages/ItemsList'
import ItemDetail from './pages/ItemDetail'
import ItemForm from './pages/ItemForm'
import LostRecordsList from './pages/LostRecordsList'
import LostRecordForm from './pages/LostRecordForm'
import DamagedRecordsList from './pages/DamagedRecordsList'
import DamagedRecordForm from './pages/DamagedRecordForm'
import ReportsLostDamaged from './pages/ReportsLostDamaged'
import PurchaseListLive from './pages/PurchaseListLive'
import PurchaseListDraft from './pages/PurchaseListDraft'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/items" element={<ItemsList />} />
            <Route path="/items/:id" element={<ItemDetail />} />

            <Route path="/lost-records" element={<LostRecordsList />} />
            <Route path="/damaged-records" element={<DamagedRecordsList />} />

            <Route path="/reports/lost-damaged" element={<ReportsLostDamaged />} />
            <Route path="/reports/purchase-list" element={<PurchaseListLive />} />

            {/* Admin-only pages: blocked client-side, not just via the API */}
            <Route element={<AdminOnlyRoute />}>
              <Route path="/items/new" element={<ItemForm />} />
              <Route path="/lost-records/new" element={<LostRecordForm />} />
              <Route path="/damaged-records/new" element={<DamagedRecordForm />} />
              <Route path="/reports/purchase-list/draft/:id" element={<PurchaseListDraft />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
