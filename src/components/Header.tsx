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
          {/* BarAds-style speech bubble logo */}
          <div style={{ width: 38, height: 38 }}>
            <svg viewBox="0 0 100 100" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
              {/* Outer bubble */}
              <path d="M8,8 Q8,2 14,2 L86,2 Q92,2 92,8 L92,68 Q92,74 86,74 L58,74 L46,94 L46,74 L14,74 Q8,74 8,68 Z" fill="#F5A623"/>
              {/* D shape cutout — thick D */}
              <path d="M32,22 L32,58 L52,58 Q68,58 68,40 Q68,22 52,22 Z M42,32 L50,32 Q56,32 56,40 Q56,48 50,48 L42,48 Z" fill="#0D1B2A"/>
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
