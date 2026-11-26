import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddRoom from './pages/AddRoom.jsx'
import MyListings from './pages/MyListings.jsx'
import MyBookings from './pages/MyBookings.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-room" element={<PrivateRoute><AddRoom /></PrivateRoute>} />
        <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
        <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
