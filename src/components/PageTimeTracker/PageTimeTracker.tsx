import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { TelegramService } from '../../services/telegramService'

/** Отправляет время на странице при уходе или смене вкладки */
export function PageTimeTracker() {
  const location = useLocation()
  const startTimeRef = useRef<number>(Date.now())
  const pathRef = useRef<string>(location.pathname || '/')
  const sentRef = useRef(false)

  const sendTimeOnPage = (path: string, useBeacon = false) => {
    if (sentRef.current) return
    const timeSec = (Date.now() - startTimeRef.current) / 1000
    if (timeSec < 2) return // Игнорируем слишком короткие сессии
    sentRef.current = true
    if (useBeacon) {
      TelegramService.sendBeaconTimeOnPage({ path, timeSec })
    } else {
      TelegramService.notifyTimeOnPage({ path, timeSec })
    }
  }

  useEffect(() => {
    const prevPath = pathRef.current
    const newPath = location.pathname || '/'

    // Смена страницы (SPA) — отправить время по предыдущей
    if (prevPath !== newPath) {
      sendTimeOnPage(prevPath)
      pathRef.current = newPath
      startTimeRef.current = Date.now()
      sentRef.current = false
    }
  }, [location.pathname])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sendTimeOnPage(pathRef.current)
      } else {
        // Вернулись на вкладку — новый замер
        startTimeRef.current = Date.now()
        sentRef.current = false
      }
    }

    const handlePageHide = () => {
      sendTimeOnPage(pathRef.current, true)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [])

  return null
}
