import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './AboutPage.css'
import { useLanguage } from '../contexts/LanguageContext'

interface AboutPageProps {
  section?: string
}

function AboutPage({ section }: AboutPageProps) {
  const { t } = useLanguage()
  const params = useParams()
  const currentSection = section || params.section || 'main'

  if (currentSection === 'history') {
    return (
      <div className="about-page">
        <div className="page-header">
          <div className="container">
            <Link to="/about" className="back-link">{t('about.back')}</Link>
            <h1>{t('about.sections.history.title')}</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <p>{t('about.sections.history.text1')}</p>
            <p>{t('about.sections.history.text2')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === 'team') {
    return (
      <div className="about-page">
        <div className="page-header">
          <div className="container">
            <Link to="/about" className="back-link">{t('about.back')}</Link>
            <h1>{t('about.sections.team.title')}</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <p>{t('about.sections.team.text')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === 'certificates') {
    return (
      <div className="about-page">
        <div className="page-header">
          <div className="container">
            <Link to="/about" className="back-link">{t('about.back')}</Link>
            <h1>{t('about.sections.certificates.title')}</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <p>{t('about.sections.certificates.text')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === 'partners') {
    return (
      <div className="about-page">
        <div className="page-header">
          <div className="container">
            <Link to="/about" className="back-link">{t('about.back')}</Link>
            <h1>{t('about.sections.partners.title')}</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <div className="partners-grid">
              <div className="partner-item">Firetherm</div>
              <div className="partner-item">Normaali</div>
              <div className="partner-item">Promat</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fogg Behavior Model: State для улучшения UX
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="about-page">
      {/* Fogg Behavior Model: Hero блок с улучшениями */}
      <div className={`page-header about-hero ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          {/* Fogg: MOTIVATION - Trust Badge для повышения мотивации */}
          <div className="about-trust-badge">
            <span className="trust-icon">✓</span>
            <span>{t('about.trustBadge')}</span>
          </div>

          {/* Fogg: MOTIVATION - Заголовок с эмоциональной привлекательностью */}
          <h1 className="about-hero-title">{t('about.title')}</h1>
          <p className="about-hero-subtitle">{t('about.subtitle')}</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="about-social-proof">
            <div className="proof-item">
              <span className="proof-icon">🏆</span>
              <span className="proof-number">100+</span>
              <span className="proof-label">{t('about.socialProof.projects')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">📐</span>
              <span className="proof-number">230,000</span>
              <span className="proof-label">{t('about.socialProof.area')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">⭐</span>
              <span className="proof-number">20</span>
              <span className="proof-label">{t('about.socialProof.years')}</span>
            </div>
          </div>

          {/* Fogg: ABILITY - Быстрые ссылки для упрощения взаимодействия */}
          <div className="about-quick-links">
            <Link to="/about/history" className="quick-link">
              <span className="quick-link-icon">📜</span>
              <span className="quick-link-text">{t('about.quickLinks.history')}</span>
            </Link>
            <Link to="/about/team" className="quick-link">
              <span className="quick-link-icon">👥</span>
              <span className="quick-link-text">{t('about.quickLinks.team')}</span>
            </Link>
            <Link to="/about/certificates" className="quick-link">
              <span className="quick-link-icon">📜</span>
              <span className="quick-link-text">{t('about.quickLinks.certificates')}</span>
            </Link>
            <Link to="/about/partners" className="quick-link">
              <span className="quick-link-icon">🤝</span>
              <span className="quick-link-text">{t('about.quickLinks.partners')}</span>
            </Link>
          </div>

          {/* Fogg: PROMPTS - CTA кнопка с визуальными подсказками */}
          <div className="about-hero-cta">
            <Link to="/contact" className="btn btn-primary about-cta-btn">
              <span className="btn-icon">📞</span>
              <span>{t('about.cta.contact')}</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/services" className="btn btn-secondary about-cta-btn">
              <span className="btn-icon">⚙️</span>
              <span>{t('about.cta.services')}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Fogg Behavior Model: Контент с улучшениями */}
      <div className="about-content">
        <div className="container">
          {/* Fogg: MOTIVATION - Секция миссии с визуальными элементами */}
          <section className="about-section about-mission">
            <div className="section-header">
              <div className="section-icon">🎯</div>
              <h2>{t('about.mission.title')}</h2>
            </div>
            <p className="mission-text">{t('about.mission.text')}</p>
            {/* Fogg: PROMPTS - Визуальная подсказка о важности */}
            <div className="mission-highlight">
              <span className="highlight-icon">🛡️</span>
              <span className="highlight-text">{t('about.mission.highlight')}</span>
            </div>
          </section>

          {/* Fogg: MOTIVATION - Секция ценностей с улучшенной визуализацией */}
          <section className="about-section about-values">
            <div className="section-header">
              <div className="section-icon">💎</div>
              <h2>{t('about.values.title')}</h2>
            </div>
            {/* Fogg: ABILITY - Упрощенное представление ценностей */}
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🔒</div>
                <div className="value-content">
                  <strong>{t('about.values.safety.title')}</strong>
                  <span className="value-desc">{t('about.values.safety.desc')}</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">⭐</div>
                <div className="value-content">
                  <strong>{t('about.values.quality.title')}</strong>
                  <span className="value-desc">{t('about.values.quality.desc')}</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">⏱️</div>
                <div className="value-content">
                  <strong>{t('about.values.reliability.title')}</strong>
                  <span className="value-desc">{t('about.values.reliability.desc')}</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">🚀</div>
                <div className="value-content">
                  <strong>{t('about.values.innovation.title')}</strong>
                  <span className="value-desc">{t('about.values.innovation.desc')}</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">✅</div>
                <div className="value-content">
                  <strong>{t('about.values.responsibility.title')}</strong>
                  <span className="value-desc">{t('about.values.responsibility.desc')}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Fogg: MOTIVATION - Секция преимуществ с социальными доказательствами */}
          <section className="about-section about-advantages">
            <div className="section-header">
              <div className="section-icon">🏆</div>
              <h2>{t('about.advantages.title')}</h2>
            </div>
            {/* Fogg: ABILITY - Упрощенное представление преимуществ */}
            <div className="advantages-list">
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>{t('about.advantages.experience')}</strong>
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>{t('about.advantages.complex')}</strong>
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>{t('about.advantages.materials')}</strong>
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>{t('about.advantages.specialists')}</strong>
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>{t('about.advantages.guarantee')}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* Fogg: ABILITY & PROMPTS - Навигационные карточки с улучшенной интерактивностью */}
          <div className="about-links">
            <Link to="/about/history" className="about-link-card">
              <div className="link-card-icon">📜</div>
              <div className="link-card-content">
                <h3>{t('about.links.history.title')}</h3>
                <p>{t('about.links.history.desc')}</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
            <Link to="/about/team" className="about-link-card">
              <div className="link-card-icon">👥</div>
              <div className="link-card-content">
                <h3>{t('about.links.team.title')}</h3>
                <p>{t('about.links.team.desc')}</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
            <Link to="/about/certificates" className="about-link-card">
              <div className="link-card-icon">📜</div>
              <div className="link-card-content">
                <h3>{t('about.links.certificates.title')}</h3>
                <p>{t('about.links.certificates.desc')}</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
            <Link to="/about/partners" className="about-link-card">
              <div className="link-card-icon">🤝</div>
              <div className="link-card-content">
                <h3>{t('about.links.partners.title')}</h3>
                <p>{t('about.links.partners.desc')}</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

