import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../lib/api.js'
import useTitle from '../hooks/useTitle.js'
import Spinner from '../components/ui/Spinner.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'

const localToday = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10) }
export default function MyBookings() {
  useTitle('StudyNook – My Bookings')
  const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [cancel, setCancel] = useState(null); const [submitting, setSubmitting] = useState(false)
  const load = () => { setLoading(true); api.get('/bookings/mine').then(r => setBookings(r.data)).catch(() => setError('Unable to load your bookings.')).finally(() => setLoading(false)) }
  useEffect(load, [])
  const cancelBooking = async () => { setSubmitting(true); try { await api.patch(`/bookings/${cancel._id}/cancel`); toast.success('Booking cancelled'); setCancel(null); load() } catch (err) { toast.error(err.response?.data?.message || 'Unable to cancel booking.') } finally { setSubmitting(false) } }
  const canCancel = b => b.status === 'confirmed' && b.date >= localToday()
  return <div className="container page-section"><h1>My Bookings</h1>{loading ? <Spinner /> : error ? <p className="error-state">{error}</p> : !bookings.length ? <p className="empty-state">You have no bookings yet.</p> : <>
    <div className="booking-table-wrap"><table className="booking-table"><thead><tr><th>Room</th><th>Date</th><th>Time</th><th>Total cost</th><th>Status</th><th>Action</th></tr></thead><tbody>{bookings.map(b => <tr key={b._id}><td><div className="table-room"><img src={b.room?.image} alt="" /><span>{b.room?.name}</span></div></td><td>{b.date}</td><td>{String(b.startHour).padStart(2, '0')}:00–{String(b.endHour).padStart(2, '0')}:00</td><td>${b.totalCost}</td><td><span className={`status ${b.status}`}>{b.status}</span></td><td>{canCancel(b) && <Button variant="danger" onClick={() => setCancel(b)}>Cancel</Button>}</td></tr>)}</tbody></table></div>
    <div className="booking-cards">{bookings.map(b => <article className="booking-card" key={b._id}><img src={b.room?.image} alt="" /><h2>{b.room?.name}</h2><p><strong>Date:</strong> {b.date}</p><p><strong>Time:</strong> {String(b.startHour).padStart(2, '0')}:00–{String(b.endHour).padStart(2, '0')}:00</p><p><strong>Total cost:</strong> ${b.totalCost}</p><span className={`status ${b.status}`}>{b.status}</span>{canCancel(b) && <Button variant="danger" onClick={() => setCancel(b)}>Cancel</Button>}</article>)}</div>
  </>}
  <Modal open={!!cancel} title="Cancel booking" onClose={() => setCancel(null)}><p>Cancel this booking?</p><div className="modal-actions"><Button variant="secondary" onClick={() => setCancel(null)}>Keep booking</Button><Button variant="danger" onClick={cancelBooking} disabled={submitting}>Cancel booking</Button></div></Modal></div>
}
