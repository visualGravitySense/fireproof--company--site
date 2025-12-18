import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './AboutPage.css'

interface AboutPageProps {
  section?: string
}

function AboutPage({ section }: AboutPageProps) {
  const params = useParams()
  const currentSection = section || params.section || 'main'

  if (currentSection === 'history') {
    return (
      <div className="about-page">
        <div className="page-header">
          <div className="container">
            <Link to="/about" className="back-link">← Назад</Link>
            <h1>Наша история</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <p>Fire Proof Company была основана более 20 лет назад с миссией обеспечить безопасность зданий и защиту жизней.</p>
            <p>За годы работы мы реализовали более 100 проектов и обработали более 230,000 м² площади.</p>
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
            <Link to="/about" className="back-link">← Назад</Link>
            <h1>Наша команда</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <p>Наша команда состоит из опытных специалистов с многолетним опытом в области противопожарной защиты.</p>
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
            <Link to="/about" className="back-link">← Назад</Link>
            <h1>Сертификаты и лицензии</h1>
          </div>
        </div>
        <div className="about-content">
          <div className="container">
            <p>Мы работаем только с сертифицированными материалами и имеем все необходимые лицензии.</p>
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
            <Link to="/about" className="back-link">← Назад</Link>
            <h1>Партнеры</h1>
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
            <span>Сертифицированные материалы • 20 лет опыта • 100+ проектов</span>
          </div>

          {/* Fogg: MOTIVATION - Заголовок с эмоциональной привлекательностью */}
          <h1 className="about-hero-title">О компании</h1>
          <p className="about-hero-subtitle">20 лет опыта в противопожарной защите</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="about-social-proof">
            <div className="proof-item">
              <span className="proof-icon">🏆</span>
              <span className="proof-number">100+</span>
              <span className="proof-label">Успешных проектов</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">📐</span>
              <span className="proof-number">230,000</span>
              <span className="proof-label">м² защищено</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">⭐</span>
              <span className="proof-number">20</span>
              <span className="proof-label">лет опыта</span>
            </div>
          </div>

          {/* Fogg: ABILITY - Быстрые ссылки для упрощения взаимодействия */}
          <div className="about-quick-links">
            <Link to="/about/history" className="quick-link">
              <span className="quick-link-icon">📜</span>
              <span className="quick-link-text">История</span>
            </Link>
            <Link to="/about/team" className="quick-link">
              <span className="quick-link-icon">👥</span>
              <span className="quick-link-text">Команда</span>
            </Link>
            <Link to="/about/certificates" className="quick-link">
              <span className="quick-link-icon">📜</span>
              <span className="quick-link-text">Сертификаты</span>
            </Link>
            <Link to="/about/partners" className="quick-link">
              <span className="quick-link-icon">🤝</span>
              <span className="quick-link-text">Партнеры</span>
            </Link>
          </div>

          {/* Fogg: PROMPTS - CTA кнопка с визуальными подсказками */}
          <div className="about-hero-cta">
            <Link to="/contact" className="btn btn-primary about-cta-btn">
              <span className="btn-icon">📞</span>
              <span>Связаться с нами</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/services" className="btn btn-secondary about-cta-btn">
              <span className="btn-icon">⚙️</span>
              <span>Наши услуги</span>
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
              <h2>Наша миссия</h2>
            </div>
            <p className="mission-text">Защищаем то, что важно: жизни, имущество, бизнес</p>
            {/* Fogg: PROMPTS - Визуальная подсказка о важности */}
            <div className="mission-highlight">
              <span className="highlight-icon">🛡️</span>
              <span className="highlight-text">Безопасность превыше всего</span>
            </div>
          </section>

          {/* Fogg: MOTIVATION - Секция ценностей с улучшенной визуализацией */}
          <section className="about-section about-values">
            <div className="section-header">
              <div className="section-icon">💎</div>
              <h2>Наши ценности</h2>
            </div>
            {/* Fogg: ABILITY - Упрощенное представление ценностей */}
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🔒</div>
                <div className="value-content">
                  <strong>Безопасность</strong>
                  <span className="value-desc">превыше всего</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">⭐</div>
                <div className="value-content">
                  <strong>Качество</strong>
                  <span className="value-desc">европейские стандарты</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">⏱️</div>
                <div className="value-content">
                  <strong>Надежность</strong>
                  <span className="value-desc">20 лет на рынке</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">🚀</div>
                <div className="value-content">
                  <strong>Инновации</strong>
                  <span className="value-desc">современные технологии</span>
                </div>
              </div>
              <div className="value-item">
                <div className="value-icon">✅</div>
                <div className="value-content">
                  <strong>Ответственность</strong>
                  <span className="value-desc">за каждый проект</span>
                </div>
              </div>
            </div>
          </section>

          {/* Fogg: MOTIVATION - Секция преимуществ с социальными доказательствами */}
          <section className="about-section about-advantages">
            <div className="section-header">
              <div className="section-icon">🏆</div>
              <h2>Наши преимущества</h2>
            </div>
            {/* Fogg: ABILITY - Упрощенное представление преимуществ */}
            <div className="advantages-list">
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>20 лет опыта</strong> в противопожарной защите
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>Комплексные решения</strong> от проектирования до надзора
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>Сертифицированные материалы</strong> премиум-класса
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>Опытные специалисты</strong> в собственной команде
                </div>
              </div>
              <div className="advantage-item">
                <div className="advantage-check">✓</div>
                <div className="advantage-text">
                  <strong>Гарантия качества</strong> и долговечности покрытий
                </div>
              </div>
            </div>
          </section>

          {/* Fogg: ABILITY & PROMPTS - Навигационные карточки с улучшенной интерактивностью */}
          <div className="about-links">
            <Link to="/about/history" className="about-link-card">
              <div className="link-card-icon">📜</div>
              <div className="link-card-content">
                <h3>Наша история</h3>
                <p>Узнайте больше о нашей компании</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
            <Link to="/about/team" className="about-link-card">
              <div className="link-card-icon">👥</div>
              <div className="link-card-content">
                <h3>Команда</h3>
                <p>Наши эксперты</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
            <Link to="/about/certificates" className="about-link-card">
              <div className="link-card-icon">📜</div>
              <div className="link-card-content">
                <h3>Сертификаты</h3>
                <p>Лицензии и сертификаты</p>
              </div>
              <div className="link-card-arrow">→</div>
            </Link>
            <Link to="/about/partners" className="about-link-card">
              <div className="link-card-icon">🤝</div>
              <div className="link-card-content">
                <h3>Партнеры</h3>
                <p>Наши партнеры и производители</p>
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

