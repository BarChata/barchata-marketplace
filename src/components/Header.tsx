import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Header() {
  const [user, setUser] = useState<any>(null)
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
    <header style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo — exact BarAds Media style */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Speech bubble D logo */}
          <div style={{ width: 38, height: 38, position: 'relative' }}>
            <svg viewBox="0 0 100 100" width="38" height="38">
              <path d="M10,10 Q10,5 15,5 L85,5 Q90,5 90,10 L90,70 Q90,75 85,75 L55,75 L40,92 L40,75 L15,75 Q10,75 10,70 Z" fill="#F5A623"/>
              <text x="50" y="58" textAnchor="middle" fontSize="48" fontWeight="900" fill="#0D1B2A" fontFamily="sans-serif">B</text>
            </svg>
          </div>
          <div>
            <div style={{ color: '#0D1B2A', fontWeight: 800, fontSize: 17, lineHeight: 1 }}>BarChata</div>
            <div style={{ color: '#F5A623', fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Marketplace</div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link to="/browse" style={{ color: '#4B5563', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Browse</Link>
          <Link to="/browse?network=barnet" style={{ color: '#4B5563', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>BarNet</Link>
          <Link to="/browse?network=barnone" style={{ color: '#4B5563', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>BarNone</Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Link to="/dashboard" style={{ color: '#4B5563', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Dashboard</Link>
              <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #D1D5DB', borderRadius: 8, padding: '8px 16px', color: '#374151', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Link to="/login" style={{ color: '#4B5563', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Login</Link>
              <Link to="/login?signup=true" style={{ background: '#F5A623', borderRadius: 8, padding: '9px 20px', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                List Your Business
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
