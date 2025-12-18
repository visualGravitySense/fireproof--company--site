import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ServiceDetailPage.css'

function ServiceDetailPage() {
  const { service } = useParams<{ service: string }>()

  // Fogg Behavior Model: State для улучшения UX
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [service])

  const serviceData: Record<string, any> = {
    concrete: {
      title: 'Огнезащита железобетонных конструкций',
      description: 'Профессиональная защита железобетонных конструкций от воздействия огня',
      process: [
        'Подготовка поверхности',
        'Нанесение огнезащитного покрытия',
        'Контроль качества',
        'Сертификация'
      ],
      materials: ['Firetherm', 'Promat'],
      standards: ['ISO', 'EN'],
      warranty: 'Долговечное покрытие с гарантией'
    },
    timber: {
      title: 'Огнезащита деревянных конструкций',
      description: 'Эффективная защита деревянных конструкций с использованием экологичных материалов',
      process: [
        'Анализ типа древесины',
        'Выбор метода обработки',
        'Нанесение защитного состава',
        'Сертификация'
      ],
      materials: ['Экологичные составы'],
      standards: ['EN', 'Сертификация'],
      warranty: 'Сертифицированная защита'
    },
    industrial: {
      title: 'Промышленные решения',
      description: 'Комплексные системы противопожарной защиты для промышленных объектов',
      process: [
        'Аудит объекта',
        'Проектирование системы',
        'Установка и монтаж',
        'Инспекция и надзор'
      ],
      materials: ['Комплексные системы'],
      standards: ['Промышленные стандарты'],
      warranty: 'Полное сопровождение'
    },
    inspection: {
      title: 'Инспекция и надзор',
      description: 'Профессиональная инспекция и надзор за проектами противопожарной защиты',
      process: [
        'Регулярные проверки',
        'Контроль качества',
        'Отчетность',
        'Рекомендации'
      ],
      materials: [],
      standards: ['Соответствие стандартам'],
      warranty: 'Непрерывный надзор'
    },
    consultation: {
      title: 'Консультации',
      description: 'Экспертные консультации по вопросам противопожарной защиты',
      process: [
        'Анализ проекта',
        'Рекомендации',
        'Проектирование',
        'Поддержка'
      ],
      materials: [],
      standards: ['Экспертные знания'],
      warranty: 'Бесплатная консультация'
    }
  }

  const data = serviceData[service || ''] || serviceData.concrete

  return (
    <div className="service-detail-page">
      {/* Fogg: MOTIVATION & PROMPTS - Hero блок */}
      <div className={`page-header service-hero ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          {/* Fogg: PROMPTS - Навигация назад */}
          <Link to="/services" className="back-link">
            <span className="back-icon">←</span>
            <span>Назад к услугам</span>
          </Link>

          {/* Fogg: MOTIVATION - Trust Badge */}
          <div className="service-trust-badge">
            <span className="trust-icon">✓</span>
            <span>Сертифицированные материалы • 20 лет опыта • Гарантия качества</span>
          </div>

          <h1 className="service-hero-title">{data.title}</h1>
          <p className="service-hero-subtitle">{data.description}</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="service-social-proof">
            <div className="proof-item">
              <span className="proof-icon">🏆</span>
              <span className="proof-value">20+</span>
              <span className="proof-label">лет опыта</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">✅</span>
              <span className="proof-value">100%</span>
              <span className="proof-label">гарантия</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">📋</span>
              <span className="proof-value">ISO</span>
              <span className="proof-label">сертификация</span>
            </div>
          </div>

          {/* Fogg: PROMPTS - Быстрые действия */}
          <div className="service-hero-actions">
            <Link to="/contact" className="hero-cta-btn primary">
              <span className="btn-icon">📞</span>
              <span>Получить консультацию</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/projects" className="hero-cta-btn secondary">
              <span className="btn-icon">👁️</span>
              <span>Посмотреть проекты</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="service-detail-content">
        <div className="container">
          {/* Fogg: ABILITY - Процесс работы с улучшениями */}
          <div className={`detail-section process-section ${isVisible ? 'visible' : ''}`}>
            <div className="section-header">
              <span className="section-icon">⚙️</span>
              <h2>Процесс работы</h2>
            </div>
            <div className="process-steps">
              {data.process.map((step: string, idx: number) => (
                <div key={idx} className="process-step">
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step}</h3>
                    <div className="step-line"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fogg: MOTIVATION - Материалы с визуальными элементами */}
          {data.materials.length > 0 && (
            <div className={`detail-section materials-section ${isVisible ? 'visible' : ''}`}>
              <div className="section-header">
                <span className="section-icon">🔧</span>
                <h2>Используемые материалы</h2>
              </div>
              <div className="materials-grid">
                {data.materials.map((material: string, idx: number) => (
                  <div key={idx} className="material-card">
                    <span className="material-icon">✓</span>
                    <span className="material-name">{material}</span>
                    <span className="material-badge">Сертифицировано</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fogg: MOTIVATION - Стандарты с улучшениями */}
          <div className={`detail-section standards-section ${isVisible ? 'visible' : ''}`}>
            <div className="section-header">
              <span className="section-icon">📋</span>
              <h2>Стандарты</h2>
            </div>
            <div className="standards-list">
              {data.standards.map((standard: string, idx: number) => (
                <div key={idx} className="standard-item">
                  <span className="standard-icon">✓</span>
                  <span className="standard-text">{standard}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fogg: MOTIVATION - Гарантии с улучшениями */}
          <div className={`detail-section warranty-section ${isVisible ? 'visible' : ''}`}>
            <div className="section-header">
              <span className="section-icon">🛡️</span>
              <h2>Гарантии</h2>
            </div>
            <div className="warranty-content">
              <div className="warranty-icon">✓</div>
              <div className="warranty-text">
                <h3>{data.warranty}</h3>
                <p>Мы гарантируем качество нашей работы и предоставляем полную поддержку на всех этапах проекта</p>
              </div>
            </div>
          </div>

          {/* Fogg: PROMPTS - Улучшенная CTA секция */}
          <div className={`cta-box ${isVisible ? 'visible' : ''}`}>
            <div className="cta-content">
              <div className="cta-icon">🎯</div>
              <h3 className="cta-title">Готовы начать проект?</h3>
              <p className="cta-description">Свяжитесь с нами для бесплатной консультации и получите персональное предложение</p>
              <div className="cta-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">⚡</span>
                  <span>Быстрый ответ</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💰</span>
                  <span>Бесплатная консультация</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">👥</span>
                  <span>Опытные эксперты</span>
                </div>
              </div>
              <div className="cta-actions">
                <Link to="/contact" className="cta-btn primary">
                  <span className="btn-icon">📞</span>
                  <span>Связаться с нами</span>
                  <span className="btn-arrow">→</span>
                </Link>
                <Link to="/services" className="cta-btn secondary">
                  <span className="btn-icon">🔍</span>
                  <span>Другие услуги</span>
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage

