import { useLocation, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SEO_LANDING_PAGES } from '../data/seoLandingPages'
import './SeoLandingPage.css'

function SeoLandingPage() {
  const location = useLocation()
  const slug = location.pathname.replace(/^\//, '')
  const [isVisible, setIsVisible] = useState(false)
  const data = slug ? SEO_LANDING_PAGES[slug] : null

  useEffect(() => {
    setIsVisible(true)
  }, [slug])

  if (!data) {
    return (
      <div className="seo-landing-page">
        <div className="container">
          <p>Leht ei leitud.</p>
          <Link to="/">Avalehele</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="seo-landing-page">
      <div className={`seo-hero ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          <Link to="/" className="back-link">
            <span className="back-icon">←</span>
            <span>Avalehele</span>
          </Link>
          <div className="seo-trust-badge">
            <span className="trust-icon">✓</span>
            <span>Tasuta audiit 48 tunni jooksul • 20 aastat kogemust</span>
          </div>
          <h1 className="seo-title">{data.title}</h1>
          <p className="seo-intro">{data.intro}</p>
          <Link to="/contact" className="seo-cta-btn">
            <span>🔥</span>
            <span>{data.ctaText || 'Taotle tasuta audiiti'}</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>

      <div className="seo-content">
        <div className="container">
          {data.sections.map((section, idx) => (
            <section
              key={idx}
              className={`seo-section ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h2>{section.title}</h2>
              {section.content?.length > 0 && (
                <div className="seo-paragraphs">
                  {section.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {section.list && section.list.length > 0 && (
                <ul className="seo-list">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className={`seo-cta-section ${isVisible ? 'visible' : ''}`}>
            <Link to="/contact" className="seo-cta-btn secondary">
              <span>📞</span>
              <span>{data.ctaText || 'Taotle tasuta audiiti'}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeoLandingPage
