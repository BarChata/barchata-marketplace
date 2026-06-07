import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B2A', marginTop: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, position: 'relative' }}>
                <svg viewBox="0 0 100 100" width="32" height="32">
                  <path d="M10,10 Q10,5 15,5 L85,5 Q90,5 90,10 L90,70 Q90,75 85,75 L55,75 L40,92 L40,75 L15,75 Q10,75 10,70 Z" fill="#F5A623"/>
                  <text x="50" y="58" textAnchor="middle" fontSize="48" fontWeight="900" fill="#0D1B2A" fontFamily="sans-serif">B</text>
                </svg>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>BarChata</div>
                <div style={{ color: '#F5A623', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Marketplace</div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6 }}>Canada's Business Marketplace — connecting buyers, sellers, and opportunity.</p>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Marketplace</p>
            {['Browse Listings', 'BarNet Venues', 'BarNone Businesses', 'Experiences'].map(item => (
              <Link key={item} to="/browse" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>{item}</Link>
            ))}
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>For Businesses</p>
            {['List Your Business', 'Dashboard', 'BarChata Biz', 'Pricing'].map(item => (
              <Link key={item} to="/login" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>{item}</Link>
            ))}
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>BarChata</p>
            {['BarChata Social', 'BarAds Media', 'Partners', 'Support'].map(item => (
              <a key={item} href="https://barchata.com" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>{item}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>© 2026 BarChata Corp. All rights reserved.</p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>Powered by <span style={{ color: '#F5A623' }}>BarAds Media</span></p>
        </div>
      </div>
    </footer>
  )
}
