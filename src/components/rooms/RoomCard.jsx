import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../ui/Button.jsx'

export default function RoomCard({ room, actions }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const description = room.description?.length > 100 ? `${room.description.slice(0, 100).trim()}…` : room.description
  return (
    <motion.article className="room-card" whileHover={reduce ? undefined : { y: -4 }} transition={{ duration: 0.18 }}>
      <div className="room-image-wrap"><img src={room.image} alt={room.name} className="room-image" /></div>
      <div className="room-card-body">
        <h2>{room.name}</h2><p className="room-description">{description}</p>
        <div className="room-meta"><span>{room.floor}</span><span>Up to {room.capacity} people</span></div>
        <p className="room-rate">${room.hourlyRate}/hr</p>
        <div className="chips">{room.amenities?.slice(0, 3).map(a => <span className="chip" key={a}>{a}</span>)}{room.amenities?.length > 3 && <span className="chip">+{room.amenities.length - 3} more</span>}</div>
        <div className="room-card-actions">{actions || <Link to={`/rooms/${room._id}`}><Button>View Details</Button></Link>}</div>
      </div>
    </motion.article>
  )
}
