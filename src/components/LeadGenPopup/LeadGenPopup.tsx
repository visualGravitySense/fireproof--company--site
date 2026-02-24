import { useState, useEffect } from 'react'
import { LeadGenBlock } from '../LeadGenBlock/LeadGenBlock'

const STORAGE_KEY = 'leadGenPopupShown'

/** Exit intent popup — показывает блок аудита при попытке уйти с сайта */
export function LeadGenPopup() {
  const [show, setShow] = useState(false)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        const shown = sessionStorage.getItem(STORAGE_KEY)
        if (!shown) {
          setShow(true)
          setTriggered(true)
          sessionStorage.setItem(STORAGE_KEY, '1')
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [triggered])

  if (!show) return null

  return (
    <LeadGenBlock
      variant="popup"
      onClose={() => setShow(false)}
    />
  )
}
