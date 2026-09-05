import client from './client'

export async function login(username, password) {
  const res = await client.post('/login', { username, password })
  return res.data
}
