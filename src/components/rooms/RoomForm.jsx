import { useEffect, useState } from 'react'
import { AMENITIES } from '../../lib/constants.js'
import Button from '../ui/Button.jsx'

const empty = { name: '', description: '', image: '', floor: '', capacity: '', hourlyRate: '', amenities: [] }
export default function RoomForm({ initial, submitLabel, onSubmit, submitting }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  useEffect(() => { if (initial) setForm({ ...empty, ...initial, amenities: initial.amenities || [], capacity: initial.capacity || '', hourlyRate: initial.hourlyRate || '' }) }, [initial])
  const set = (e) => setForm(v => ({ ...v, [e.target.name]: e.target.value }))
  const toggle = (value) => setForm(v => ({ ...v, amenities: v.amenities.includes(value) ? v.amenities.filter(a => a !== value) : [...v.amenities, value] }))
  const submit = (e) => {
    e.preventDefault(); setError('')
    if (!form.name || !form.description || !form.image || !form.floor || !form.capacity || !form.hourlyRate) return setError('All fields are required.')
    try { const url = new URL(form.image); if (!['http:', 'https:'].includes(url.protocol)) throw new Error() } catch { return setError('Image must be a valid HTTP or HTTPS URL.') }
    if (Number(form.capacity) < 1 || Number(form.hourlyRate) < 1) return setError('Capacity and hourly rate must be at least 1.')
    if (!form.amenities.length) return setError('Select at least one amenity.')
    onSubmit({ ...form, capacity: Number(form.capacity), hourlyRate: Number(form.hourlyRate) })
  }
  return (
    <form className="form-grid" onSubmit={submit}>
      {error && <p className="field-error" role="alert">{error}</p>}
      <label>Room name<input name="name" value={form.name} onChange={set} required /></label>
      <label>Description<textarea name="description" value={form.description} onChange={set} required /></label>
      <label>Image URL<input name="image" value={form.image} onChange={set} required /></label>
      <label>Floor<input name="floor" value={form.floor} onChange={set} placeholder="3rd Floor" required /></label>
      <div className="form-two"><label>Capacity<input type="number" min="1" name="capacity" value={form.capacity} onChange={set} required /></label><label>Hourly rate (dollars)<input type="number" min="1" name="hourlyRate" value={form.hourlyRate} onChange={set} required /></label></div>
      <fieldset><legend>Amenities</legend><div className="checkbox-grid">{AMENITIES.map(a => <label className="check-label" key={a}><input type="checkbox" checked={form.amenities.includes(a)} onChange={() => toggle(a)} />{a}</label>)}</div></fieldset>
      <Button type="submit" disabled={submitting}>{submitLabel}</Button>
    </form>
  )
}
