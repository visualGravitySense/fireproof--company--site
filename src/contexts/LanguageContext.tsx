import { createContext, useContext, useState, ReactNode } from 'react'
import { ru } from '../locales/ru'
import { et } from '../locales/et'
import { en } from '../locales/en'

type Language = 'ru' | 'et' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Все переводы
const translations = {
  ru,
  et,
  en
}

// Функция для получения вложенных значений по пути строки (например, 'nav.home' или 'home.hero.title')
// Поддерживает доступ к элементам массива через индекс (например, 'home.services.concrete.features.0')
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.')
  let value = obj
  
  for (const key of keys) {
    if (value && typeof value === 'object') {
      // Проверяем, является ли ключ числом (индексом массива)
      const numKey = parseInt(key, 10)
      if (!isNaN(numKey) && Array.isArray(value)) {
        value = value[numKey]
      } else if (key in value) {
        value = value[key]
      } else {
        return path // Возвращаем путь, если значение не найдено
      }
    } else {
      return path // Возвращаем путь, если значение не найдено
    }
  }
  
  return typeof value === 'string' ? value : path
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Получаем язык из localStorage или определяем по умолчанию
    const saved = localStorage.getItem('language') as Language
    if (saved && ['ru', 'et', 'en'].includes(saved)) {
      return saved
    }
    // Определяем язык браузера
    const browserLang = navigator.language.split('-')[0]
    if (browserLang === 'et') return 'et'
    if (browserLang === 'en') return 'en'
    return 'ru' // По умолчанию русский
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const translation = translations[language]
    return getNestedValue(translation, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

