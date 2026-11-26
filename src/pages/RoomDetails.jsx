import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import useTitle from '../hooks/useTitle.js'
import Spinner from '../components/ui/Spinner.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import BookingForm from '../components/rooms/BookingForm.jsx'
import RoomForm from '../components/rooms/RoomForm.jsx'

export default function RoomDetails() {
  useTitle('StudyNook – Room Details')
  const { id } = useParams(); const { user } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [room, setRoom] = useState(null); const [loading, setLoading] = useState(true); const [missing, setMissing] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false); const [editOpen, setEditOpen] = useState(false); const [deleteOpen, setDeleteOpen] = useState(false); const [submitting, setSubmitting] = useState(false)
  const load = () => { setLoading(true); api.get(`/rooms/${id}`).then(r => setRoom(r.data)).catch(() => setMissing(true)).finally(() => setLoading(false)) }
  useEffect(load, [id])
  const owner = user && room?.owner && (typeof room.owner === 'object' ? room.owner._id : room.owner) === user.id
  const update = async data => { setSubmitting(true); try { await api.put(`/rooms/${room._id}`, data); toast.success('Room updated successfully'); setEditOpen(false); load() } catch (err) { toast.error(err.response?.data?.message || 'Unable to update room.') } finally { setSubmitting(false) } }
  const remove = async () => { setSubmitting(true); try { await api.delete(`/rooms/${room._id}`); toast.success('Room deleted successfully'); navigate('/my-listings') } catch (err) { toast.error(err.response?.data?.message || 'Unable to delete room.') } finally { setSubmitting(false) } }
  if (loading) return <Spinner />
  if (missing) return <div className="container page-section empty-state"><h1>This room is no longer listed.</h1><Link to="/rooms"><Button>Back to Rooms</Button></Link></div>
  return <div className="container page-section"><div className="detail-grid"><img className="detail-image" src={room.image} alt={room.name} /><div><h1>{room.name}</h1><p className="detail-description">{room.description}</p><dl className="detail-meta"><div><dt>Floor</dt><dd>{room.floor}</dd></div><div><dt>Capacity</dt><dd>Up to {room.capacity} people</dd></div><div><dt>Hourly rate</dt><dd>${room.hourlyRate}/hr</dd></div><div><dt>Booking count</dt><dd>{room.bookingCount}</dd></div>{room.owner?.name && <div><dt>Owner</dt><dd>{room.owner.name}</dd></div>}</dl><div className="chips">{room.amenities.map(a => <span className="chip" key={a}>{a}</span>)}</div><div className="detail-actions">{user ? <Button onClick={() => setBookingOpen(true)}>Book Now</Button> : <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>Login to Book</Button>}{owner && <><Button variant="secondary" onClick={() => setEditOpen(true)}>Edit</Button><Button variant="danger" onClick={() => setDeleteOpen(true)}>Delete</Button></>}</div></div></div>
    <Modal open={bookingOpen} title="Book this room" onClose={() => setBookingOpen(false)}><BookingForm room={room} onSuccess={() => { setBookingOpen(false); load() }} /></Modal>
    <Modal open={editOpen} title="Edit room" onClose={() => setEditOpen(false)}><RoomForm initial={room} submitLabel="Save changes" submitting={submitting} onSubmit={update} /></Modal>
    <Modal open={deleteOpen} title="Delete room" onClose={() => setDeleteOpen(false)}><p>Delete this room? This cannot be undone.</p><div className="modal-actions"><Button variant="secondary" onClick={() => setDeleteOpen(false)}>Keep room</Button><Button variant="danger" onClick={remove} disabled={submitting}>Delete room</Button></div></Modal>
  </div>
}
