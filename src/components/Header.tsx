import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  // const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user || null))
    supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user || null))
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header style={{ background: '#0A1628', borderBottom: '1px solid rgba(245,166,35,0.15)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0A1628', fontWeight: 900, fontSize: 18 }}>B</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1 }}>BarChata</div>
            <div style={{ color: '#F5A623', fontWeight: 600, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Marketplace</div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link to="/browse" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Browse Listings</Link>
          <Link to="/browse?type=venue" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Venues</Link>
          <Link to="/browse?type=experience" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Experiences</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link to="/dashboard" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Dashboard</Link>
              <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 16px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link to="/login" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Login</Link>
              <Link to="/login?signup=true" style={{ background: '#F5A623', borderRadius: 8, padding: '8px 18px', color: '#0A1628', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                List Your Venue
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
