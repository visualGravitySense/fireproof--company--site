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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={getBasename()}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)

