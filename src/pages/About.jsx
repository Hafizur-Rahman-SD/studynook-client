import useTitle from '../hooks/useTitle.js'

export default function About() {
  useTitle('StudyNook – About')
  return (
    <div className="container page-section about-page">
      <h1>About StudyNook</h1>
      <div className="about-copy">
        <p>StudyNook is a full-stack library study-room booking platform that helps students and readers find and book quiet private spaces by the hour.</p>
        <p>Registered users who control a study room can list it for others to reserve. Room owners can update or remove only their own listings.</p>
        <p>Bookings are managed with automated time-conflict prevention: the platform rejects overlapping bookings using MongoDB query range checks ($gte, $lte) so no room can ever be double-booked.</p>
        <p>Sessions are secured with JWT stored in HTTP-only cookies to ensure credentials remain protected and persistent across page reloads.</p>

        <section style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px solid var(--oak)', borderRadius: '0.5rem', background: 'var(--card)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Developer Profile</h2>
          <p>
            Developed by <strong>Hafizur Rahman</strong> as a full-stack library room booking showcase application.
          </p>
          <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.25rem', color: 'var(--muted)', lineHeight: '1.8' }}>
            <li><strong>Developer:</strong> Hafizur Rahman</li>
            <li><strong>Portfolio:</strong> <a href="https://portfolio-website-blue-seven-66.vercel.app/" target="_blank" rel="noreferrer">portfolio-website-blue-seven-66.vercel.app</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/Hafizur-Rahman-SD" target="_blank" rel="noreferrer">github.com/Hafizur-Rahman-SD</a></li>
            <li><strong>Email:</strong> <a href="mailto:hafizurrahman5004@gmail.com">hafizurrahman5004@gmail.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+8801605135004">+880 1605-135004</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
