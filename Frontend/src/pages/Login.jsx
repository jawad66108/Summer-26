import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      const redirectTo = location.state?.from || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-mark">KL</div>
        <h1 className="display">Kit Ledger</h1>
        <p className="tag">SPORTS EQUIPMENT · CADET WING SUPPLY</p>

        {error && <div className="login-error">{error}</div>}

        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary display" disabled={loading}>
          {loading ? 'Signing In…' : 'Sign In'}
        </button>
        <p className="login-foot">ACCESS LOGGED · QUARTERMASTER USE ONLY</p>
      </form>
    </div>
  )
}
