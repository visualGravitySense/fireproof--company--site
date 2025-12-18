import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

// Компонент статистики с улучшениями по модели Фогга
function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState<{ years: number; projects: number; area: number }>({ 
    years: 0, 
    projects: 0, 
    area: 0 
  })
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    {
      id: 'years',
      icon: '🎯',
      number: 20,
      suffix: '+',
      label: 'лет опыта',
      description: '',
      color: '#ff6b35'
    },
    {
      id: 'projects',
      icon: '🏗️',
      number: 100,
      suffix: '+',
      label: 'проектов',
      description: '',
      color: '#ff6b35'
    },
    {
      id: 'area',
      icon: '📐',
      number: 230000,
      suffix: '',
      label: 'м²',
      description: '',
      color: '#ff6b35'
    }
  ]

  // Анимация счетчиков при появлении в viewport (способность)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  const animateCounters = () => {
    stats.forEach((stat) => {
      const duration = 2000
      const steps = 80
      const stepDuration = duration / steps
      const increment = stat.number / steps
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        
        // Используем easing функцию для более плавной анимации
        const progress = currentStep / steps
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.min(
          Math.floor(stat.number * easeOutCubic),
          stat.number
        )

        setCounters((prev) => ({
          ...prev,
          [stat.id]: currentValue
        }))

        if (currentStep >= steps) {
          clearInterval(timer)
          setCounters((prev) => ({
            ...prev,
            [stat.id]: stat.number
          }))
        }
      }, stepDuration)
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString('ru-RU')
    }
    return num.toString()
  }

  return (
    <section className="stats" ref={sectionRef}>
      {/* CREATE Action Funnel: CUE - Заголовок секции */}
      <div className="stats-header">
        <h2 className="stats-title">Наша экспертиза в цифрах</h2>
        <p className="stats-subtitle">Доверьтесь профессионалам с проверенным опытом</p>
      </div>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`stat-item ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Иконка для мотивации (Motivation) - оранжевая */}
            <div className="stat-icon-wrapper">
              <span className="stat-icon">
                {stat.icon}
              </span>
              <div className="stat-icon-glow" />
            </div>

            {/* Анимированное число для подсказки (Prompts) */}
            <div className="stat-number-wrapper">
              <span className="stat-number">
                {formatNumber(
                  stat.id === 'years' ? counters.years :
                  stat.id === 'projects' ? counters.projects :
                  counters.area
                )}
                {stat.suffix}
              </span>
              <div className="stat-number-underline" />
            </div>

            {/* Метка - минимальный текст */}
            <div className="stat-label">{stat.label}</div>
            {stat.description && <div className="stat-description">{stat.description}</div>}

            {/* Прогресс-бар для визуальной подсказки (Prompts) */}
            <div className="stat-progress">
              <div
                className="stat-progress-bar"
                style={{
                  backgroundColor: stat.color,
                  width: isVisible ? '100%' : '0%',
                  transitionDelay: `${index * 0.15 + 0.5}s`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Дополнительный trust элемент для мотивации (Motivation) */}
      <div className="stats-trust-note">
        <span className="trust-badge-icon">✓</span>
        <span>Проверенная статистика на основе реальных проектов</span>
      </div>
    </section>
  )
}

// Компонент Social Proof с улучшениями по модели Фогга
function SocialProofSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const partners = [
    {
      id: 'firetherm',
      name: 'Firetherm',
      icon: '🔥',
      description: 'Лидер в огнезащите',
      since: '2010',
      color: '#d32f2f',
      badge: 'Premium'
    },
    {
      id: 'normaali',
      name: 'Normaali',
      icon: '🛡️',
      description: 'Инновационные материалы',
      since: '2015',
      color: '#1976d2',
      badge: 'Innovation'
    },
    {
      id: 'promat',
      name: 'Promat',
      icon: '⭐',
      description: 'Международный стандарт',
      since: '2008',
      color: '#388e3c',
      badge: 'Certified'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  return (
    <section className="social-proof" ref={sectionRef}>
      <div className="container">
        <div className="social-proof-header">
          <h2>Нам доверяют</h2>
          <p className="social-proof-subtitle">
            Работаем с ведущими производителями противопожарных материалов
          </p>
        </div>
        
        <div className="partners">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`partner-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Badge для мотивации (Motivation) */}
              <div className="partner-badge" style={{ backgroundColor: partner.color }}>
                {partner.badge}
              </div>

              {/* Иконка для мотивации (Motivation) */}
              <div className="partner-icon-wrapper">
                <span 
                  className="partner-icon" 
                  style={{ 
                    backgroundColor: `${partner.color}15`,
                    color: partner.color
                  }}
                >
                  {partner.icon}
                </span>
                <div 
                  className="partner-icon-glow" 
                  style={{ backgroundColor: partner.color }}
                />
              </div>

              {/* Название партнера */}
              <h3 className="partner-name">{partner.name}</h3>

              {/* Описание для мотивации (Motivation) */}
              <p className="partner-description">{partner.description}</p>

              {/* Trust индикатор для мотивации (Motivation) */}
              <div className="partner-trust">
                <span className="trust-icon">✓</span>
                <span className="trust-text">Партнер с {partner.since}</span>
              </div>

              {/* Hover эффект для подсказки (Prompts) */}
              <div 
                className="partner-hover-effect" 
                style={{ backgroundColor: `${partner.color}08` }}
              />

              {/* Стрелка для подсказки (Prompts) */}
              <div className="partner-arrow">
                <span style={{ color: partner.color }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительный trust элемент для мотивации (Motivation) */}
        <div className="social-proof-trust">
          <span className="trust-badge-icon">✓</span>
          <span>Все партнеры сертифицированы и соответствуют международным стандартам качества</span>
        </div>
      </div>
    </section>
  )
}

