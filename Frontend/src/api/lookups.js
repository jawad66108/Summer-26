import client from './client'

// field examples: 'brand', 'category', 'sport', 'unit', 'wing'
export async function getLookup(field) {
  const res = await client.get(`/lookups/${field}`)
  return res.data
}
