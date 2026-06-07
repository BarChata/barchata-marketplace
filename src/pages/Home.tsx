import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Bars & Clubs', 'Restaurants', 'Retail', 'Health & Wellness', 'Events & Entertainment', 'Hotels & Hospitality', 'Professional Services']
const CITIES = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'London']

export default function Home() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [featured, setFeatured] = useState<any[]>([])
  const [stats, setStats] = useState({ venues: 0, listings: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('venues').select('*').eq('is_active', true).limit(6).then(({ data }) => setFeatured(data || []))
    Promise.all([
      supabase.from('venues').select('id', { count: 'exact', head: true }),
      supabase.from('marketplace_listings').select('id', { count: 'exact', head: true }),
    ]).then(([v, l]) => setStats({ venues: v.count || 0, listings: l.count || 0 }))
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (city) params.set('city', city)
    navigate(`/browse?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero — dark navy only here */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #132233 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(245,166,35,0.1) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: 4, background: '#F5A623' }} />
            <span style={{ color: '#F5A623', fontSize: 13, fontWeight: 600 }}>Canada's Business Marketplace</span>
          </div>
          <h1 style={{ fontSize: 58, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Find & List<br /><span style={{ color: '#F5A623' }}>Business Opportunities</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, marginBottom: 48, lineHeight: 1.6, maxWidth: 600, margin: '0 auto 48px' }}>
            Venues, businesses, experiences, and listings across every category — all in one place.
          </p>

          {/* Search */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 8, display: 'flex', gap: 8, maxWidth: 680, margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search businesses, venues, experiences..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#1a1a2e', fontSize: 15, padding: '12px 16px' }} />
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ background: '#F3F4F6', border: 'none', borderRadius: 10, color: '#374151', fontSize: 14, padding: '8px 16px', outline: 'none', cursor: 'pointer' }}>
              <option value="">All Cities</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={handleSearch}
              style={{ background: '#F5A623', border: 'none', borderRadius: 10, padding: '12px 28px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats — white bg */}
      <section style={{ background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { label: 'Active Businesses', value: stats.venues || '90+' },
            { label: 'Cities Across Canada', value: '7' },
            { label: 'Active Listings', value: stats.listings || '0' },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 24px', borderRight: i < 2 ? '1px solid #F3F4F6' : 'none' }}>
              <p style={{ fontSize: 40, fontWeight: 900, color: '#F5A623', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories — light gray bg */}
      <section style={{ background: '#F8F9FA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a2e', marginBottom: 12 }}>Browse by Category</h2>
            <p style={{ color: '#6B7280', fontSize: 16 }}>Find businesses and venues across every industry.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => navigate(`/browse?category=${cat}`)}
                style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '24px 20px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#F5A623'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(245,166,35,0.1
cat > /Users/jerichodigos/Documents/GitHub/barchata-marketplace/src/pages/Home.tsx << 'ENDOFFILE'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Bars & Clubs', 'Restaurants', 'Retail', 'Health & Wellness', 'Events & Entertainment', 'Hotels & Hospitality', 'Professional Services']
const CITIES = ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'London']

export default function Home() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [featured, setFeatured] = useState<any[]>([])
  const [stats, setStats] = useState({ venues: 0, listings: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('venues').select('*').eq('is_active', true).limit(6).then(({ data }) => setFeatured(data || []))
    Promise.all([
      supabase.from('venues').select('id', { count: 'exact', head: true }),
      supabase.from('marketplace_listings').select('id', { count: 'exact', head: true }),
    ]).then(([v, l]) => setStats({ venues: v.count || 0, listings: l.count || 0 }))
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (search) params.set('q', search)
    if (city) params.set('city', city)
    navigate(`/browse?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero — dark navy only here */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #132233 100%)', padding: '80px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(245,166,35,0.1) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 28 }}>
            <div style={{ width: 7, height: 7, borderRadius: 4, background: '#F5A623' }} />
            <span style={{ color: '#F5A623', fontSize: 13, fontWeight: 600 }}>Canada's Business Marketplace</span>
          </div>
          <h1 style={{ fontSize: 58, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Find & List<br /><span style={{ color: '#F5A623' }}>Business Opportunities</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, marginBottom: 48, lineHeight: 1.6, maxWidth: 600, margin: '0 auto 48px' }}>
            Venues, businesses, experiences, and listings across every category — all in one place.
          </p>

          {/* Search */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 8, display: 'flex', gap: 8, maxWidth: 680, margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search businesses, venues, experiences..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#1a1a2e', fontSize: 15, padding: '12px 16px' }} />
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ background: '#F3F4F6', border: 'none', borderRadius: 10, color: '#374151', fontSize: 14, padding: '8px 16px', outline: 'none', cursor: 'pointer' }}>
              <option value="">All Cities</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={handleSearch}
              style={{ background: '#F5A623', border: 'none', borderRadius: 10, padding: '12px 28px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats — white bg */}
      <section style={{ background: '#fff', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { label: 'Active Businesses', value: stats.venues || '90+' },
            { label: 'Cities Across Canada', value: '7' },
            { label: 'Active Listings', value: stats.listings || '0' },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 24px', borderRight: i < 2 ? '1px solid #F3F4F6' : 'none' }}>
              <p style={{ fontSize: 40, fontWeight: 900, color: '#F5A623', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 14, color: '#6B7280', fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories — light gray bg */}
      <section style={{ background: '#F8F9FA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a2e', marginBottom: 12 }}>Browse by Category</h2>
            <p style={{ color: '#6B7280', fontSize: 16 }}>Find businesses and venues across every industry.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => navigate(`/browse?category=${cat}`)}
                style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '24px 20px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#F5A623'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(245,166,35,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}>
                <p style={{ color: '#1a1a2e', fontSize: 14, fontWeight: 600 }}>{cat}</p>
                <p style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>Browse listings →</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities — white bg */}
      <section style={{ background: '#fff', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1a1a2e' }}>Popular Cities</h2>
            <a href="/browse" style={{ color: '#F5A623', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>See all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {CITIES.slice(0, 4).map(c => (
              <button key={c} onClick={() => navigate(`/browse?city=${c}`)}
                style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: 16, padding: '32px 24px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FFF8EC'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#F5A623' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F8F9FA'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#E5E7EB' }}>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{c}</p>
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>Browse listings →</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured — light gray bg */}
      <section style={{ background: '#F8F9FA', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1a1a2e' }}>Featured Businesses</h2>
            <a href="/browse" style={{ color: '#F5A623', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>View all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {featured.map(v => (
              <div key={v.id} onClick={() => navigate(`/listing/${v.id}`)}
                style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}>
                <div style={{ height: 180, background: '#F3F4F6', overflow: 'hidden' }}>
                  {v.cover_image
                    ? <img src={v.cover_image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#F5A623', fontSize: 48, fontWeight: 900 }}>{v.name?.[0]}</span>
                      </div>
                  }
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ background: '#FFF3E0', color: '#F5A623', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>
                      {v.network_type === 'barnone' ? 'BarNone' : 'BarNet'}
                    </span>
                    {v.rating && <span style={{ color: '#9CA3AF', fontSize: 12 }}>★ {v.rating}</span>}
                  </div>
                  <h3 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{v.name}</h3>
                  <p style={{ color: '#6B7280', fontSize: 13 }}>{[v.category, v.city].filter(Boolean).join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: '#0D1B2A', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Ready to list your business?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, marginBottom: 40 }}>Join BarNet or BarNone and reach thousands of customers across Canada.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/login?signup=true" style={{ background: '#F5A623', borderRadius: 12, padding: '16px 36px', color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>
              List Your Business
            </a>
            <a href="https://biz.barchata.com" target="_blank" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '16px 36px', color: '#fff', fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              Go to Biz Dashboard →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
