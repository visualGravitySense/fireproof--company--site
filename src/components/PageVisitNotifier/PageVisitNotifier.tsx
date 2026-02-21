import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { TelegramService } from '../../services/telegramService'

const THROTTLE_MS = 5 * 60 * 1000 // 5 минут между уведомлениями

/** Отправляет уведомление в Telegram при посещении любой страницы сайта */
export function PageVisitNotifier() {
  const location = useLocation()

  useEffect(() => {
    const key = 'lastPageVisitNotify'
    const last = sessionStorage.getItem(key)
    const now = Date.now()
    if (last && now - Number(last) < THROTTLE_MS) return
    sessionStorage.setItem(key, String(now))

    TelegramService.notifyPageVisit({
      path: location.pathname,
      referrer: document.referrer || undefined,
    })
  }, [location.pathname])

  return null
}
