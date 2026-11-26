import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="footer-brand" to="/">StudyNook</Link>
          <p className="footer-copy">A quiet place to read, focus, and work.</p>
          <p style={{ marginTop: '0.6rem', fontSize: '0.85rem' }}>
            Built &amp; Maintained by{' '}
            <a
              href="https://portfolio-website-blue-seven-66.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: 600, textDecoration: 'underline' }}
            >
              Hafizur Rahman
            </a>
          </p>
        </div>
        <nav className="footer-links" aria-label="Useful links"><Link to="/">Home</Link><Link to="/rooms">Rooms</Link><Link to="/about">About</Link></nav>
        <div className="footer-contact">
          <a href="mailto:hafizurrahman5004@gmail.com">hafizurrahman5004@gmail.com</a>
          <a href="tel:+8801605135004">+880 1605-135004</a>
          <div className="socials">
            <a href="https://github.com/Hafizur-Rahman-SD" target="_blank" rel="noreferrer" aria-label="GitHub">gh</a>
            <a href="https://portfolio-website-blue-seven-66.vercel.app/" target="_blank" rel="noreferrer" aria-label="Portfolio">🌐</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
      <div className="container copyright">
        © {year} StudyNook. All rights reserved. Developed by{' '}
        <a href="https://portfolio-website-blue-seven-66.vercel.app/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', fontWeight: 600 }}>
          Hafizur Rahman
        </a>
      </div>
    </footer>
  )
}
