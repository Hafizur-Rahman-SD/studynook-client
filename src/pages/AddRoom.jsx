import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api.js'
import useTitle from '../hooks/useTitle.js'
import RoomForm from '../components/rooms/RoomForm.jsx'

export default function AddRoom() {
  useTitle('StudyNook – Add Room')
  const [submitting, setSubmitting] = useState(false); const navigate = useNavigate()
  const submit = async data => { setSubmitting(true); try { await api.post('/rooms', data); toast.success('Room added successfully'); navigate('/my-listings') } catch (err) { toast.error(err.response?.data?.message || 'Unable to add room.') } finally { setSubmitting(false) } }
  return <div className="container page-section form-page"><h1>Add Room</h1><RoomForm submitLabel="Add Room" submitting={submitting} onSubmit={submit} /></div>
}
