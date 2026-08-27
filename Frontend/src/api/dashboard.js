import client from './client'

export async function getDashboardSummary() {
  const res = await client.get('/dashboard/summary')
  return res.data
}
