import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['All', 'Bar', 'Nightclub', 'Restaurant', 'Lounge', 'Event Space', 'Brewery']
const CITIES = ['All', 'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa']
const TYPES = ['All', 'table', 'bottle', 'ticket', 'experience', 'merch']

export default function Browse() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [venues, setVenues] = useState<any[]>([])
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'venues' | 'listings'>('venues')
  const [search, setSearch] = useState(params.get('q') || '')
  const [city, setCity] = useState(params.get('city') || 'All')
  const [category, setCategory] = useState(params.get('category') || 'All')
  const [type, setType] = useState(params.get('type') || 'All')

  useEffect(() => { loadData() }, [city, category, type])

  const loadData = async () => {
    setLoading(true)
    let vq = supabase.from('venues').select('*').eq('is_active', true)
    if (city !== 'All') vq = vq.eq('city', city)
    if (category !== 'All') vq = vq.eq('category', category)
    const { data: v } = await vq.order('name').limit(50)
    setVenues(v || [])

    let lq = supabase.from('marketplace_listings').select('*, venues(name, city, cover_image, category)').eq('is_active', true)
    if (type !== 'All') lq = lq.eq('type', type)
    const { data: l } = await lq.order('created_at', { ascending: false }).limit(50)
    setListings(l || [])
    setLoading(false)
  }

  const filteredVenues = venues.filter(v =>
    !search || v.name?.toLowerCase().includes(search.toLowerCase()) || v.city?.toLowerCase().includes(search.toLowerCase())
  )
  const filteredListings = listings.filter(l =>
    !search || l.title?.toLowerCase().includes(search.toLowerCase())
  )

  const s = { background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 13, padding: '10px 16px', outline: 'none', cursor: 'pointer' }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Browse Marketplace</h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Discover businesses, venues, experiences, listings and more.</p>

      {/* Filters */}
      <div style={{ background: '#0D1B2A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 32, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          style={{ ...s, flex: 1, minWidth: 200 }} />
        <select value={city} onChange={e => setCity(e.target.value)} style={s}>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={category} onChange={e => setCategory(e.target.value)} style={s}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4 }}>
          {(['venues', 'listings'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: view === v ? '#F5A623' : 'transparent', color: view === v ? '#0A1628' : 'rgba(255,255,255,0.5)' }}>
              {v === 'venues' ? 'Venues' : 'Listings'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
      ) : view === 'venues' ? (
        <>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginBottom: 20 }}>{filteredVenues.length} venues found</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filteredVenues.map(v => (
              <div key={v.id} onClick={() => navigate(`/listing/${v.id}`)}
                style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#F5A623'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'}>
                <div style={{ height: 160, background: '#0D1B2A', overflow: 'hidden' }}>
                  {v.cover_image
                    ? <img src={v.cover_image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#F5A623', fontSize: 36, fontWeight: 900 }}>{v.name?.[0]}</span>
                      </div>
                  }
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>
                      {v.network_type === 'barnone' ? 'BarNone' : 'BarNet'}
                    </span>
                    {v.rating && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>★ {v.rating}</span>}
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{v.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{[v.category, v.city].filter(Boolean).join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                style={{ padding: '6px 16px', borderRadius: 100, border: `1px solid ${type === t ? '#F5A623' : 'rgba(255,255,255,0.1)'}`, background: type === t ? 'rgba(245,166,35,0.15)' : 'transparent', color: type === t ? '#F5A623' : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginBottom: 20 }}>{filteredListings.length} listings found</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filteredListings.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 80, color: 'rgba(255,255,255,0.2)' }}>No listings yet. Check back soon.</div>
            ) : filteredListings.map(l => (
              <div key={l.id} onClick={() => navigate(`/listing/${l.id}?type=listing`)}
                style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#F5A623'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'}>
                {l.image_url && <img src={l.image_url} alt={l.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>{l.type}</span>
                    <span style={{ color: '#F5A623', fontWeight: 800, fontSize: 14 }}>{l.price_hearts?.toLocaleString()} ❤️</span>
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{l.title}</h3>
                  {l.venues && <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{l.venues.name} · {l.venues.city}</p>}
                  {l.description && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>{l.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
