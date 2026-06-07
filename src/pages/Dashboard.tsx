import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/login'); return }
      setUser(session.user)
      supabase.from('marketplace_listings').select('*').eq('venue_id', session.user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => { setListings(data || []); setLoading(false) })
    })
  }, [])

  const toggleListing = async (id: string, current: boolean) => {
    await supabase.from('marketplace_listings').update({ is_active: !current }).eq('id', id)
    setListings(prev => prev.map(l => l.id === id ? { ...l, is_active: !current } : l))
  }

  const deleteListing = async (id: string) => {
    if (!confirm('Delete this listing?')) return
    await supabase.from('marketplace_listings').delete().eq('id', id)
    setListings(prev => prev.filter(l => l.id !== id))
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 6 }}>Your Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{user?.email}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="https://biz.barchata.com/venue/portal" target="_blank"
            style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 10, padding: '10px 18px', color: '#F5A623', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Open Biz Portal →
          </a>
          <a href="https://biz.barchata.com" target="_blank"
            style={{ background: '#F5A623', borderRadius: 10, padding: '10px 18px', color: '#0A1628', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            BarChata Biz Dashboard →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {[
          { label: 'Total Listings', value: listings.length },
          { label: 'Active Listings', value: listings.filter(l => l.is_active).length },
          { label: 'Total Hearts Value', value: listings.reduce((s, l) => s + (l.price_hearts || 0), 0).toLocaleString() + ' ❤️' },
        ].map(s => (
          <div key={s.label} style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 28px' }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{s.label}</p>
            <p style={{ color: '#fff', fontSize: 28, fontWeight: 800 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>Your Listings</h2>
          <a href="https://biz.barchata.com/venue/portal" target="_blank"
            style={{ background: '#F5A623', borderRadius: 8, padding: '8px 16px', color: '#0A1628', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            + New Listing
          </a>
        </div>
        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
        ) : listings.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>No listings yet.</p>
            <a href="https://biz.barchata.com/venue/portal" target="_blank"
              style={{ background: '#F5A623', borderRadius: 10, padding: '12px 24px', color: '#0A1628', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Create your first listing on Biz Portal
            </a>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Listing', 'Type', 'Price', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{l.title}</p>
                    {l.description && <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 2 }}>{l.description.slice(0, 50)}...</p>}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, textTransform: 'uppercase' }}>{l.type}</span>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#F5A623', fontWeight: 700, fontSize: 14 }}>{l.price_hearts?.toLocaleString()} ❤️</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ background: l.is_active ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)', color: l.is_active ? '#34D399' : 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
                      {l.is_active ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => toggleListing(l.id, l.is_active)}
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', color: '#fff', fontSize: 12, cursor: 'pointer' }}>
                        {l.is_active ? 'Pause' : 'Activate'}
                      </button>
                      <button onClick={() => deleteListing(l.id)}
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '6px 12px', color: '#F87171', fontSize: 12, cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
