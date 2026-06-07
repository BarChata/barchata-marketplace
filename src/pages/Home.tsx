import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['All', 'Bar', 'Nightclub', 'Restaurant', 'Lounge', 'Event Space', 'Brewery']
const CITIES = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'London']

export default function Home() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [featured, setFeatured] = useState<any[]>([])
  const [stats, setStats] = useState({ venues: 0, cities: 0, listings: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('venues').select('*').eq('is_active', true).limit(6).then(({ data }) => setFeatured(data || []))
    Promise.all([
      supabase.from('venues').select('id', { count: 'exact', head: true }),
      supabase.from('marketplace_listings').select('id', { count: 'exact', head: true }),
    ]).then(([v, l]) => setStats({ venues: v.count || 0, cities: 7, listings: l.count || 0 }))
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (city) params.set('city', city)
    navigate(`/browse?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D1B2A 50%, #0A1628 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(245,166,35,0.08) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#F5A623' }} />
            <span style={{ color: '#F5A623', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em' }}>Canada's Business Marketplace</span>
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Find & List<br /><span style={{ color: '#F5A623' }}>Business Opportunities</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 18, marginBottom: 48, lineHeight: 1.6 }}>
            Venues, businesses, experiences, and opportunities — all in one place.
          </p>

          {/* Search Bar */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 8, display: 'flex', gap: 8, maxWidth: 700, margin: '0 auto' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search venues, listings, experiences..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 15, padding: '12px 16px' }}
            />
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14, padding: '8px 16px', outline: 'none', cursor: 'pointer' }}>
              <option value="">All Cities</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={handleSearch}
              style={{ background: '#F5A623', border: 'none', borderRadius: 10, padding: '12px 28px', color: '#0A1628', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#0A1628', borderBottom: '1px solid rgba(245,166,35,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
          {[
            { label: 'Active Venues', value: stats.venues || '90+' },
            { label: 'Cities', value: stats.cities || '7' },
            { label: 'Listings', value: stats.listings || '0' },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 24px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <p style={{ fontSize: 36, fontWeight: 900, color: '#F5A623', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>Browse by Category</h2>
          <a href="/browse" style={{ color: '#F5A623', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>See all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => navigate(`/browse?category=${cat}`)}
              style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 12px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#F5A623'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(245,166,35,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.background = '#132233' }}>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>{cat}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Cities */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>Popular Cities</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {CITIES.slice(0, 4).map(c => (
            <button key={c} onClick={() => navigate(`/browse?city=${c}`)}
              style={{ background: 'linear-gradient(135deg, #132233, #0D1B2A)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '32px 24px', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#F5A623'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'}>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{c}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Browse listings →</p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Venues */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>Featured Venues</h2>
          <a href="/browse" style={{ color: '#F5A623', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {featured.map(v => (
            <div key={v.id} onClick={() => navigate(`/listing/${v.id}`)}
              style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#F5A623'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'}>
              <div style={{ height: 180, background: '#0D1B2A', overflow: 'hidden' }}>
                {v.cover_image
                  ? <img src={v.cover_image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#F5A623', fontSize: 40, fontWeight: 900 }}>{v.name?.[0]}</span>
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
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{v.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{[v.category, v.city].filter(Boolean).join(' · ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.12), rgba(245,166,35,0.04))', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 24, maxWidth: 1200, margin: '0 auto 80px', padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40 }}>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Ready to list your venue?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Join BarNet or BarNone and reach thousands of customers across Canada across Canada.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <a href="/login?signup=true" style={{ background: '#F5A623', borderRadius: 12, padding: '14px 28px', color: '#0A1628', fontSize: 15, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            List Your Venue
          </a>
          <a href="https://biz.barchata.com" target="_blank" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 28px', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Go to Biz Dashboard →
          </a>
        </div>
      </section>
    </div>
  )
}
