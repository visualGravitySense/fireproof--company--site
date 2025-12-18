import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Прокручиваем страницу вверх при изменении маршрута
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Плавная прокрутка
    })
  }, [pathname])

  return null
}

export default ScrollToTop

