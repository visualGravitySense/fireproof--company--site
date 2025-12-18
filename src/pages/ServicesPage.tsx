import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ServicesPage.css'

function ServicesPage() {
  // Fogg Behavior Model: State для улучшения UX
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const services = [
    {
      id: 'concrete',
      title: 'Огнезащита железобетонных конструкций',
      description: 'Защита бетонных конструкций с использованием материалов Firetherm и Promat',
      features: ['Стандарты ISO, EN', 'Долговечное покрытие', 'Технические характеристики'],
      icon: '🏗️',
      badge: 'Популярно',
      trust: 'Сертифицировано'
    },
    {
      id: 'timber',
      title: 'Огнезащита деревянных конструкций',
      description: 'Сертифицированные методы обработки различных типов древесины',
      features: ['Экологичные материалы', 'Сертификация', 'Различные типы древесины'],
      icon: '🪵',
      badge: 'Экологично',
      trust: 'Сертифицировано'
    },
    {
      id: 'industrial',
      title: 'Промышленные решения',
      description: 'Комплексные системы для промышленных объектов',
      features: ['Комплексные системы', 'Инспекция и надзор', 'Сопровождение объектов'],
      icon: '🏭',
      badge: 'Комплексно',
      trust: '20 лет опыта'
    },
    {
      id: 'inspection',
      title: 'Инспекция и надзор',
      description: 'Профессиональная инспекция и надзор за проектами',
      features: ['Регулярные проверки', 'Отчетность', 'Соответствие стандартам'],
      icon: '🔍',
      badge: 'Профессионально',
      trust: 'Гарантия качества'
    },
    {
      id: 'consultation',
      title: 'Консультации',
      description: 'Экспертные консультации по противопожарной защите',
      features: ['Бесплатная консультация', 'Проектирование', 'Рекомендации'],
      icon: '💬',
      badge: 'Бесплатно',
      trust: 'Эксперты'
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
            <span>5 видов услуг • Сертифицированные материалы • 20 лет опыта</span>
          </div>

          {/* Fogg: MOTIVATION - Заголовок с эмоциональной привлекательностью */}
          <h1 className="services-hero-title">Наши услуги</h1>
          <p className="services-hero-subtitle">Комплексные решения в области противопожарной защиты</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="services-social-proof">
            <div className="proof-item">
              <span className="proof-icon">🔧</span>
              <span className="proof-number">5</span>
              <span className="proof-label">Видов услуг</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">📋</span>
              <span className="proof-number">100+</span>
              <span className="proof-label">Реализованных проектов</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">⭐</span>
              <span className="proof-number">20</span>
              <span className="proof-label">лет опыта</span>
            </div>
          </div>

          {/* Fogg: ABILITY - Быстрые ссылки на услуги */}
          <div className="services-quick-nav">
            <a href="#concrete" className="quick-nav-item">
              <span className="nav-icon">🏗️</span>
              <span className="nav-text">Железобетон</span>
            </a>
            <a href="#timber" className="quick-nav-item">
              <span className="nav-icon">🪵</span>
              <span className="nav-text">Дерево</span>
            </a>
            <a href="#industrial" className="quick-nav-item">
              <span className="nav-icon">🏭</span>
              <span className="nav-text">Промышленность</span>
            </a>
            <a href="#inspection" className="quick-nav-item">
              <span className="nav-icon">🔍</span>
              <span className="nav-text">Инспекция</span>
            </a>
            <a href="#consultation" className="quick-nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-text">Консультации</span>
            </a>
          </div>

          {/* Fogg: PROMPTS - CTA кнопки с визуальными подсказками */}
          <div className="services-hero-cta">
            <Link to="/contact" className="btn btn-primary services-cta-btn">
              <span className="btn-icon">📞</span>
              <span>Получить консультацию</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-secondary services-cta-btn">
              <span className="btn-icon">ℹ️</span>
              <span>О компании</span>
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
                  <h3 className="features-title">Преимущества:</h3>
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
                    <span>Подробнее</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                  <Link 
                    to="/contact" 
                    className="btn btn-secondary service-btn"
                  >
                    <span className="btn-icon">📞</span>
                    <span>Консультация</span>
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
            <span>Бесплатная консультация • Быстрый ответ • Опытные эксперты</span>
          </div>

          {/* Fogg: MOTIVATION - Заголовок с эмоциональной привлекательностью */}
          <h2 className="cta-title">Нужна консультация?</h2>
          <p className="cta-subtitle">Свяжитесь с нами для бесплатной консультации</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="cta-social-proof">
            <div className="cta-proof-item">
              <span className="cta-proof-icon">⚡</span>
              <span className="cta-proof-text">Ответ в течение 24 часов</span>
            </div>
            <div className="cta-proof-item">
              <span className="cta-proof-icon">💰</span>
              <span className="cta-proof-text">Бесплатно</span>
            </div>
            <div className="cta-proof-item">
              <span className="cta-proof-icon">👥</span>
              <span className="cta-proof-text">Опытные эксперты</span>
            </div>
          </div>

          {/* Fogg: ABILITY - Упрощенные варианты связи */}
          <div className="cta-options">
            <Link to="/contact" className="cta-option-card">
              <div className="option-icon">📞</div>
              <div className="option-content">
                <h3>Телефон</h3>
                <p>Позвоните нам</p>
              </div>
              <div className="option-arrow">→</div>
            </Link>
            <Link to="/contact" className="cta-option-card">
              <div className="option-icon">✉️</div>
              <div className="option-content">
                <h3>Email</h3>
                <p>Напишите нам</p>
              </div>
              <div className="option-arrow">→</div>
            </Link>
            <Link to="/contact" className="cta-option-card">
              <div className="option-icon">💬</div>
              <div className="option-content">
                <h3>Форма</h3>
                <p>Заполните форму</p>
              </div>
              <div className="option-arrow">→</div>
            </Link>
          </div>

          {/* Fogg: PROMPTS - Основная CTA кнопка с визуальными подсказками */}
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary cta-main-btn">
              <span className="btn-icon">📞</span>
              <span>Получить консультацию</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/about" className="btn btn-secondary cta-secondary-btn">
              <span className="btn-icon">ℹ️</span>
              <span>Узнать больше о нас</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage

