import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [isVisible])

  const stats = [
    { icon: '🎯', value: '20', label: 'лет опыта в противопожарной защите' },
    { icon: '🏗️', value: '100+', label: 'проектов' },
    { icon: '📐', value: '230,000', label: 'м² обработанной площади' }
  ]

  const services = [
    { icon: '🏗️', link: '/services/concrete', text: 'Огнезащита бетона' },
    { icon: '🌳', link: '/services/timber', text: 'Огнезащита дерева' },
    { icon: '🏭', link: '/services/industrial', text: 'Промышленные решения' },
    { icon: '🔍', link: '/services/inspection', text: 'Инспекция и надзор' }
  ]

  const company = [
    { icon: 'ℹ️', link: '/about', text: 'О нас' },
    { icon: '👥', link: '/about/team', text: 'Команда' },
    { icon: '📜', link: '/about/certificates', text: 'Сертификаты' },
    { icon: '📁', link: '/projects', text: 'Проекты' }
  ]

  const resources = [
    { icon: '📝', link: '/blog', text: 'Блог' },
    { icon: '📚', link: '/resources', text: 'База знаний' },
    { icon: '📄', link: '/materials', text: 'Материалы' },
    { icon: '📧', link: '/contact', text: 'Контакты' }
  ]

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        {/* Company Section с улучшениями по модели Фогга */}
        <div className={`footer-section footer-company ${isVisible ? 'visible' : ''}`}>
          <div className="footer-logo">
            <img src="/fp-logo-2.svg" alt="Fire Proof" className="footer-logo-img" />
            <h3></h3>
          </div>
          <div className="footer-stats">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="footer-stat-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="stat-icon">{stat.icon}</span>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="footer-trust-badge">
            <span className="trust-icon">✓</span>
            <span>Сертифицированные материалы</span>
          </div>
        </div>

        {/* Services Section */}
        <div className={`footer-section ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon">⚙️</span>
            Услуги
          </h4>
          <ul>
            {services.map((service, index) => (
              <li 
                key={index}
                style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
              >
                <Link to={service.link} className="footer-link">
                  <span className="link-icon">{service.icon}</span>
                  <span>{service.text}</span>
                  <span className="link-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Section */}
        <div className={`footer-section ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon">🏢</span>
            Компания
          </h4>
          <ul>
            {company.map((item, index) => (
              <li 
                key={index}
                style={{ animationDelay: `${index * 0.05 + 0.3}s` }}
              >
                <Link to={item.link} className="footer-link">
                  <span className="link-icon">{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="link-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className={`footer-section ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon">📚</span>
            Ресурсы
          </h4>
          <ul>
            {resources.map((resource, index) => (
              <li 
                key={index}
                style={{ animationDelay: `${index * 0.05 + 0.4}s` }}
              >
                <Link to={resource.link} className="footer-link">
                  <span className="link-icon">{resource.icon}</span>
                  <span>{resource.text}</span>
                  <span className="link-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts Section */}
        <div className={`footer-section footer-contacts ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon">📧</span>
            Контакты
          </h4>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <a href="mailto:info@fireproof.ee" className="contact-link">
              info@fireproof.ee
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <a href="tel:+372XXXXXXXX" className="contact-link">
              +372 XXX XXXX
            </a>
          </div>
          <div className="social-links">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <span className="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <span className="social-icon">📘</span>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fire Proof Company. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer

