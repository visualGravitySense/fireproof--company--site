import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import { useLanguage } from '../contexts/LanguageContext'
import { sendQuickForm } from '../utils/emailService'
import { TelegramService } from '../services/telegramService'
import { getStaticPath } from '../utils/paths'
// Иконки из централизованного файла
import {
  HiCheck,
  HiStar,
  HiFire,
  HiShieldCheck,
  HiCube,
  HiPhone,
  HiClipboardDocument,
  HiArrowRight,
  HiCurrencyDollar,
  HiCheckCircle,
  HiClock,
  HiExclamationTriangle,
  HiLockClosed,
  HiBuildingOffice,
  HiCog6Tooth,
  HiWrenchScrewdriver,
  HiGift,
  HiLightBulb,
  HiChartBar,
  HiSquares2X2
} from '../utils/icons'

// Компонент статистики с улучшениями по модели Фогга
function StatsSection() {
  const { t } = useLanguage()
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
      icon: HiStar,
      number: 20,
      suffix: '+',
      label: t('home.stats.years'),
      description: '',
      color: '#ff6b35'
    },
    {
      id: 'projects',
      icon: HiBuildingOffice,
      number: 100,
      suffix: '+',
      label: t('home.stats.projects'),
      description: '',
      color: '#ff6b35'
    },
    {
      id: 'area',
      icon: HiSquares2X2,
      number: 230000,
      suffix: '',
      label: t('home.stats.area'),
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
        <h2 className="stats-title">{t('home.stats.title')}</h2>
        <p className="stats-subtitle">{t('home.stats.subtitle')}</p>
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
                {stat.icon && <stat.icon />}
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
        <span className="trust-badge-icon"><HiCheck /></span>
        <span>{t('home.stats.trustNote')}</span>
      </div>
    </section>
  )
}

// Компонент Social Proof с улучшениями по модели Фогга
function SocialProofSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const partners = [
    {
      id: 'firetherm',
      name: 'Firetherm',
      icon: HiFire,
      description: t('home.partners.firetherm.description'),
      since: '2010',
      color: '#d32f2f',
      badge: t('home.partners.firetherm.badge'),
      logo: '/firetherm_logo.jpg'
    },
    {
      id: 'normaali',
      name: 'Normaali',
      icon: HiShieldCheck,
      description: t('home.partners.normaali.description'),
      since: '2015',
      color: '#1976d2',
      badge: t('home.partners.normaali.badge'),
      logo: '/normaali-logo.png'
    },
    {
      id: 'promat',
      name: 'Promat',
      icon: HiStar,
      description: t('home.partners.promat.description'),
      since: '2008',
      color: '#388e3c',
      badge: t('home.partners.promat.badge'),
      logo: '/promat-logo.webp'
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
          <h2>{t('home.partners.title')}</h2>
          <p className="social-proof-subtitle">
            {t('home.partners.subtitle')}
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

              {/* Иконка/Логотип для мотивации (Motivation) */}
              <div className="partner-icon-wrapper">
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="partner-logo"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                ) : (
                  <span 
                    className="partner-icon" 
                    style={{ 
                      backgroundColor: `${partner.color}15`,
                      color: partner.color
                    }}
                  >
                    {partner.icon && <partner.icon />}
                  </span>
                )}
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
                <span className="trust-icon"><HiCheck /></span>
                <span className="trust-text">{t('home.partners.partnerSince')} {partner.since}</span>
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
          <span className="trust-badge-icon"><HiCheck /></span>
          <span>{t('home.partners.trustNote')}</span>
        </div>
      </div>
    </section>
  )
}

