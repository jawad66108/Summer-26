import client from './client'

export async function getLostDamagedReport(params = {}) {
  const res = await client.get('/reports/lost-damaged', { params })
  return res.data
}

export function getLostDamagedExportUrl(format, params = {}) {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  const query = new URLSearchParams({ ...params, format }).toString()
  return `${base}/reports/lost-damaged/export?${query}`
}

export async function getPurchaseListLive(params = {}) {
  const res = await client.get('/reports/purchase-list', { params })
  return res.data
}

export async function createPurchaseDraft() {
  const res = await client.post('/reports/purchase-list/draft')
  return res.data
}

export async function getPurchaseDraft(id) {
  const res = await client.get(`/reports/purchase-list/draft/${id}`)
  return res.data
}

export async function updatePurchaseDraft(id, payload) {
  const res = await client.put(`/reports/purchase-list/draft/${id}`, payload)
  return res.data
}

export function getPurchaseDraftExportUrl(id, format) {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  return `${base}/reports/purchase-list/draft/${id}/export?format=${format}`
}
