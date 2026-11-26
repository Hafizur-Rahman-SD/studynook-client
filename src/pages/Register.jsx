import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import useTitle from '../hooks/useTitle.js'
import Button from '../components/ui/Button.jsx'

export default function Register() {
  useTitle('StudyNook – Register')
  const [form, setForm] = useState({ name: '', email: '', photo: '', password: '' })
  const [passwordError, setPasswordError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const set = (e) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    if (!form.name.trim() || !form.email.trim() || !form.photo.trim() || !form.password) {
      toast.error('Please fill in all fields (Name, Email, Photo URL, Password)')
      return
    }
    if (form.password.length < 6 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password)) {
      setPasswordError('Password must have at least 6 characters, one uppercase letter, and one lowercase letter.')
      return
    }
    try {
      const url = new URL(form.photo.trim())
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
    } catch {
      toast.error('Photo URL must be a valid HTTP or HTTPS URL (e.g. https://images.unsplash.com/...)')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/auth/register', {
        name: form.name.trim(),
        email: form.email.trim(),
        photo: form.photo.trim(),
        password: form.password,
      })
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Unable to register.')
    } finally {
      setSubmitting(false)
    }
  }

  const google = async (credentialResponse) => {
    try {
      const r = await api.post('/auth/google', { credential: credentialResponse.credential })
      setUser(r.data)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <p style={{ marginTop: '0.25rem', marginBottom: '1.25rem', fontSize: '0.92rem', color: 'var(--muted)' }}>
          Create an account to browse and book library rooms
        </p>
        <form className="form-grid" onSubmit={submit}>
          <label>
            Name <span style={{ color: 'var(--danger)' }}>*</span>
            <input
              name="name"
              required
              value={form.name}
              onChange={set}
              placeholder="e.g. Tanvir Ahmed"
            />
          </label>
          <label>
            Email <span style={{ color: 'var(--danger)' }}>*</span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={set}
              placeholder="e.g. tanvir@example.com"
            />
          </label>
          <label>
            Photo URL <span style={{ color: 'var(--danger)' }}>*</span>
            <input
              name="photo"
              required
              value={form.photo}
              onChange={set}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </label>
          <label>
            Password <span style={{ color: 'var(--danger)' }}>*</span>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={set}
              placeholder="Min 6 chars (1 Upper, 1 Lower)"
            />
            {passwordError && <span className="field-error">{passwordError}</span>}
          </label>
          <Button type="submit" disabled={submitting} className="auth-submit-btn">
            {submitting ? 'Registering…' : 'Register'}
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
