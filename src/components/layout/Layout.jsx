import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const location = useLocation()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return <div className="site-shell"><Navbar /><main className="site-main"><motion.div key={location.pathname} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}><Outlet /></motion.div></main><Footer /></div>
}
