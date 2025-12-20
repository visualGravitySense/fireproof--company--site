import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'
import { initEmailJS } from './utils/emailService'

// Инициализация EmailJS при загрузке приложения
initEmailJS()

// Определяем base path для роутера
// import.meta.env.BASE_URL содержит base path из vite.config.ts (например '/' или '/repo-name/')
const getBasename = () => {
  const base = import.meta.env.BASE_URL || '/'
  // BrowserRouter basename не должен заканчиваться на '/' (кроме корня)
  return base.endsWith('/') && base.length > 1 ? base.slice(0, -1) : base
}

// Устанавливаем CSS переменные для путей к статическим файлам
// Base path для использования в CSS (должен заканчиваться на '/')
const basePath = import.meta.env.BASE_URL || '/'
const basePathForCSS = basePath.endsWith('/') ? basePath : basePath + '/'

// Устанавливаем CSS переменные для часто используемых изображений
document.documentElement.style.setProperty('--base-path', basePathForCSS)
document.documentElement.style.setProperty('--url-fp-hero-1', `url('${basePathForCSS}fp-hero-1.jpg')`)
document.documentElement.style.setProperty('--url-glass-background', `url('${basePathForCSS}glass_background.jpg')`)
document.documentElement.style.setProperty('--url-fire-protection', `url('${basePathForCSS}fire_protection.jpg')`)
document.documentElement.style.setProperty('--url-christmas-card-1', `url('${basePathForCSS}christmas-card-1.jpg')`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)

