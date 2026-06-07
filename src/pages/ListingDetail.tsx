import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ListingDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isListing = searchParams.get('type') === 'listing'
  const [data, setData] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [enquired, setEnquired] = useState(false)

  useEffect(() => {
    if (!id) return
    if (isListing) {
      supabase.from('marketplace_listings').select('*, venues(*)').eq('id', id).single()
        .then(({ data: d }) => { setData(d); setLoading(false) })
    } else {
      supabase.from('venues').select('*').eq('id', id).single()
        .then(({ data: d }) => {
          setData(d)
          supabase.from('marketplace_listings').select('*').eq('venue_id', id).eq('is_active', true)
            .then(({ data: l }) => setListings(l || []))
          setLoading(false)
        })
    }
  }, [id])

  if (loading) return <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
  if (!data) return <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.3)' }}>Not found</div>

  const venue = isListing ? data.venues : data

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 14, cursor: 'pointer', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
        ← Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
        {/* Left */}
        <div>
          {/* Cover Image */}
          <div style={{ height: 320, background: '#132233', borderRadius: 20, overflow: 'hidden', marginBottom: 32 }}>
            {(isListing ? data.image_url : venue?.cover_image)
              ? <img src={isListing ? data.image_url : venue?.cover_image} alt={data.title || data.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#F5A623', fontSize: 64, fontWeight: 900 }}>{(data.title || data.name)?.[0]}</span>
                </div>
            }
          </div>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              {isListing && <span style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase' }}>{data.type}</span>}
              {venue?.network_type && <span style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8, textTransform: 'uppercase' }}>{venue.network_type === 'barnone' ? 'BarNone' : 'BarNet'}</span>}
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: '#fff', marginBottom: 8 }}>{isListing ? data.title : data.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
              {[venue?.category, venue?.city].filter(Boolean).join(' · ')}
              {venue?.rating && <span style={{ marginLeft: 12 }}>★ {venue.rating}</span>}
            </p>
          </div>

          {/* Description */}
          {(data.description || venue?.description) && (
            <div style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 12, fontSize: 16 }}>About</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 14 }}>{data.description || venue?.description}</p>
            </div>
          )}

          {/* Details */}
          <div style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                isListing && data.capacity && { label: 'Capacity', value: `${data.capacity} guests` },
                isListing && data.event_date && { label: 'Date', value: new Date(data.event_date).toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                isListing && data.hearts_reward && { label: 'Hearts Reward', value: `+${data.hearts_reward} Hearts on purchase` },
                venue?.address && { label: 'Address', value: [venue.address, venue.city].filter(Boolean).join(', ') },
                venue?.phone && { label: 'Phone', value: venue.phone },
                venue?.website && { label: 'Website', value: venue.website },
              ].filter(Boolean).map((item: any) => (
                <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 16px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Listings (if venue view) */}
          {!isListing && listings.length > 0 && (
            <div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Available Listings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {listings.map(l => (
                  <div key={l.id} onClick={() => navigate(`/listing/${l.id}?type=listing`)}
                    style={{ background: '#132233', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 16, cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#F5A623'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: '#F5A623', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{l.type}</span>
                      <span style={{ color: '#F5A623', fontWeight: 800, fontSize: 13 }}>{l.price_hearts?.toLocaleString()} ❤️</span>
                    </div>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{l.title}</p>
                    {l.description && <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 4 }}>{l.description.slice(0, 60)}...</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Enquire */}
        <div>
          <div style={{ background: '#132233', border: '1px solid rgba(245,166,35,0.2)', borderRadius: 20, padding: 28, position: 'sticky', top: 88 }}>
            {isListing && (
              <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 8 }}>Price</p>
                <p style={{ color: '#F5A623', fontSize: 40, fontWeight: 900 }}>{data.price_hearts?.toLocaleString()}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Hearts</p>
                {data.hearts_reward > 0 && <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 8 }}>+ {data.hearts_reward} Hearts reward</p>}
              </div>
            )}

            {enquired ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Enquiry Sent!</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>The venue owner will be in touch shortly.</p>
              </div>
            ) : (
              <div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Enquire About This {isListing ? 'Listing' : 'Venue'}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Your Name', 'Email Address', 'Phone (optional)'].map(placeholder => (
                    <input key={placeholder} placeholder={placeholder}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none' }} />
                  ))}
                  <textarea placeholder="Your message..." rows={4}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none', resize: 'none' }} />
                  <button onClick={() => setEnquired(true)}
                    style={{ background: '#F5A623', border: 'none', borderRadius: 12, padding: '14px', color: '#0A1628', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
                    Send Enquiry
                  </button>
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <a href={`https://biz.barchata.com/venue/portal`} target="_blank"
                    style={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>
                    Are you the venue owner? <span style={{ color: '#F5A623' }}>Manage on Biz →</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
