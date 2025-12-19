import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './LanguageSwitcher.css'

const languages = [
  { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
  { code: 'et' as const, name: 'Eesti', flag: '🇪🇪' },
  { code: 'en' as const, name: 'English', flag: '🇬🇧' }
]

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode: typeof language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать язык"
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLang.flag}</span>
        <span className="language-code">{currentLang.code.toUpperCase()}</span>
        <span className={`language-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
              {language === lang.code && <span className="language-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher

