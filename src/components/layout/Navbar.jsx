import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import Button from '../ui/Button.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const close = () => setOpen(false)
  const handleLogout = async () => { await logout(); setProfileOpen(false); close(); navigate('/') }
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link className="brand" to="/" onClick={close}>StudyNook</Link>
        <button className="menu-button" type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}>☰</button>
        <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/rooms" onClick={close}>Rooms</NavLink>
          {user ? (
            <>
              <NavLink to="/add-room" onClick={close}>Add Room</NavLink>
              <NavLink to="/my-listings" onClick={close}>My Listings</NavLink>
              <NavLink to="/my-bookings" onClick={close}>My Bookings</NavLink>
            </>
          ) : (
            <div className="mobile-auth-links">
              <Link to="/login" onClick={close}><Button variant="secondary" style={{ width: '100%' }}>Login</Button></Link>
              <Link to="/register" onClick={close}><Button style={{ width: '100%' }}>Register</Button></Link>
            </div>
          )}
        </nav>
        <div className="nav-actions">
          <button className="theme-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾' : '☀'}</button>
          {!user ? <><Link to="/login"><Button variant="secondary">Login</Button></Link><Link to="/register"><Button>Register</Button></Link></> : (
            <div className="profile"><button className="profile-button" type="button" onClick={() => setProfileOpen(v => !v)} aria-expanded={profileOpen}><img src={user.photo} alt="" /><span>{user.name}</span></button>
              {profileOpen && <div className="profile-menu"><button type="button" onClick={handleLogout}>Logout</button></div>}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
