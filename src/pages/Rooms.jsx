import { useEffect, useState } from 'react'
import api from '../lib/api.js'
import { AMENITIES } from '../lib/constants.js'
import useTitle from '../hooks/useTitle.js'
import Spinner from '../components/ui/Spinner.jsx'
import RoomCard from '../components/rooms/RoomCard.jsx'
import Button from '../components/ui/Button.jsx'

export default function Rooms() {
  useTitle('StudyNook – Available Rooms')
  const [rooms, setRooms] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  const [search, setSearch] = useState(''); const [selected, setSelected] = useState([]); const [minRate, setMinRate] = useState(''); const [maxRate, setMaxRate] = useState('')
  const load = async () => {
    setLoading(true); setError('')
    try { const params = {}; if (search) params.search = search; if (selected.length) params.amenities = selected.join(','); if (minRate) params.minRate = minRate; if (maxRate) params.maxRate = maxRate; const r = await api.get('/rooms', { params }); setRooms(r.data) } catch { setError('Unable to load rooms.') } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])
  const toggle = a => setSelected(v => v.includes(a) ? v.filter(x => x !== a) : [...v, a])
  return <div className="container page-section"><h1>Available Rooms</h1><form className="filters" onSubmit={e => { e.preventDefault(); load() }}><label className="search-label">Search by room name<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms" /></label><fieldset><legend>Amenities</legend><div className="checkbox-grid">{AMENITIES.map(a => <label className="check-label" key={a}><input type="checkbox" checked={selected.includes(a)} onChange={() => toggle(a)} />{a}</label>)}</div></fieldset><div className="form-two"><label>Minimum hourly rate<input type="number" min="0" value={minRate} onChange={e => setMinRate(e.target.value)} /></label><label>Maximum hourly rate<input type="number" min="0" value={maxRate} onChange={e => setMaxRate(e.target.value)} /></label></div><Button type="submit">Apply Filters</Button></form>{loading ? <Spinner /> : error ? <p className="error-state">{error}</p> : !rooms.length ? <p className="empty-state">No rooms found</p> : <div className="room-grid">{rooms.map(room => <RoomCard room={room} key={room._id} />)}</div>}</div>
}
