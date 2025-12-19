import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ServicesPage.css'
import { useLanguage } from '../contexts/LanguageContext'

function ServicesPage() {
  const { t } = useLanguage()
  // Fogg Behavior Model: State для улучшения UX
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const services = [
    {
      id: 'concrete',
      title: t('services.items.concrete.title'),
      description: t('services.items.concrete.description'),
      features: [
        t('services.items.concrete.features.0'),
        t('services.items.concrete.features.1'),
        t('services.items.concrete.features.2')
      ],
      icon: '🏗️',
      badge: t('services.items.concrete.badge'),
      trust: t('services.items.concrete.trust')
    },
    {
      id: 'timber',
      title: t('services.items.timber.title'),
      description: t('services.items.timber.description'),
      features: [
        t('services.items.timber.features.0'),
        t('services.items.timber.features.1'),
        t('services.items.timber.features.2')
      ],
      icon: '🪵',
      badge: t('services.items.timber.badge'),
      trust: t('services.items.timber.trust')
    },
    {
      id: 'industrial',
      title: t('services.items.industrial.title'),
      description: t('services.items.industrial.description'),
      features: [
        t('services.items.industrial.features.0'),
        t('services.items.industrial.features.1'),
        t('services.items.industrial.features.2')
      ],
      icon: '🏭',
      badge: t('services.items.industrial.badge'),
      trust: t('services.items.industrial.trust')
    },
    {
      id: 'inspection',
      title: t('services.items.inspection.title'),
      description: t('services.items.inspection.description'),
      features: [
        t('services.items.inspection.features.0'),
        t('services.items.inspection.features.1'),
        t('services.items.inspection.features.2')
      ],
      icon: '🔍',
      badge: t('services.items.inspection.badge'),
      trust: t('services.items.inspection.trust')
    },
    {
      id: 'consultation',
      title: t('services.items.consultation.title'),
      description: t('services.items.consultation.description'),
      features: [
        t('services.items.consultation.features.0'),
        t('services.items.consultation.features.1'),
        t('services.items.consultation.features.2')
      ],
      icon: '💬',
      badge: t('services.items.consultation.badge'),
      trust: t('services.items.consultation.trust')
    }
  ]

  return (
    <div className="services-page">
      {/* Fogg Behavior Model: Hero блок с улучшениями */}
      <div className={`page-header services-hero ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          {/* Fogg: MOTIVATION - Trust Badge для повышения мотивации */}
          <div className="services-trust-badge">
            <span className="trust-icon">✓</span>
            <span>{t('services.trustBadge')}</span>
          </div>

          {/* Fogg: MOTIVATION - Заголовок с эмоциональной привлекательностью */}
          <h1 className="services-hero-title">{t('services.title')}</h1>
          <p className="services-hero-subtitle">{t('services.subtitle')}</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="services-social-proof">
            <div className="proof-item">
              <span className="proof-icon">🔧</span>
              <span className="proof-number">5</span>
              <span className="proof-label">{t('services.socialProof.types')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">📋</span>
              <span className="proof-number">100+</span>
              <span className="proof-label">{t('services.socialProof.projects')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">⭐</span>
              <span className="proof-number">20</span>
              <span className="proof-label">{t('services.socialProof.years')}</span>
            </div>
          </div>

          {/* Fogg: ABILITY - Быстрые ссылки на услуги */}
          <div className="services-quick-nav">
            <a href="#concrete" className="quick-nav-item">
              <span className="nav-icon">🏗️</span>
              <span className="nav-text">{t('services.quickNav.concrete')}</span>
            </a>
            <a href="#timber" className="quick-nav-item">
              <span className="nav-icon">🪵</span>
              <span className="nav-text">{t('services.quickNav.timber')}</span>
            </a>
            <a href="#industrial" className="quick-nav-item">
              <span className="nav-icon">🏭</span>
              <span className="nav-text">{t('services.quickNav.industrial')}</span>
            </a>
            <a href="#inspection" className="quick-nav-item">
              <span className="nav-icon">🔍</span>
              <span className="nav-text">{t('services.quickNav.inspection')}</span>
            </a>
            <a href="#consultation" className="quick-nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-text">{t('services.quickNav.consultation')}</span>
            </a>
          </div>

          {/* Fogg: PROMPTS - CTA кнопки с визуальными подсказками */}
          <div className="services-hero-cta">
            <Link to="/contact" className="btn btn-primary services-cta-btn">
              <span className="btn-icon">📞</span>
              <span>{t('services.cta.consultation')}</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-secondary services-cta-btn">
              <span className="btn-icon">ℹ️</span>
              <span>{t('services.cta.about')}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="services-list">
        <div className="container">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id} 
              className="service-item"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Fogg: MOTIVATION - Trust Badge */}
              {service.badge && (
                <div className="service-badge">
                  <span className="badge-icon">⭐</span>
                  <span>{service.badge}</span>
                </div>
              )}

              <div className="service-content">
                {/* Fogg: MOTIVATION - Иконка и заголовок */}
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-title-wrapper">
                    <h2 className="service-title">{service.title}</h2>
                    {service.trust && (
                      <div className="service-trust">
                        <span className="trust-check">✓</span>
                        <span>{service.trust}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fogg: MOTIVATION - Описание */}
                <p className="service-description">{service.description}</p>

                {/* Fogg: ABILITY - Улучшенный список преимуществ */}
                <div className="service-features-wrapper">
                  <h3 className="features-title">{t('services.featuresTitle')}</h3>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="service-feature-item">
                        <span className="feature-check">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fogg: PROMPTS - CTA кнопка с визуальными подсказками */}
                <div className="service-actions">
                  <Link 
                    to={`/services/${service.id}`} 
                    className="btn btn-primary service-btn"
                  >
                    <span className="btn-icon">📖</span>
                    <span>{t('services.more')}</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                  <Link 
                    to="/contact" 
                    className="btn btn-secondary service-btn"
                  >
                    <span className="btn-icon">📞</span>
                    <span>{t('services.consultationBtn')}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fogg Behavior Model: CTA секция с улучшениями */}
      <section className="cta-section">
        <div className="container">
          {/* Fogg: MOTIVATION - Trust Badge */}
          <div className="cta-trust-badge">
            <span className="cta-badge-icon">✓</span>
            <span>{t('services.ctaSection.trustBadge')}</span>
          </div>

          {/* Fogg: MOTIVATION - Заголовок с эмоциональной привлекательностью */}
          <h2 className="cta-title">{t('services.ctaSection.title')}</h2>
          <p className="cta-subtitle">{t('services.ctaSection.subtitle')}</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="cta-social-proof">
            <div className="cta-proof-item">
              <span className="cta-proof-icon">⚡</span>
              <span className="cta-proof-text">{t('services.ctaSection.proof.fast')}</span>
            </div>
            <div className="cta-proof-item">
              <span className="cta-proof-icon">💰</span>
              <span className="cta-proof-text">{t('services.ctaSection.proof.free')}</span>
            </div>
            <div className="cta-proof-item">
              <span className="cta-proof-icon">👥</span>
              <span className="cta-proof-text">{t('services.ctaSection.proof.experts')}</span>
            </div>
          </div>

          {/* Fogg: ABILITY - Упрощенные варианты связи */}
          <div className="cta-options">
            <Link to="/contact" className="cta-option-card">
              <div className="option-icon">📞</div>
              <div className="option-content">
                <h3>{t('services.ctaSection.options.phone.title')}</h3>
                <p>{t('services.ctaSection.options.phone.desc')}</p>
              </div>
              <div className="option-arrow">→</div>
            </Link>
            <Link to="/contact" className="cta-option-card">
              <div className="option-icon">✉️</div>
              <div className="option-content">
                <h3>{t('services.ctaSection.options.email.title')}</h3>
                <p>{t('services.ctaSection.options.email.desc')}</p>
              </div>
              <div className="option-arrow">→</div>
            </Link>
            <Link to="/contact" className="cta-option-card">
              <div className="option-icon">💬</div>
              <div className="option-content">
                <h3>{t('services.ctaSection.options.form.title')}</h3>
                <p>{t('services.ctaSection.options.form.desc')}</p>
              </div>
              <div className="option-arrow">→</div>
            </Link>
          </div>

          {/* Fogg: PROMPTS - Основная CTA кнопка с визуальными подсказками */}
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary cta-main-btn">
              <span className="btn-icon">📞</span>
              <span>{t('services.ctaSection.mainBtn')}</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-secondary cta-secondary-btn">
              <span className="btn-icon">ℹ️</span>
              <span>{t('services.ctaSection.secondaryBtn')}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage

