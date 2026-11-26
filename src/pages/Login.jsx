import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import useTitle from '../hooks/useTitle.js'
import Button from '../components/ui/Button.jsx'

export default function Login() {
  useTitle('StudyNook – Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from
  const destination = typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') ? from : '/'

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const r = await api.post('/auth/login', { email: email.trim(), password })
      setUser(r.data)
      navigate(destination, { replace: true })
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setSubmitting(false)
    }
  }

  const google = async (credentialResponse) => {
    try {
      const r = await api.post('/auth/google', { credential: credentialResponse.credential })
      setUser(r.data)
      navigate(destination, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p style={{ marginTop: '0.25rem', marginBottom: '1.25rem', fontSize: '0.92rem', color: 'var(--muted)' }}>
          Welcome back to StudyNook
        </p>
        <form className="form-grid" onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yourname@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your account password"
            />
          </label>
          <Button type="submit" disabled={submitting} className="auth-submit-btn">
            {submitting ? 'Logging in…' : 'Login'}
          </Button>
        </form>

        <div className="auth-divider">or continue with</div>
        <div className="google-auth-wrap">
          <GoogleLogin
            onSuccess={google}
            onError={() => toast.error('Google sign-in failed')}
            width="100%"
          />
        </div>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
