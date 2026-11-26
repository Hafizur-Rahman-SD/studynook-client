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
  const [form, setForm] = useState({ name: '', email: '', photo: '', password: '' }); const [passwordError, setPasswordError] = useState(''); const [submitting, setSubmitting] = useState(false)
  const { setUser } = useAuth(); const navigate = useNavigate()
  const set = e => setForm(v => ({ ...v, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault(); setPasswordError('')
    if (form.password.length < 6 || !/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password)) { setPasswordError('Password must have at least 6 characters, one uppercase letter, and one lowercase letter.'); return }
    try { const url = new URL(form.photo); if (!['http:', 'https:'].includes(url.protocol)) throw new Error() } catch { toast.error('Photo URL must be a valid HTTP or HTTPS URL.'); return }
    setSubmitting(true)
    try { await api.post('/auth/register', form); toast.success('Registration successful! Please login.'); navigate('/login') } catch (err) { toast.error(err.response?.data?.message || 'Unable to register.') } finally { setSubmitting(false) }
  }
  const google = async credentialResponse => { try { const r = await api.post('/auth/google', { credential: credentialResponse.credential }); setUser(r.data); navigate('/') } catch (err) { toast.error(err.response?.data?.message || 'Google sign-in failed') } }
  return <div className="container auth-page"><div className="auth-card"><h1>Register</h1><form className="form-grid" onSubmit={submit}><label>Name<input name="name" required value={form.name} onChange={set} /></label><label>Email<input name="email" type="email" required value={form.email} onChange={set} /></label><label>Photo URL<input name="photo" required value={form.photo} onChange={set} /></label><label>Password<input name="password" type="password" required value={form.password} onChange={set} />{passwordError && <span className="field-error">{passwordError}</span>}</label><Button type="submit" disabled={submitting}>{submitting ? 'Registering…' : 'Register'}</Button></form><div className="auth-divider">or</div><GoogleLogin onSuccess={google} onError={() => toast.error('Google sign-in failed')} /><p className="auth-link">Already have an account? <Link to="/login">Login</Link></p></div></div>
}
