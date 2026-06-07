import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#060E1A', borderTop: '1px solid rgba(245,166,35,0.1)', marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: '#F5A623', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#0A1628', fontWeight: 900, fontSize: 16 }}>B</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>BarChata</div>
                <div style={{ color: '#F5A623', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Marketplace</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6 }}>Canada's nightlife and hospitality business marketplace.</p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Marketplace</p>
            {['Browse Listings', 'Venues', 'Experiences', 'Events'].map(item => (
              <Link key={item} to="/browse" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>{item}</Link>
            ))}
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>For Venues</p>
            {['List Your Venue', 'Dashboard', 'BarChata Biz', 'Pricing'].map(item => (
              <Link key={item} to="/login" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>{item}</Link>
            ))}
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>BarChata</p>
            {['BarChata Social', 'BarAds Media', 'Partners', 'Support'].map(item => (
              <a key={item} href="https://barchata.com" style={{ display: 'block', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>{item}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>© 2026 BarChata Corp. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>Powered by <span style={{ color: '#F5A623' }}>BarAds Media</span></p>
        </div>
      </div>
    </footer>
  )
}