// Компонент Services Preview с улучшениями по модели Фогга
function ServicesPreviewSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const services = [
    {
      id: 'concrete',
      icon: '🏗️',
      title: 'Огнезащита железобетонных конструкций',
      description: '',
      link: '/services/concrete',
      features: ['Сертификация', 'Премиум материалы'],
      color: '#ff6b35',
      badge: 'Популярно'
    },
    {
      id: 'timber',
      icon: '🌳',
      title: 'Огнезащита деревянных конструкций',
      description: '',
      link: '/services/timber',
      features: ['Экологично', 'Безопасно'],
      color: '#ff6b35',
      badge: 'Рекомендуем'
    },
    {
      id: 'industrial',
      icon: '🏭',
      title: 'Промышленные решения',
      description: '',
      link: '/services/industrial',
      features: ['Комплексно', 'Надежно'],
      color: '#ff6b35',
      badge: 'Профессионально'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  return (
    <section className="services-preview" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <h2>Наши услуги</h2>
          <p className="services-subtitle">
            Комплексные решения для защиты вашего имущества от пожаров
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Badge для мотивации (Motivation) */}
              {service.badge && (
                <div className="service-badge">
                  {service.badge}
                </div>
              )}

              {/* Иконка для мотивации (Motivation) - оранжевая */}
              <div className="service-icon-wrapper">
                <span className="service-icon">
                  {service.icon}
                </span>
                <div className="service-icon-glow" />
              </div>

              <h3>{service.title}</h3>
              {service.description && <p>{service.description}</p>}

              {/* Features для мотивации (Motivation) */}
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Улучшенная CTA с подсказками (Prompts) */}
              <Link to={service.link} className="service-link">
                <span className="link-text">Подробнее</span>
                <span className="link-arrow">→</span>
                <div className="link-underline" style={{ backgroundColor: '#ff6b35' }} />
              </Link>

              {/* Hover эффект для подсказки (Prompts) */}
              <div className="service-hover-effect" />
            </div>
          ))}
        </div>

        {/* Trust элемент для мотивации (Motivation) */}
        <div className="services-trust">
          <span className="trust-icon">✓</span>
          <span>Все услуги сертифицированы и соответствуют международным стандартам</span>
        </div>
      </div>
    </section>
  )
}

