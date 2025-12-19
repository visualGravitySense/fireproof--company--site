import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import { useLanguage } from '../../contexts/LanguageContext'
// Иконки из централизованного файла
import {
  HiHome,
  HiInformationCircle,
  HiCog6Tooth,
  HiDocumentText,
  HiEnvelope,
  HiMagnifyingGlass
} from '../../utils/icons'

// Иконки для навигации (улучшение подсказок)
const navIcons: Record<string, React.ComponentType> = {
  '/': HiHome,
  '/about': HiInformationCircle,
  '/services': HiCog6Tooth,
  // '/projects': HiFolder,
  '/blog': HiDocumentText,
  // '/resources': HiBookOpen,
  // '/materials': HiDocument,
  '/contact': HiEnvelope
}

// Вспомогательная функция для рендеринга иконок
const renderIcon = (path: string) => {
  const Icon = navIcons[path]
  return Icon ? <Icon /> : null
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Отслеживание прокрутки для улучшения визуальной обратной связи (способность)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Закрытие меню при клике вне его (способность)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && !(e.target as Element).closest('.nav') && !(e.target as Element).closest('.menu-toggle')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Фокус на поиск при открытии меню на мобильных (способность)
  useEffect(() => {
    if (isMenuOpen && searchInputRef.current) {
      // Небольшая задержка для плавной анимации
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 300)
    }
  }, [isMenuOpen])

  // Фокус на поиск при открытии (способность) - для десктопа
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Здесь можно добавить логику поиска
      console.log('Search:', searchQuery)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" aria-label="Fire Proof - Главная страница">
          <img src="/fp-logo-2.svg" alt="Fire Proof" className="logo-img" />
        </Link>
        
        

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Переключить меню"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`} role="navigation" aria-label="Основная навигация">
          {/* Поиск внутри мобильного меню */}
          <form className="nav-search-form" onSubmit={handleSearch}>
            <input
              ref={searchInputRef}
              type="text"
              className="nav-search-input"
              placeholder={t('nav.search') + '...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('nav.search')}
            />
            <button type="submit" className="nav-search-submit" aria-label={t('nav.search')}>
              <HiMagnifyingGlass />
            </button>
          </form>
          
          {/* <Link 
            to="/" 
            className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{navIcons['/']}</span>
            <span className="nav-text">Главная</span>
          </Link> */}
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{renderIcon('/about')}</span>
            <span className="nav-text">{t('nav.about')}</span>
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{renderIcon('/services')}</span>
            <span className="nav-text">{t('nav.services')}</span>
          </Link>
          {/* <Link 
            to="/projects" 
            className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{navIcons['/projects']}</span>
            <span className="nav-text">Проекты</span>
          </Link> */}
          <Link 
            to="/blog" 
            className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{renderIcon('/blog')}</span>
            <span className="nav-text">{t('nav.blog')}</span>
          </Link>
          {/* <Link 
            to="/resources" 
            className={`nav-link ${isActive('/resources') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{navIcons['/resources']}</span>
            <span className="nav-text">Ресурсы</span>
          </Link> */}
          {/* <Link 
            to="/materials" 
            className={`nav-link ${isActive('/materials') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{navIcons['/materials']}</span>
            <span className="nav-text">Материалы</span>
          </Link> */}
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{renderIcon('/contact')}</span>
            <span className="nav-text">{t('nav.contact')}</span>
          </Link>

        </nav>

          {/* Поиск для улучшения способности (Ability) */}
        <div className="search-container">
          <button 
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
            aria-label={t('nav.search')}
            aria-expanded={showSearch}
          >
            <HiMagnifyingGlass />
          </button>
          {showSearch && (
            <form className="search-form" onSubmit={handleSearch}>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder={t('nav.search') + '...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t('nav.search')}
              />
              <button type="submit" className="search-submit" aria-label={t('nav.search')}>
                {t('nav.search')}
              </button>
            </form>
          )}
        </div>

        {/* Переключатель языков */}
        <LanguageSwitcher />

        {/* CTA кнопка для повышения мотивации (Motivation) */}
        <Link 
          to="/contact" 
          className="cta-button"
          onClick={() => setIsMenuOpen(false)}
          aria-label={t('nav.contactButton')}
        >
          {t('nav.contactButton')}
        </Link>
      </div>
    </header>
  )
}

export default Header