// Компонент Services Preview с улучшениями по модели Фогга
function ServicesPreviewSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const services = [
    {
      id: 'concrete',
      icon: HiBuildingOffice,
      title: t('home.services.concrete.title'),
      description: '',
      link: '/services/concrete',
      features: [
        t('home.services.concrete.features.0'),
        t('home.services.concrete.features.1')
      ],
      color: '#ff6b35',
      badge: t('home.services.concrete.badge'),
      image: '/concrete_building.jpg'
    },
    {
      id: 'timber',
      icon: HiCube,
      title: t('home.services.timber.title'),
      description: '',
      link: '/services/timber',
      features: [
        t('home.services.timber.features.0'),
        t('home.services.timber.features.1')
      ],
      color: '#ff6b35',
      badge: t('home.services.timber.badge'),
      image: '/wooden_log.jpg'
    },
    {
      id: 'industrial',
      icon: HiBuildingOffice,
      title: t('home.services.industrial.title'),
      description: '',
      link: '/services/industrial',
      features: [
        t('home.services.industrial.features.0'),
        t('home.services.industrial.features.1')
      ],
      color: '#ff6b35',
      badge: t('home.services.industrial.badge'),
      image: '/industrial_building.jpg'
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
          <h2>{t('home.services.title')}</h2>
          <p className="services-subtitle">
            {t('home.services.subtitle')}
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${isVisible ? 'visible' : ''} ${service.image ? 'has-image' : ''}`}
              style={{ 
                animationDelay: `${index * 0.15}s`,
                ...(service.image && {
                  '--service-image': `url(${getStaticPath(service.image)})`
                } as React.CSSProperties)
              }}
            >
              {/* Изображение как фон в верхней части */}
              {service.image && (
                <div className="service-image-background" />
              )}

              {/* Badge для мотивации (Motivation) */}
              {service.badge && (
                <div className="service-badge">
                  {service.badge}
                </div>
              )}

              {/* Иконка для мотивации (Motivation) - оранжевая */}
              {!service.image && (
                <div className="service-icon-wrapper">
                  <span className="service-icon">
                    {service.icon && <service.icon />}
                  </span>
                  <div className="service-icon-glow" />
                </div>
              )}

              <h3>{service.title}</h3>
              {service.description && <p>{service.description}</p>}

              {/* Features для мотивации (Motivation) */}
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-check"><HiCheck /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Улучшенная CTA с подсказками (Prompts) */}
              <Link to={service.link} className="service-link">
                <span className="link-text">{t('home.services.more')}</span>
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
          <span>{t('home.services.trust')}</span>
        </div>
      </div>
    </section>
  )
}

// Компонент Problem-Solution с улучшениями по модели Фогга
function ProblemSolutionSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const problems = [
    {
      icon: HiCurrencyDollar,
      text: t('home.problemSolution.problem.items.damage'),
      severity: 'high'
    },
    {
      icon: HiClipboardDocument,
      text: t('home.problemSolution.problem.items.regulations'),
      severity: 'medium'
    },
    {
      icon: HiFire,
      text: t('home.problemSolution.problem.items.wildfires'),
      severity: 'high'
    },
    {
      icon: HiShieldCheck,
      text: t('home.problemSolution.problem.items.insurance'),
      severity: 'medium'
    }
  ]

  const solutions = [
    {
      icon: HiCheckCircle,
      text: t('home.problemSolution.solution.items.materials')
    },
    {
      icon: HiStar,
      text: t('home.problemSolution.solution.items.experience')
    },
    {
      icon: HiWrenchScrewdriver,
      text: t('home.problemSolution.solution.items.complex')
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
        <h2 className="section-main-title">{t('home.problemSolution.title')}</h2>
        <p className="section-main-subtitle">{t('home.problemSolution.subtitle')}</p>
      </div>
      <div className="container">
        {/* Problem Section - для мотивации (Motivation) */}
        <div className={`problem-section ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-icon"><HiExclamationTriangle /></span>
            <h2>{t('home.problemSolution.problem.title')}</h2>
          </div>
          <div className="problem-badge">{t('home.problemSolution.problem.badge')}</div>
          <ul className="problem-list">
            {problems.map((problem, index) => (
              <li
                key={index}
                className={`problem-item ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-severity={problem.severity}
              >
                <span className="problem-icon">{problem.icon && <problem.icon />}</span>
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
              <span className="risk-label">{t('home.problemSolution.problem.highRisk')}</span>
            </div>
          </div>
        </div>

        {/* Solution Section - для способности (Ability) */}
        <div className={`solution-section ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-icon"><HiStar /></span>
            <h2>{t('home.problemSolution.solution.title')}</h2>
          </div>
          <div className="solution-badge">{t('home.problemSolution.solution.badge')}</div>
          <p className="solution-description">
            {t('home.problemSolution.solution.description')}
          </p>
          
          {/* Список преимуществ для мотивации (Motivation) */}
          <ul className="solution-benefits">
            {solutions.map((solution, index) => (
              <li
                key={index}
                className={`solution-benefit ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <span className="benefit-icon">{solution.icon && <solution.icon />}</span>
                <span className="benefit-text">{solution.text}</span>
              </li>
            ))}
          </ul>

          {/* Улучшенная CTA кнопка с подсказками (Prompts) */}
          <Link to="/services" className="solution-cta">
            <span className="cta-icon"><HiArrowRight /></span>
            <span className="cta-text">{t('home.problemSolution.solution.more')}</span>
            <span className="cta-arrow">→</span>
            <div className="cta-glow" />
          </Link>

          {/* Trust элементы для мотивации (Motivation) */}
          <div className="solution-trust">
            <div className="trust-item">
              <span className="trust-check"><HiCheck /></span>
              <span>{t('home.problemSolution.solution.trust.quality')}</span>
            </div>
            <div className="trust-item">
              <span className="trust-check"><HiCheck /></span>
              <span>{t('home.problemSolution.solution.trust.certification')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Компонент Projects Preview Section
function ProjectsPreviewSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const projects = [
    {
      id: 1,
      title: 'Hilton Tallinn Park',
      location: 'Tallinn, Estonia',
      category: 'commercial',
      image: '/hilton_tallinn_park.jpg'
    },
    {
      id: 2,
      title: 'Viimsi Keskus',
      location: 'Tallinn, Estonia',
      category: 'commercial',
      image: '/viimsi_keskus.jpg'
    },
    {
      id: 3,
      title: 'Rotermani Kvartal',
      location: 'Tallinn, Estonia',
      category: 'commercial',
      image: '/rotermanni_kvartal.jpg'
    },
    {
      id: 4,
      title: 'Elamu Mustamael',
      location: 'Tallinn, Estonia',
      category: 'residential',
      image: '/elamu_mustamael.jpg'
    },
    {
      id: 5,
      title: 'Eesti Energia elektrijaam',
      location: 'Ida-Virumaa, Estonia',
      category: 'industrial',
      image: '/eesti_energia.jpg'
    },
    {
      id: 6,
      title: 'Magistrali Keskus',
      location: 'Tallinn, Estonia',
      category: 'commercial',
      image: '/magistrali_keskus.jpg'
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

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'commercial': return t('home.projects.categories.commercial')
      case 'residential': return t('home.projects.categories.residential')
      case 'industrial': return t('home.projects.categories.industrial')
      default: return ''
    }
  }

  return (
    <section className="projects-preview" ref={sectionRef}>
      <div className="container">
        <div className="projects-header">
          <h2>{t('home.projects.title')}</h2>
          <p className="projects-subtitle">
            {t('home.projects.subtitle')}
          </p>
        </div>

        <div className="projects-grid">
          {projects.slice(0, 6).map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.category}`}
              className={`project-preview-card ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-preview-image">
                {project.image ? (
                  <img 
                    src={getStaticPath(project.image)} 
                    alt={project.title} 
                    width={400}
                    height={250}
                    loading="lazy"
                    onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const placeholder = target.nextElementSibling as HTMLElement
                    if (placeholder) placeholder.style.display = 'flex'
                  }} />
                ) : null}
                <div className="placeholder-image" style={{ display: project.image ? 'none' : 'flex' }}>
                  <div className="placeholder-icon"><HiBuildingOffice /></div>
                </div>
                <div className="project-category-badge">{getCategoryLabel(project.category)}</div>
              </div>
              <div className="project-preview-info">
                <p className="project-preview-location">{project.location}</p>
                <h3>{project.title}</h3>
                <div className="project-preview-underline"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="projects-cta">
          <Link to="/projects" className="projects-view-all">
            <span>{t('home.projects.viewAll')}</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Компонент CTA Section с улучшениями по модели Фогга
function CTASection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', objectType: '' })
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const telegramOk = await TelegramService.notifyQuickForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        objectType: formData.objectType,
      })
      
      let emailOk = false
      try {
        const result = await sendQuickForm({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || ''
        })
        emailOk = result.success
      } catch (_) {}
      
      if (telegramOk || emailOk) {
        alert(t('contact.form.success'))
        setFormData({ name: '', phone: '', email: '', objectType: '' })
        setShowForm(false)
      } else {
        alert(t('contact.form.error'))
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert(t('contact.form.error'))
    }
  }

  const benefits = [
    { icon: '✓', text: t('home.cta.benefits.freeConsultation') },
    { icon: '✓', text: t('home.cta.benefits.fastResponse') },
    { icon: '✓', text: t('home.cta.benefits.expertAdvice') }
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
          {t('home.cta.title')}
        </h2>
        
        <p className={`cta-description ${isVisible ? 'visible' : ''}`}>
          {t('home.cta.subtitle')}
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
            <span className="cta-icon"><HiPhone /></span>
            <span className="cta-text">{t('home.cta.button')}</span>
            <span className="cta-arrow">→</span>
          </Link>
          
          <Link 
            to="/services" 
            className={`cta-button-secondary ${isVisible ? 'visible' : ''}`}
          >
            <span className="cta-icon"><HiClipboardDocument /></span>
            <span>{t('common.more')}</span>
          </Link>
        </div>

        {/* Быстрая форма для улучшения способности (Ability) */}
        {showForm && (
          <form className="cta-quick-form" onSubmit={handleFormSubmit}>
            <div className="form-header">
              <h3>{t('home.hero.form.title')}</h3>
              <button 
                type="button" 
                className="form-close"
                onClick={() => setShowForm(false)}
                aria-label={t('home.hero.form.close')}
              >
                ×
              </button>
            </div>
            <div className="form-fields">
              <input
                type="text"
                placeholder={t('home.hero.form.namePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="tel"
                placeholder={t('home.hero.form.phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="email"
                placeholder={t('home.hero.form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
              <button type="submit" className="cta-button-primary form-submit">
                <span>{t('home.hero.form.submit')}</span>
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
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', objectType: '' })
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
  const [quickContact, setQuickContact] = useState('')
  const [quickContactStatus, setQuickContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  
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

  const handleQuickContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = quickContact.trim()
    if (!value || value.length < 3) return
    setQuickContactStatus('sending')
    try {
      const ok = await TelegramService.notifyQuickContact(value)
      if (ok) {
        setQuickContactStatus('success')
        setQuickContact('')
        setShowNotification(true)
        setTimeout(() => {
          setQuickContactStatus('idle')
          setShowNotification(false)
        }, 4000)
      } else {
        setQuickContactStatus('error')
        setTimeout(() => setQuickContactStatus('idle'), 3000)
      }
    } catch {
      setQuickContactStatus('error')
      setTimeout(() => setQuickContactStatus('idle'), 3000)
    }
  }

  // Tell User & Ask User: Обработка обратной связи
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await TelegramService.notifyFeedback({
      rating: feedbackRating,
      comment: feedbackComment || undefined,
    })
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
    
    setSystemStatus('loading')
    
    try {
      // Отправка в Telegram (основной канал — всегда работает)
      const telegramOk = await TelegramService.notifyQuickForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        objectType: formData.objectType,
      })
      
      // EmailJS — дополнительно (если настроен)
      let emailOk = false
      try {
        const result = await sendQuickForm({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          objectType: formData.objectType || ''
        })
        emailOk = result.success
      } catch (_) {
        // EmailJS не настроен или ошибка — не блокируем успех
      }
      
      // Успех, если хотя бы Telegram сработал
      if (telegramOk || emailOk) {
        setSystemStatus('success')
        setShowNotification(true)
        setFormData({ name: '', phone: '', email: '', objectType: '' })
        setShowForm(false)
        setTimeout(() => {
          setShowNotification(false)
          setSystemStatus('idle')
        }, 5000)
      } else {
        throw new Error('Не удалось отправить')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSystemStatus('error')
      alert(t('contact.form.error'))
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
          <span className="status-icon"><HiClock /></span>
          <span>Отправка...</span>
        </div>
      )}
      {systemStatus === 'success' && (
        <div className="system-status status-success minimal">
          <span className="status-icon"><HiCheck /></span>
          <span>Отправлено!</span>
        </div>
      )}
      {systemStatus === 'error' && (
        <div className="system-status status-error minimal">
          <span className="status-icon"><HiExclamationTriangle /></span>
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
        onClick={() => {
          if (!showHelp) TelegramService.notifyHelpClick()
          setShowHelp(!showHelp)
        }}
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
            <span className="notification-icon"><HiCheck /></span>
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
        <div className="fab-tooltip">{t('home.quickActions.freeConsultationTooltip')}</div>
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
            aria-label={t('home.comparison.title')}
          >
            <span className="quick-action-icon">⚖️</span>
            <span>{t('home.quickActions.compare')}</span>
          </button>
          <button 
            className="quick-action"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('home.quickActions.toTop')}
          >
            <span className="quick-action-icon">↑</span>
            <span>{t('home.quickActions.toTop')}</span>
          </button>
        </div>
      )}

      {/* Spectrum of Thinking: ACTIVE MINDSET - Неоднозначные сценарии с выбором */}
      {showComparison && (
        <div className="comparison-modal">
          <div className="comparison-content">
            <div className="comparison-header">
              <h3>{t('home.comparison.title')}</h3>
              <button 
                className="comparison-close"
                onClick={() => setShowComparison(false)}
                aria-label={t('home.comparison.close')}
              >
                ×
              </button>
            </div>
            <div className="comparison-table">
              <div className="comparison-row header">
                <div className="comparison-cell">{t('home.comparison.criteria')}</div>
                <div className="comparison-cell">{t('home.comparison.concrete')}</div>
                <div className="comparison-cell">{t('home.comparison.timber')}</div>
                <div className="comparison-cell">{t('home.comparison.industrial')}</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">{t('home.comparison.serviceLife')}</div>
                <div className="comparison-cell">{t('home.comparison.years25plus')}</div>
                <div className="comparison-cell">{t('home.comparison.years15plus')}</div>
                <div className="comparison-cell">{t('home.comparison.years30plus')}</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">{t('home.comparison.cost')}</div>
                <div className="comparison-cell">{t('home.comparison.costMedium')}</div>
                <div className="comparison-cell">{t('home.comparison.costLow')}</div>
                <div className="comparison-cell">{t('home.comparison.costHigh')}</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">{t('home.comparison.application')}</div>
                <div className="comparison-cell">{t('home.comparison.applicationConcrete')}</div>
                <div className="comparison-cell">{t('home.comparison.applicationTimber')}</div>
                <div className="comparison-cell">{t('home.comparison.applicationIndustrial')}</div>
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
            <span>{t('home.hero.trustBadge')}</span>
          </div>

          <h1 className="hero-title">
            {t('home.hero.title')}
          </h1>
          
          <p className="hero-subtitle">
            {t('home.hero.subtitle')}
          </p>

          {/* CREATE Action Funnel: EVALUATION - Социальные доказательства и ценность */}
          <div className="hero-social-proof">
            <div className="proof-item">
              <span className="proof-number">100+</span>
              <span className="proof-label">{t('home.hero.socialProof.projects')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">230,000</span>
              <span className="proof-label">{t('home.hero.socialProof.area')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-number">20</span>
              <span className="proof-label">{t('home.hero.socialProof.years')}</span>
            </div>
          </div>

          {/* CREATE Action Funnel: EVALUATION - Дополнительные индикаторы ценности */}
          <div className="hero-evaluation">
            <div className="evaluation-item">
              <span className="eval-icon"><HiStar /></span>
              <span>{t('home.hero.evaluation.rating')}</span>
            </div>
            <div className="evaluation-item">
              <span className="eval-icon"><HiStar /></span>
              <span>{t('home.hero.evaluation.leader')}</span>
            </div>
            <div className="evaluation-item">
              <span className="eval-icon"><HiLockClosed /></span>
              <span>{t('home.hero.evaluation.guarantee')}</span>
            </div>
          </div>

          {/* Spectrum of Thinking: HABITS & INTUITIVE - Знакомые CTA паттерны */}
          <div className="hero-cta">
            <div className="hero-cta-buttons">
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
                <span>{t('home.hero.freeConsultation')}</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link 
                to="/services" 
                className="btn btn-secondary"
                onClick={() => setUserIntent('evaluating')}
              >
                <span className="btn-icon"><HiCog6Tooth /></span>
                <span>{t('home.hero.ourServices')}</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
            <form className="hero-quick-input-bar" onSubmit={handleQuickContactSubmit}>
              <input
                type="text"
                value={quickContact}
                onChange={(e) => setQuickContact(e.target.value)}
                placeholder={t('home.hero.form.quickInputPlaceholder')}
                className="hero-quick-input"
                disabled={quickContactStatus === 'sending'}
                minLength={3}
                aria-label={t('home.hero.form.quickInputPlaceholder')}
              />
              <button
                type="submit"
                className="btn btn-primary hero-quick-submit"
                disabled={quickContactStatus === 'sending' || quickContact.trim().length < 3}
              >
                {quickContactStatus === 'sending' ? (
                  <span>...</span>
                ) : (
                  <>
                    <span>{t('home.hero.form.quickInputSubmit')}</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Spectrum of Thinking: HEURISTICS - Упрощенные правила принятия решений */}
          <div className="decision-helpers">
            <div className="helper-card">
              <span className="helper-icon"><HiLightBulb /></span>
              <div>
                <h4>{t('home.hero.helpers.quickDecision.title')}</h4>
                <p>{t('home.hero.helpers.quickDecision.text')}</p>
              </div>
            </div>
            <div className="helper-card">
              <span className="helper-icon"><HiChartBar /></span>
              <div>
                <h4>{t('home.hero.helpers.comparison.title')}</h4>
                <p>{t('home.hero.helpers.comparison.text')}</p>
              </div>
            </div>
            <div className="helper-card">
              <span className="helper-icon"><HiStar /></span>
              <div>
                <h4>{t('home.hero.helpers.recommendations.title')}</h4>
                <p>{t('home.hero.helpers.recommendations.text')}</p>
              </div>
            </div>
          </div>

          {/* CREATE Action Funnel: ABILITY - Упрощенная форма с валидацией */}
          {showForm && (
            <form className="hero-quick-form" onSubmit={handleFormSubmit}>
              <div className="form-header">
                <h3>{t('home.hero.form.title')}</h3>
                <button 
                  type="button" 
                  className="form-close"
                  onClick={() => {
                    setShowForm(false)
                    setUserIntent('browsing')
                  }}
                  aria-label={t('home.hero.form.close')}
                >
                  ×
                </button>
              </div>

              {/* Tell User: Микротекст с инструкциями */}
              <div className="form-microcopy">
                <p>{t('home.hero.form.description')}</p>
              </div>
              
              {/* Spectrum of Thinking: HEURISTICS - Подсказки для упрощения решения */}
              {userIntent === 'evaluating' && (
                <div className="form-heuristics">
                  <p>💡 <strong>{t('home.hero.form.hint')}</strong></p>
                </div>
              )}

              <div className="form-fields">
                <div className="form-field-wrapper">
                  {/* Tell User: Визуальная подсказка с иконкой */}
                  <div className="field-label-with-hint">
                    <label htmlFor="form-name">{t('home.hero.form.name')}</label>
                    <span className="field-hint" title={t('home.hero.form.name')}>ℹ️</span>
                  </div>
                  <input
                    id="form-name"
                    type="text"
                    placeholder={t('home.hero.form.namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="form-input"
                    aria-label={t('home.hero.form.name')}
                    aria-describedby="name-hint"
                  />
                  {formData.name && (
                    <span className="field-check"><HiCheck /></span>
                  )}
                  {/* Tell User: Подсказка под полем */}
                  <span id="name-hint" className="field-hint-text">{t('home.hero.form.nameHint')}</span>
                </div>
                <div className="form-field-wrapper">
                  <div className="field-label-with-hint">
                    <label htmlFor="form-phone">{t('home.hero.form.phone')}</label>
                    <span className="field-hint" title={t('home.hero.form.phone')}>ℹ️</span>
                  </div>
                  <input
                    id="form-phone"
                    type="tel"
                    placeholder={t('home.hero.form.phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="form-input"
                    aria-label={t('home.hero.form.phone')}
                    aria-describedby="phone-hint"
                  />
                  {formData.phone && (
                    <span className="field-check"><HiCheck /></span>
                  )}
                  <span id="phone-hint" className="field-hint-text">{t('home.hero.form.phoneHint')}</span>
                </div>
                <div className="form-field-wrapper">
                  <div className="field-label-with-hint">
                    <label htmlFor="form-email">{t('home.hero.form.email')}</label>
                    <span className="field-hint" title={t('home.hero.form.email')}>ℹ️</span>
                  </div>
                  <input
                    id="form-email"
                    type="email"
                    placeholder={t('home.hero.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="form-input"
                    aria-label={t('home.hero.form.email')}
                    aria-describedby="email-hint"
                  />
                  {formData.email && (
                    <span className="field-check"><HiCheck /></span>
                  )}
                  <span id="email-hint" className="field-hint-text">{t('home.hero.form.emailHint')}</span>
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
                      aria-label={t('home.hero.form.objectType')}
                    >
                      <option value="">{t('home.hero.form.objectType')}</option>
                      <option value="residential">{t('home.hero.form.objectTypeResidential')}</option>
                      <option value="commercial">{t('home.hero.form.objectTypeCommercial')}</option>
                      <option value="industrial">{t('home.hero.form.objectTypeIndustrial')}</option>
                    </select>
                  </div>
                )}

                {/* CREATE Action Funnel: EVALUATION - Напоминание о ценности */}
                <div className="form-value-reminder">
                  <span className="value-icon">🎁</span>
                  <span>{t('home.hero.form.valueReminder')}</span>
                </div>
                <button type="submit" className="btn btn-primary form-submit">
                  <span>{t('home.hero.form.submit')}</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </form>
          )}

          {/* Визуальные подсказки (Prompts) */}
          <div className="hero-scroll-hint">
            <span className="scroll-text">{t('home.hero.scrollHint')}</span>
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

      {/* Projects Preview с примерами проектов */}
      <ProjectsPreviewSection />

      {/* CTA Section с улучшениями по модели Фогга */}
      <CTASection />
    </div>
  )
}

export default HomePage

