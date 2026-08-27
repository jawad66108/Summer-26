import client from './client'

export async function getLostRecords(params = {}) {
  const res = await client.get('/lost-records', { params })
  return res.data
}

export async function createLostRecord(payload) {
  const res = await client.post('/lost-records', payload)
  return res.data
}

export async function markLostReplaced(id) {
  const res = await client.patch(`/lost-records/${id}/replace`)
  return res.data
}
