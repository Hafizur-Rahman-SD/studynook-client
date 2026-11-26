import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../lib/api.js'
import { START_HOURS, END_HOURS } from '../../lib/constants.js'
import Button from '../ui/Button.jsx'

const today = () => { const d = new Date(); const off = d.getTimezoneOffset(); return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10) }
export default function BookingForm({ room, onSuccess }) {
  const [date, setDate] = useState(today())
  const [startHour, setStartHour] = useState(8)
  const [endHour, setEndHour] = useState(9)
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const validEnds = END_HOURS.filter(hour => hour > startHour)
  const endValid = validEnds.includes(Number(endHour))
  const total = useMemo(() => endValid ? (Number(endHour) - Number(startHour)) * room.hourlyRate : 0, [endHour, startHour, room.hourlyRate, endValid])
  const submit = async (e) => {
    e.preventDefault()
    if (!endValid) return
    setSubmitting(true)
    try { await api.post('/bookings', { roomId: room._id, date, startHour: Number(startHour), endHour: Number(endHour), note }); toast.success('Room booked successfully!'); onSuccess() }
    catch (err) { toast.error(err.response?.data?.message || 'Unable to book this room.') }
    finally { setSubmitting(false) }
  }
  return (
    <form className="form-grid" onSubmit={submit}>
      <label>Date<input type="date" min={today()} value={date} onChange={e => setDate(e.target.value)} required /></label>
      <div className="form-two"><label>Start time<select value={startHour} onChange={e => { const v = Number(e.target.value); setStartHour(v); setEndHour(v + 1) }}>{START_HOURS.map(h => <option value={h} key={h}>{String(h).padStart(2, '0')}:00</option>)}</select></label>
        <label>End time{validEnds.length ? <select value={endHour} onChange={e => setEndHour(e.target.value)}>{validEnds.map(h => <option value={h} key={h}>{String(h).padStart(2, '0')}:00</option>)}</select> : <><span className="field-error">Choose an earlier start time.</span><select disabled /></>}</label></div>
      <p className="booking-total">Total: ${total}</p>
      <label>Note (optional)<textarea value={note} onChange={e => setNote(e.target.value)} /></label>
      <Button type="submit" disabled={submitting || !endValid}>{submitting ? 'Booking…' : 'Confirm Booking'}</Button>
    </form>
  )
}
