import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../lib/api.js'
import useTitle from '../hooks/useTitle.js'
import Spinner from '../components/ui/Spinner.jsx'
import Button from '../components/ui/Button.jsx'
import RoomCard from '../components/rooms/RoomCard.jsx'

export default function Home() {
  useTitle('StudyNook – Home')
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { api.get('/rooms/latest').then(r => setRooms(r.data)).catch(() => setError('Unable to load rooms.')).finally(() => setLoading(false)) }, [])
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <section className="hero-section"><div className="container hero-grid"><div><h1>Find Your Perfect Study Room</h1><p>Browse and book quiet, private study rooms in your library. List your own room and earn.</p><Link to="/rooms"><Button>Explore Rooms</Button></Link></div><div className="hero-panel"><span>Quiet</span><strong>Focus</strong><span>Belong</span></div></div></section>
      <section className="container page-section"><h2 className="section-title">Available Study Rooms</h2>{loading ? <Spinner /> : error ? <p className="error-state">{error}</p> : !rooms.length ? <p>No rooms have been listed yet.</p> : <div className="room-grid">{rooms.map(room => <RoomCard room={room} key={room._id} />)}</div>}</section>
      <section className="container info-grid"><article className="info-card"><h2>How booking works</h2><ol><li>Browse a room and choose the space that suits you.</li><li>Pick a date and an hourly slot.</li><li>Get a confirmed booking if that slot is free. A second person cannot take the same hours.</li></ol></article><article className="info-card"><h2>House rules</h2><p>Keep voices quiet, leave the room on time, and respect the next reader. The listed hourly rate is what the total is based on. Owners can edit or remove only rooms they added.</p></article></section>
    </motion.div>
  )
}
