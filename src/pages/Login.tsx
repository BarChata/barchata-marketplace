import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(params.get('signup') === 'true')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = async () => {
    setLoading(true); setError('')
    const { error: e } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    if (e) { setError(e.message); setLoading(false); return }
    navigate('/dashboard')
  }

  const input = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 18px', color: '#fff' as const, fontSize: 15, outline: 'none', width: '100%' }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#132233', border: '1px solid rgba(245,166,35,0.15)', borderRadius: 24, padding: 48, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <span style={{ color: '#0A1628', fontWeight: 900, fontSize: 24 }}>B</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 24, marginBottom: 8 }}>{isSignup ? 'List Your Venue' : 'Welcome Back'}</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{isSignup ? 'Create your BarChata Marketplace account' : 'Sign in to manage your listings'}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={input} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={input} onKeyDown={e => e.key === 'Enter' && handle()} />
          {error && <p style={{ color: '#F87171', fontSize: 13, textAlign: 'center' }}>{error}</p>}
          <button onClick={handle} disabled={loading}
            style={{ background: '#F5A623', border: 'none', borderRadius: 12, padding: 16, color: '#0A1628', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.6 : 1, marginTop: 4 }}>
            {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </div>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsSignup(!isSignup)}
              style={{ background: 'none', border: 'none', color: '#F5A623', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginLeft: 6 }}>
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 16 }}>
            Or manage your venue at{' '}
            <a href="https://biz.barchata.com" style={{ color: '#F5A623' }}>biz.barchata.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
