import client from './client'

export async function getDamagedRecords(params = {}) {
  const res = await client.get('/damaged-records', { params })
  return res.data
}

export async function createDamagedRecord(payload) {
  const res = await client.post('/damaged-records', payload)
  return res.data
}

export async function markDamagedReplaced(id) {
  const res = await client.patch(`/damaged-records/${id}/replace`)
  return res.data
}
