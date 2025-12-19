import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ChristmasCardPage.css'
import { HiFire, HiPhone, HiEnvelope, HiHome, HiArrowRight } from '../utils/icons'

interface Snowflake {
  id: number
  left: number
  duration: number
  size: number
  opacity: number
}

function ChristmasCardPage() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    // Создание снежинок каждые 200мс
    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newFlake: Snowflake = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          duration: Math.random() * 3 + 5,
          size: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.6 + 0.4
        }
        
        // Удаляем старые снежинки после 8 секунд
        setTimeout(() => {
          setSnowflakes(current => current.filter(f => f.id !== newFlake.id))
        }, 8000)

        return [...prev, newFlake]
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="christmas-card-page">
      {/* Снежинки */}
      {snowflakes.map(snowflake => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{
            left: `${snowflake.left}%`,
            animationDuration: `${snowflake.duration}s`,
            fontSize: `${snowflake.size}em`,
            opacity: snowflake.opacity
          }}
        >
          ❄
        </div>
      ))}

      <div className="card">
        <div className="card-header">
          <img 
            src="/fp-logo-wh-1.svg" 
            alt="FireProof Logo" 
            className="logo"
          />
          <h1>🎄 С Рождеством! 🎄</h1>
          <p>и Наступающим Новым Годом!</p>
        </div>

        <div className="card-body">
          <div className="message">
            <h2>Уважаемые партнёры!</h2>
            <p>
              В преддверии новогодних праздников команда FireProof от всей души поздравляет вас 
              с Рождеством и наступающим Новым Годом!
            </p>
            <p>
              Благодарим за доверие и плодотворное сотрудничество в уходящем году. 
              Вместе мы обеспечили надёжную защиту множества объектов, создавая 
              безопасное пространство для людей и бизнеса.
            </p>
          </div>

          <div className="fire-safety-message">
            <h3>
              <span className="icon"><HiFire /></span>
              Безопасность превыше всего
            </h3>
            <p>
              В праздничные дни не забывайте о мерах пожарной безопасности: 
              используйте исправные гирлянды, не оставляйте без присмотра зажжённые свечи, 
              будьте внимательны при использовании фейерверков. Пусть праздники будут тёплыми и безопасными!
            </p>
          </div>

          <div className="message">
            <p>
              Желаем вам в новом году крепкого здоровья, благополучия, новых достижений 
              и успешной реализации всех планов!
            </p>
            <p>
              Пусть 2026 год принесёт радость, процветание и будет полон ярких событий!
            </p>
          </div>

          <div className="signature">
            С наилучшими пожеланиями,
            <strong>Команда FireProof</strong>
          </div>
        </div>

        <div className="footer">
          <div className="contact-info">
            <div className="contact-item">
              <HiPhone /> <a href="tel:+37253442034">+372 5344 2034</a>
            </div>
            <div className="contact-item">
              <HiEnvelope /> <a href="mailto:info@fireproof.ee">info@fireproof.ee</a>
            </div>
            <div className="contact-item">
              <HiHome /> <a href="https://fireproof.ee" target="_blank" rel="noopener noreferrer">fireproof.ee</a>
            </div>
          </div>
          <p className="footer-tagline">
            Профессиональные решения в области противопожарной защиты
          </p>
        </div>
        
        <div className="back-to-home">
          <Link to="/" className="home-button">
            <HiHome />
            <span>На главную страницу</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChristmasCardPage

