import { createContext, useContext, useState, useCallback } from 'react'
import { login as apiLogin } from '../api/auth'

const AuthContext = createContext(null)

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded
  } catch (e) {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('kl_token'))
  const [role, setRole] = useState(() => localStorage.getItem('kl_role'))
  const [username, setUsername] = useState(() => localStorage.getItem('kl_username'))

  const login = useCallback(async (usernameInput, password) => {
    const data = await apiLogin(usernameInput, password)
    const jwt = data.token
    const decoded = decodeJwt(jwt) || {}
    const userRole = data.role || decoded.role || 'committee'
    const userName = data.username || decoded.username || usernameInput

    localStorage.setItem('kl_token', jwt)
    localStorage.setItem('kl_role', userRole)
    localStorage.setItem('kl_username', userName)

    setToken(jwt)
    setRole(userRole)
    setUsername(userName)

    return { role: userRole }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('kl_token')
    localStorage.removeItem('kl_role')
    localStorage.removeItem('kl_username')
    setToken(null)
    setRole(null)
    setUsername(null)
  }, [])

  const value = {
    token,
    role,
    username,
    isAuthenticated: !!token,
    isAdmin: role === 'admin',
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