// Компонент Problem-Solution с улучшениями по модели Фогга
function ProblemSolutionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const problems = [
    {
      icon: '💰',
      text: 'Ущерб от пожаров в США: $11.4 млрд в 2023 году',
      severity: 'high'
    },
    {
      icon: '📋',
      text: 'Увеличение строгости строительных норм',
      severity: 'medium'
    },
    {
      icon: '🔥',
      text: 'Рост количества лесных и городских пожаров',
      severity: 'high'
    },
    {
      icon: '🛡️',
      text: 'Страховые компании требуют огнезащиту',
      severity: 'medium'
    }
  ]

  const solutions = [
    {
      icon: '✅',
      text: 'Сертифицированные материалы премиум-класса'
    },
    {
      icon: '🏆',
      text: '20 лет опыта в противопожарной защите'
    },
    {
      icon: '🔧',
      text: 'Комплексные решения от проектирования до надзора'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  return (
    <section className="problem-solution" ref={sectionRef}>
      {/* CREATE Action Funnel: CUE - Заголовок секции */}
      <div className="problem-solution-header">
        <h2 className="section-main-title">Проблема и решение</h2>
        <p className="section-main-subtitle">Понимаем риски и предлагаем надежную защиту</p>
      </div>
      <div className="container">
        {/* Problem Section - для мотивации (Motivation) */}
        <div className={`problem-section ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-icon">⚠️</span>
            <h2>Риски пожаров реальны</h2>
          </div>
          <div className="problem-badge">Критическая проблема</div>
          <ul className="problem-list">
            {problems.map((problem, index) => (
              <li
                key={index}
                className={`problem-item ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-severity={problem.severity}
              >
                <span className="problem-icon">{problem.icon}</span>
                <span className="problem-text">{problem.text}</span>
                {problem.severity === 'high' && (
                  <span className="problem-alert">!</span>
                )}
              </li>
            ))}
          </ul>
          <div className="problem-visual">
            <div className="risk-meter">
              <div className="risk-bar" style={{ width: isVisible ? '85%' : '0%' }} />
              <span className="risk-label">Высокий риск</span>
            </div>
          </div>
        </div>

        {/* Solution Section - для способности (Ability) */}
        <div className={`solution-section ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-icon">✨</span>
            <h2>Наше решение</h2>
          </div>
          <div className="solution-badge">Проверенное решение</div>
          <p className="solution-description">
            Комплексная противопожарная защита с использованием сертифицированных материалов премиум-класса
          </p>
          
          {/* Список преимуществ для мотивации (Motivation) */}
          <ul className="solution-benefits">
            {solutions.map((solution, index) => (
              <li
                key={index}
                className={`solution-benefit ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <span className="benefit-icon">{solution.icon}</span>
                <span className="benefit-text">{solution.text}</span>
              </li>
            ))}
          </ul>

          {/* Улучшенная CTA кнопка с подсказками (Prompts) */}
          <Link to="/services" className="solution-cta">
            <span className="cta-icon">🚀</span>
            <span className="cta-text">Узнать больше</span>
            <span className="cta-arrow">→</span>
            <div className="cta-glow" />
          </Link>

          {/* Trust элементы для мотивации (Motivation) */}
          <div className="solution-trust">
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <span>Гарантия качества</span>
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              <span>Сертификация</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Компонент CTA Section с улучшениями по модели Фогга
function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', phone: '', email: '' })
    setShowForm(false)
  }

  const benefits = [
    { icon: '✓', text: 'Бесплатная консультация' },
    { icon: '✓', text: 'Ответ в течение 24 часов' },
    { icon: '✓', text: 'Индивидуальный подход' }
  ]

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="container">
        {/* Trust Badge для мотивации (Motivation) */}
        <div className={`cta-trust-badge ${isVisible ? 'visible' : ''}`}>
          <span className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Бесплатно</span>
          </span>
          <span className="trust-separator">•</span>
          <span className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Без обязательств</span>
          </span>
          <span className="trust-separator">•</span>
          <span className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Конфиденциально</span>
          </span>
        </div>

        <h2 className={`cta-title ${isVisible ? 'visible' : ''}`}>
          Готовы защитить свой проект?
        </h2>
        
        <p className={`cta-description ${isVisible ? 'visible' : ''}`}>
          Получите бесплатную консультацию от наших экспертов
        </p>

        {/* Benefits для мотивации (Motivation) */}
        <ul className={`cta-benefits ${isVisible ? 'visible' : ''}`}>
          {benefits.map((benefit, index) => (
            <li
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="benefit-icon">{benefit.icon}</span>
              <span>{benefit.text}</span>
            </li>
          ))}
        </ul>

        {/* Улучшенная CTA кнопка с подсказками (Prompts) */}
        <div className="cta-buttons">
          <Link 
            to="/contact" 
            className={`cta-button-primary ${isVisible ? 'visible' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              setShowForm(!showForm)
            }}
          >
            <span className="cta-icon">📞</span>
            <span className="cta-text">Связаться с нами</span>
            <span className="cta-arrow">→</span>
          </Link>
          
          <Link 
            to="/services" 
            className={`cta-button-secondary ${isVisible ? 'visible' : ''}`}
          >
            <span className="cta-icon">📋</span>
            <span>Узнать больше</span>
          </Link>
        </div>

        {/* Быстрая форма для улучшения способности (Ability) */}
        {showForm && (
          <form className="cta-quick-form" onSubmit={handleFormSubmit}>
            <div className="form-header">
              <h3>Получите консультацию прямо сейчас</h3>
              <button 
                type="button" 
                className="form-close"
                onClick={() => setShowForm(false)}
                aria-label="Закрыть форму"
              >
                ×
              </button>
            </div>
            <div className="form-fields">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
              <button type="submit" className="cta-button-primary form-submit">
                <span>Отправить заявку</span>
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [showNotification, setShowNotification] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [exitIntentDetected, setExitIntentDetected] = useState(false)
  const [userIntent, setUserIntent] = useState<'browsing' | 'evaluating' | 'deciding'>('browsing')
  const [showComparison, setShowComparison] = useState(false)
  
  // Clear the Page: Минимизация отвлекающих элементов
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [systemStatus, setSystemStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [showHelp, setShowHelp] = useState(false)
  const [showMinimizedFeedback, setShowMinimizedFeedback] = useState(false)
  
  const pageRef = useRef<HTMLDivElement>(null)

  // CREATE Action Funnel: CUE - Визуальные подсказки и триггеры
  useEffect(() => {
    setIsVisible(true)
    
    // Отслеживание прогресса прокрутки для CUE
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Exit Intent Detection для TIMING
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentDetected) {
        setExitIntentDetected(true)
        setShowForm(true)
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [exitIntentDetected])

  // Tell User & Ask User: Обработка обратной связи
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', { rating: feedbackRating, comment: feedbackComment })
    setShowNotification(true)
    setShowFeedback(false)
    setFeedbackRating(0)
    setFeedbackComment('')
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  // CREATE Action Funnel: EXECUTION - Улучшенная обработка формы
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Tell User: Показываем статус загрузки
    setSystemStatus('loading')
    
    // Симуляция отправки формы
    try {
      // Здесь будет реальная отправка на сервер
      await new Promise(resolve => setTimeout(resolve, 1500)) // Симуляция задержки
      console.log('Form submitted:', formData)
      
      // Tell User: Показываем успешный статус
      setSystemStatus('success')
      
      // Показываем уведомление об успехе (EXECUTION)
      setShowNotification(true)
      setFormData({ name: '', phone: '', email: '' })
      setShowForm(false)
      
      // Скрываем уведомление через 5 секунд
      setTimeout(() => {
        setShowNotification(false)
        setSystemStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSystemStatus('error')
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
      setTimeout(() => {
        setSystemStatus('idle')
      }, 3000)
    }
  }

  return (
    <div className="home-page" ref={pageRef}>
      {/* Clear the Page: Минимизированные уведомления - только при необходимости */}
      {systemStatus === 'loading' && (
        <div className="system-status status-loading minimal">
          <span className="status-icon">⏳</span>
          <span>Отправка...</span>
        </div>
      )}
      {systemStatus === 'success' && (
        <div className="system-status status-success minimal">
          <span className="status-icon">✓</span>
          <span>Отправлено!</span>
        </div>
      )}
      {systemStatus === 'error' && (
        <div className="system-status status-error minimal">
          <span className="status-icon">⚠️</span>
          <span>Ошибка</span>
        </div>
      )}

      {/* Clear the Page: Помощь только по запросу, минимизированная */}
      {showHelp && (
        <div className="help-panel minimal">
          <div className="help-header">
            <h3>Помощь</h3>
            <button 
              className="help-close"
              onClick={() => setShowHelp(false)}
              aria-label="Закрыть помощь"
            >
              ×
            </button>
          </div>
          <div className="help-content">
            <div className="help-item">
              <strong>Консультация</strong>
              <p>Бесплатная консультация по огнезащите</p>
            </div>
            <div className="help-item">
              <strong>Расчет</strong>
              <p>Стоимость работ для вашего объекта</p>
            </div>
            <div className="help-item">
              <strong>Информация</strong>
              <p>Услуги и материалы</p>
            </div>
          </div>
        </div>
      )}

      {/* Clear the Page: Минимизированная кнопка обратной связи */}
      {!showFeedback && (
        <button 
          className="feedback-button minimal"
          onClick={() => setShowFeedback(true)}
          aria-label="Оставить отзыв"
          title="Отзыв"
        >
          <span className="feedback-icon">💬</span>
        </button>
      )}

      {/* Ask User: Форма обратной связи */}
      {showFeedback && (
        <div className="feedback-modal">
          <div className="feedback-content">
            <div className="feedback-header">
              <h3>Поделитесь своим мнением</h3>
              <button 
                className="feedback-close"
                onClick={() => setShowFeedback(false)}
                aria-label="Закрыть форму отзыва"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              {/* Tell User: Четкие инструкции */}
              <div className="form-instruction">
                <p>Оцените ваш опыт на нашем сайте:</p>
              </div>
              
              {/* Ask User: Интерактивный рейтинг */}
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`rating-star ${feedbackRating >= star ? 'active' : ''}`}
                    onClick={() => setFeedbackRating(star)}
                    aria-label={`Оценить ${star} из 5`}
                  >
                    ⭐
                  </button>
                ))}
              </div>

              {/* Ask User: Текстовый комментарий */}
              <div className="form-field">
                <label htmlFor="feedback-comment">
                  Ваш комментарий (необязательно)
                </label>
                <textarea
                  id="feedback-comment"
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Расскажите, что можно улучшить..."
                  rows={4}
                  className="feedback-textarea"
                />
              </div>

              <button type="submit" className="btn btn-primary feedback-submit">
                Отправить отзыв
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Clear the Page: Минимизированная кнопка помощи */}
      <button 
        className="help-button minimal"
        onClick={() => setShowHelp(!showHelp)}
        aria-label="Помощь"
        title="Помощь"
      >
        <span className="help-button-icon">❓</span>
      </button>

      {/* CREATE Action Funnel: CUE - Прогресс-бар прокрутки */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* CREATE Action Funnel: CUE - Уведомление об успехе (EXECUTION) */}
      {showNotification && (
        <div className="success-notification">
          <div className="notification-content">
            <span className="notification-icon">✓</span>
            <div>
              <h4>Заявка отправлена!</h4>
              <p>Мы свяжемся с вами в ближайшее время</p>
            </div>
            <button 
              className="notification-close"
              onClick={() => setShowNotification(false)}
              aria-label="Закрыть уведомление"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Spectrum of Thinking: HABITS - Знакомые паттерны для быстрого действия */}
      <div className="floating-action-button">
        <button
          onClick={() => {
            setShowForm(true)
            setUserIntent('deciding')
          }}
          className="fab-button"
          aria-label="Быстрая консультация"
        >
          <span className="fab-icon">💬</span>
          <span className="fab-pulse" />
        </button>
        <div className="fab-tooltip">Бесплатная консультация</div>
      </div>

      {/* Spectrum of Thinking: INTUITIVE RESPONSES - Быстрые действия для знакомых пользователей */}
      {scrollProgress > 20 && (
        <div className="quick-actions-bar">
          <button 
            className="quick-action"
            onClick={() => {
              setShowComparison(!showComparison)
              setUserIntent('evaluating')
            }}
            aria-label="Сравнить услуги"
          >
            <span className="quick-action-icon">⚖️</span>
            <span>Сравнить</span>
          </button>
          <button 
            className="quick-action"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Наверх"
          >
            <span className="quick-action-icon">↑</span>
            <span>Наверх</span>
          </button>
        </div>
      )}

      {/* Spectrum of Thinking: ACTIVE MINDSET - Неоднозначные сценарии с выбором */}
      {showComparison && (
        <div className="comparison-modal">
          <div className="comparison-content">
            <div className="comparison-header">
              <h3>Сравнение услуг</h3>
              <button 
                className="comparison-close"
                onClick={() => setShowComparison(false)}
                aria-label="Закрыть сравнение"
              >
                ×
              </button>
            </div>
            <div className="comparison-table">
              <div className="comparison-row header">
                <div className="comparison-cell">Критерий</div>
                <div className="comparison-cell">Бетон</div>
                <div className="comparison-cell">Дерево</div>
                <div className="comparison-cell">Промышленные</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Срок службы</div>
                <div className="comparison-cell">25+ лет</div>
                <div className="comparison-cell">15+ лет</div>
                <div className="comparison-cell">30+ лет</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Стоимость</div>
                <div className="comparison-cell">Средняя</div>
                <div className="comparison-cell">Низкая</div>
                <div className="comparison-cell">Высокая</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Применение</div>
                <div className="comparison-cell">ЖБК</div>
                <div className="comparison-cell">Деревянные конструкции</div>
                <div className="comparison-cell">Промышленные объекты</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section с улучшениями по модели CREATE Action Funnel */}
      <section className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-content">
          {/* Trust Badge для мотивации (Motivation) */}
          <div className="hero-trust-badge">
            <span className="trust-icon">✓</span>
            <span>Сертифицированные материалы • 20 лет опыта</span>
          </div>

          <h1 className="hero-title">
            Защищаем то, что важно: жизни, имущество, бизнес
          </h1>
          
          <p className="hero-subtitle">
            20 лет опыта в противопожарной защите. Комплексные решения от проектирования до надзора.
          </p>

          {/* CREATE Action Funnel: EVALUATION - Социальные доказательства и ценность */}
          <div className="hero-social-proof">
            <div className="proof-item">
              <span className="proof-number">100+</span>
              <span className="proof-label">Успешных проектов</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">230,000</span>
              <span className="proof-label">м² защищено</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">20</span>
              <span className="proof-label">лет опыта</span>
            </div>
          </div>

          {/* CREATE Action Funnel: EVALUATION - Дополнительные индикаторы ценности */}
          <div className="hero-evaluation">
            <div className="evaluation-item">
              <span className="eval-icon">⭐</span>
              <span>Рейтинг 4.9/5</span>
            </div>
            <div className="evaluation-item">
              <span className="eval-icon">🏆</span>
              <span>Лидер рынка</span>
            </div>
            <div className="evaluation-item">
              <span className="eval-icon">🔒</span>
              <span>Гарантия качества</span>
            </div>
          </div>

          {/* Spectrum of Thinking: HABITS & INTUITIVE - Знакомые CTA паттерны */}
          <div className="hero-cta">
            <Link 
              to="/contact" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                setShowForm(!showForm)
                setUserIntent('deciding')
              }}
            >
              <span className="btn-icon">📞</span>
              <span>Бесплатная консультация</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link 
              to="/services" 
              className="btn btn-secondary"
              onClick={() => setUserIntent('evaluating')}
            >
              <span className="btn-icon">⚙️</span>
              <span>Наши услуги</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>

          {/* Spectrum of Thinking: HEURISTICS - Упрощенные правила принятия решений */}
          <div className="decision-helpers">
            <div className="helper-card">
              <span className="helper-icon">💡</span>
              <div>
                <h4>Быстрое решение</h4>
                <p>Выберите услугу за 2 минуты</p>
              </div>
            </div>
            <div className="helper-card">
              <span className="helper-icon">📊</span>
              <div>
                <h4>Сравнение</h4>
                <p>Сравните варианты рядом</p>
              </div>
            </div>
            <div className="helper-card">
              <span className="helper-icon">🎯</span>
              <div>
                <h4>Рекомендации</h4>
                <p>Получите персональный совет</p>
              </div>
            </div>
          </div>

          {/* CREATE Action Funnel: ABILITY - Упрощенная форма с валидацией */}
          {showForm && (
            <form className="hero-quick-form" onSubmit={handleFormSubmit}>
              <div className="form-header">
                <h3>Получите консультацию прямо сейчас</h3>
                <button 
                  type="button" 
                  className="form-close"
                  onClick={() => {
                    setShowForm(false)
                    setUserIntent('browsing')
                  }}
                  aria-label="Закрыть форму"
                >
                  ×
                </button>
              </div>

              {/* Tell User: Микротекст с инструкциями */}
              <div className="form-microcopy">
                <p>Заполните форму ниже, и наш специалист свяжется с вами в течение 24 часов</p>
              </div>
              
              {/* Spectrum of Thinking: HEURISTICS - Подсказки для упрощения решения */}
              {userIntent === 'evaluating' && (
                <div className="form-heuristics">
                  <p>💡 <strong>Совет:</strong> Укажите тип объекта, и мы подберем оптимальное решение</p>
                </div>
              )}

              <div className="form-fields">
                <div className="form-field-wrapper">
                  {/* Tell User: Визуальная подсказка с иконкой */}
                  <div className="field-label-with-hint">
                    <label htmlFor="form-name">Ваше имя</label>
                    <span className="field-hint" title="Укажите ваше имя для обращения">ℹ️</span>
                  </div>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="Например: Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="form-input"
                    aria-label="Ваше имя"
                    aria-describedby="name-hint"
                  />
                  {formData.name && (
                    <span className="field-check">✓</span>
                  )}
                  {/* Tell User: Подсказка под полем */}
                  <span id="name-hint" className="field-hint-text">Мы обратимся к вам по имени</span>
                </div>
                <div className="form-field-wrapper">
                  <div className="field-label-with-hint">
                    <label htmlFor="form-phone">Телефон</label>
                    <span className="field-hint" title="Укажите номер для связи">ℹ️</span>
                  </div>
                  <input
                    id="form-phone"
                    type="tel"
                    placeholder="+372 5XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="form-input"
                    aria-label="Телефон"
                    aria-describedby="phone-hint"
                  />
                  {formData.phone && (
                    <span className="field-check">✓</span>
                  )}
                  <span id="phone-hint" className="field-hint-text">Мы позвоним в удобное для вас время</span>
                </div>
                <div className="form-field-wrapper">
                  <div className="field-label-with-hint">
                    <label htmlFor="form-email">Email</label>
                    <span className="field-hint" title="Для отправки деталей консультации">ℹ️</span>
                  </div>
                  <input
                    id="form-email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="form-input"
                    aria-label="Email"
                    aria-describedby="email-hint"
                  />
                  {formData.email && (
                    <span className="field-check">✓</span>
                  )}
                  <span id="email-hint" className="field-hint-text">Отправим детали консультации на email</span>
                </div>
                
                {/* Spectrum of Thinking: FOCUSED CALCULATION - Дополнительные поля для критических решений */}
                {userIntent === 'deciding' && (
                  <div className="form-field-wrapper">
                    <select 
                      className="form-input"
                      onChange={(e) => {
                        if (e.target.value) {
                          setUserIntent('deciding')
                        }
                      }}
                      aria-label="Тип объекта"
                    >
                      <option value="">Выберите тип объекта (опционально)</option>
                      <option value="residential">Жилой</option>
                      <option value="commercial">Коммерческий</option>
                      <option value="industrial">Промышленный</option>
                    </select>
                  </div>
                )}

                {/* CREATE Action Funnel: EVALUATION - Напоминание о ценности */}
                <div className="form-value-reminder">
                  <span className="value-icon">🎁</span>
                  <span>Бесплатная консультация • Ответ в течение 24 часов</span>
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  <span>Отправить заявку</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </form>
          )}

          {/* Визуальные подсказки (Prompts) */}
          <div className="hero-scroll-hint">
            <span className="scroll-text">Узнайте больше</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      {/* Stats Section с улучшениями по модели Фогга */}
      <StatsSection />

      {/* Problem → Solution Section с улучшениями по модели Фогга */}
      <ProblemSolutionSection />

      {/* Services Preview с улучшениями по модели Фогга */}
      <ServicesPreviewSection />

      {/* Social Proof с улучшениями по модели Фогга */}
      <SocialProofSection />

      {/* CTA Section с улучшениями по модели Фогга */}
      <CTASection />
    </div>
  )
}

export default HomePage

