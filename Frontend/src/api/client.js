import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const client = axios.create({
  baseURL: BASE_URL,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('kl_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('kl_token')
      localStorage.removeItem('kl_role')
      localStorage.removeItem('kl_username')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default client
