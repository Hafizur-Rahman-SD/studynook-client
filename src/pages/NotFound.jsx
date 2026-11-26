import { Link } from 'react-router-dom'
import useTitle from '../hooks/useTitle.js'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  useTitle('StudyNook – Page Not Found')
  return <div className="container page-section empty-state"><h1>Page not found</h1><p>The link may be old or the page may have moved.</p><Link to="/"><Button>Back to Home</Button></Link></div>
}
