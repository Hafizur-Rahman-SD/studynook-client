import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api.js'
import useTitle from '../hooks/useTitle.js'
import Spinner from '../components/ui/Spinner.jsx'
import RoomCard from '../components/rooms/RoomCard.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import RoomForm from '../components/rooms/RoomForm.jsx'

export default function MyListings() {
  useTitle('StudyNook – My Listings')
  const [rooms, setRooms] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  const [edit, setEdit] = useState(null); const [remove, setRemove] = useState(null); const [submitting, setSubmitting] = useState(false)
  const load = () => { setLoading(true); api.get('/rooms/mine').then(r => setRooms(r.data)).catch(() => setError('Unable to load your listings.')).finally(() => setLoading(false)) }
  useEffect(load, [])
  const update = async data => { setSubmitting(true); try { await api.put(`/rooms/${edit._id}`, data); toast.success('Room updated successfully'); setEdit(null); load() } catch (err) { toast.error(err.response?.data?.message || 'Unable to update room.') } finally { setSubmitting(false) } }
  const removeRoom = async () => { setSubmitting(true); try { await api.delete(`/rooms/${remove._id}`); toast.success('Room deleted successfully'); setRemove(null); load() } catch (err) { toast.error(err.response?.data?.message || 'Unable to delete room.') } finally { setSubmitting(false) } }
  return <div className="container page-section"><h1>My Listings</h1>{loading ? <Spinner /> : error ? <p className="error-state">{error}</p> : !rooms.length ? <div className="empty-state"><p>You have not listed any rooms yet.</p><Link to="/add-room"><Button>Add Room</Button></Link></div> : <div className="room-grid">{rooms.map(room => <RoomCard key={room._id} room={room} actions={<><Button variant="secondary" onClick={() => setEdit(room)}>Edit</Button><Button variant="danger" onClick={() => setRemove(room)}>Delete</Button></>} />)}</div>}
    <Modal open={!!edit} title="Edit room" onClose={() => setEdit(null)}>{edit && <RoomForm initial={edit} submitLabel="Save changes" submitting={submitting} onSubmit={update} />}</Modal>
    <Modal open={!!remove} title="Delete room" onClose={() => setRemove(null)}><p>Delete this room? This cannot be undone.</p><div className="modal-actions"><Button variant="secondary" onClick={() => setRemove(null)}>Keep room</Button><Button variant="danger" onClick={removeRoom} disabled={submitting}>Delete room</Button></div></Modal>
  </div>
}
