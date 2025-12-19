import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import { useLanguage } from '../../contexts/LanguageContext'
// Иконки из централизованного файла
import {
  HiStar,
  HiBuildingOffice,
  HiSquares2X2,
  HiCube,
  HiCog6Tooth,
  HiMagnifyingGlass,
  HiInformationCircle,
  HiUserGroup,
  HiClipboardDocument,
  HiFolder,
  HiDocumentText,
  HiBookOpen,
  HiDocument,
  HiEnvelope,
  HiPhone,
  HiBriefcase,
  HiCheck,
  HiArrowRight
} from '../../utils/icons'

function Footer() {
  const { t } = useLanguage()
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
    { icon: HiStar, value: '20', label: t('footer.stats.years') },
    { icon: HiBuildingOffice, value: '100+', label: t('footer.stats.projects') },
    { icon: HiSquares2X2, value: '230,000', label: t('footer.stats.area') }
  ]

  const services = [
    { icon: HiBuildingOffice, link: '/services/concrete', text: t('footer.services.concrete') },
    { icon: HiCube, link: '/services/timber', text: t('footer.services.timber') },
    { icon: HiCog6Tooth, link: '/services/industrial', text: t('footer.services.industrial') },
    { icon: HiMagnifyingGlass, link: '/services/inspection', text: t('footer.services.inspection') }
  ]

  const company = [
    { icon: HiInformationCircle, link: '/about', text: t('footer.company.about') },
    { icon: HiUserGroup, link: '/about/team', text: t('footer.company.team') },
    { icon: HiClipboardDocument, link: '/about/certificates', text: t('footer.company.certificates') },
    { icon: HiFolder, link: '/projects', text: t('footer.company.projects') }
  ]

  const resources = [
    { icon: HiDocumentText, link: '/blog', text: t('footer.resources.blog') },
    { icon: HiBookOpen, link: '/resources', text: t('footer.resources.knowledgeBase') },
    { icon: HiDocument, link: '/materials', text: t('footer.resources.materials') },
    { icon: HiEnvelope, link: '/contact', text: t('footer.resources.contact') }
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
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div 
                  key={index} 
                  className="footer-stat-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="stat-icon"><IconComponent /></span>
                  <div className="stat-content">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="footer-trust-badge">
            <span className="trust-icon"><HiCheck /></span>
            <span>{t('footer.trustBadge')}</span>
          </div>
        </div>

        {/* Services Section */}
        <div className={`footer-section ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon"><HiCog6Tooth /></span>
            {t('footer.sections.services')}
          </h4>
          <ul>
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <li 
                  key={index}
                  style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                >
                  <Link to={service.link} className="footer-link">
                    <span className="link-icon"><IconComponent /></span>
                    <span>{service.text}</span>
                    <span className="link-arrow"><HiArrowRight /></span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Company Section */}
        <div className={`footer-section ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon"><HiBuildingOffice /></span>
            {t('footer.sections.company')}
          </h4>
          <ul>
            {company.map((item, index) => {
              const IconComponent = item.icon
              return (
                <li 
                  key={index}
                  style={{ animationDelay: `${index * 0.05 + 0.3}s` }}
                >
                  <Link to={item.link} className="footer-link">
                    <span className="link-icon"><IconComponent /></span>
                    <span>{item.text}</span>
                    <span className="link-arrow"><HiArrowRight /></span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Resources Section */}
        <div className={`footer-section ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon"><HiBookOpen /></span>
            {t('footer.sections.resources')}
          </h4>
          <ul>
            {resources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <li 
                  key={index}
                  style={{ animationDelay: `${index * 0.05 + 0.4}s` }}
                >
                  <Link to={resource.link} className="footer-link">
                    <span className="link-icon"><IconComponent /></span>
                    <span>{resource.text}</span>
                    <span className="link-arrow"><HiArrowRight /></span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Contacts Section */}
        <div className={`footer-section footer-contacts ${isVisible ? 'visible' : ''}`}>
          <h4>
            <span className="section-icon"><HiEnvelope /></span>
            {t('footer.sections.contacts')}
          </h4>
          <div className="contact-item">
            <span className="contact-icon"><HiEnvelope /></span>
            <a href="mailto:info@fireproof.ee" className="contact-link">
              info@fireproof.ee
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon"><HiPhone /></span>
            <div className="contact-phones">
              <a href="tel:+37253442034" className="contact-link">Leonid: +372 5344 2034</a>
              <a href="tel:+37253442035" className="contact-link">Nikolai: +372 5344 2035</a>
              <a href="tel:+37258054255" className="contact-link">Taimo: +372 5805 4255</a>
            </div>
          </div>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/nikolai-nedvedski-853855115/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <span className="social-icon"><HiBriefcase /></span>
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100036649256324" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <span className="social-icon"><HiBookOpen /></span>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fire Proof Company. {t('footer.copyright')}</p>
      </div>
    </footer>
  )
}

export default Footer

