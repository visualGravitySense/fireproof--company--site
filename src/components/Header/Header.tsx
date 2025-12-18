import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

// Иконки для навигации (улучшение подсказок)
const navIcons: Record<string, string> = {
  '/': '🏠',
  '/about': 'ℹ️',
  '/services': '⚙️',
  // '/projects': '📁',
  '/blog': '📝',
  // '/resources': '📚',
  // '/materials': '📄',
  '/contact': '📧'
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)

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

  // Фокус на поиск при открытии (способность)
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
          <span className="logo-text">Fire Proof</span>
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
            <span className="nav-icon">{navIcons['/about']}</span>
            <span className="nav-text">О компании</span>
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{navIcons['/services']}</span>
            <span className="nav-text">Услуги</span>
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
            <span className="nav-icon">{navIcons['/blog']}</span>
            <span className="nav-text">Блог</span>
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
            <span className="nav-icon">{navIcons['/contact']}</span>
            <span className="nav-text">Контакты</span>
          </Link>

        </nav>

          {/* Поиск для улучшения способности (Ability) */}
        <div className="search-container">
          <button 
            className="search-toggle"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Поиск"
            aria-expanded={showSearch}
          >
            🔍
          </button>
          {showSearch && (
            <form className="search-form" onSubmit={handleSearch}>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Поле поиска"
              />
              <button type="submit" className="search-submit" aria-label="Выполнить поиск">
                Найти
              </button>
            </form>
          )}
        </div>

        

        {/* CTA кнопка для повышения мотивации (Motivation) */}
        <Link 
          to="/contact" 
          className="cta-button"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Связаться с нами"
        >
          Связаться
        </Link>
      </div>
    </header>
  )
}

export default Header

