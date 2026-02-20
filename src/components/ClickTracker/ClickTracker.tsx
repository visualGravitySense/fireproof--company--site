import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { TelegramService } from '../../services/telegramService'

const CLICKABLE_SELECTORS = 'a[href], button, [role="button"], [data-track]'
const THROTTLE_MS = 1000
const IGNORE_SELECTORS = '[data-no-track], .feedback-close, .help-close, .form-close, .notification-close, .comparison-close'

function getClickableElement(target: EventTarget | null): HTMLElement | null {
  let el = target as HTMLElement
  while (el && el !== document.body) {
    if (el.matches?.(IGNORE_SELECTORS)) return null
    if (el.matches?.(CLICKABLE_SELECTORS)) return el
    el = el.parentElement
  }
  return null
}

function getLabel(el: HTMLElement): string {
  const trackLabel = el.getAttribute('data-track-label')
  if (trackLabel) return trackLabel.trim()

  const ariaLabel = el.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel.trim()

  const text = el.textContent?.trim()
  if (text && text.length < 100) return text

  const id = el.id || el.getAttribute('data-track')
  if (id) return id

  return el.tagName + (el.className ? '.' + String(el.className).split(' ')[0] : '')
}

function getUrl(el: HTMLElement): string | undefined {
  if (el.tagName === 'A') {
    const href = (el as HTMLAnchorElement).href
    if (href && !href.startsWith('javascript:')) return href
  }
  return undefined
}

export function ClickTracker() {
  const location = useLocation()
  const lastSent = useRef<number>(0)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = getClickableElement(e.target)
      if (!el) return

      const now = Date.now()
      if (now - lastSent.current < THROTTLE_MS) return

      const page = location.pathname || '/'
      const label = getLabel(el)
      const url = getUrl(el)

      if (!label || label.length < 2) return

      lastSent.current = now
      TelegramService.notifyButtonClick({
        id: el.id || el.getAttribute('data-track') || undefined,
        label,
        page,
        url,
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [location.pathname])

  return null
}
