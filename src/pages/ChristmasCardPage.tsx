import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ChristmasCardPage.css'
import { getStaticPath } from '../utils/paths'

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
          <h1>🎄 С Рождеством! 🎄</h1>
          <p>и наступающим Новым Годом!</p>
        </div>

        <div className="meme-section">
          <div className="meme-container">
            <div className="meme-title">Ваши конструкции в праздники:</div>
            <div className="meme-labels-row">
              <div className="meme-label">БЕЗ FireProof<br/>защиты</div>
              <div className="vs-text">VS</div>
              <div className="meme-label">С FireProof<br/>защитой</div>
            </div>
            <div className="meme-image-wrapper">
              <img 
                src={getStaticPath('/this-is-fine-meme.jpg')} 
                alt="This is Fine meme - сравнение БЕЗ и С FireProof защитой" 
                className="meme-image-full"
              />
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="message">
            <h2>Уважаемые партнёры!</h2>
            <p className="greeting-text">
              В преддверии новогодних праздников команда FireProof от всей души 
              поздравляет вас с Рождеством и наступающим Новым Годом!
            </p>
            <p className="greeting-text">
              Благодарим за доверие и плодотворное сотрудничество в уходящем году. 
              Вместе мы обеспечили надёжную защиту множества объектов, создавая 
              безопасное пространство для людей и бизнеса.
            </p>
          </div>

          <div className="fire-safety-message">
            <div className="safety-title">
              <span>🔥</span>
              <span>Безопасность превыше всего</span>
            </div>
            <p className="safety-text">
              В праздничные дни не забывайте о мерах пожарной безопасности: используйте 
              исправные гирлянды, не оставляйте без присмотра зажжённые свечи, будьте 
              внимательны при использовании фейерверков. Пусть праздники будут тёплыми и 
              безопасными!
            </p>
          </div>

          <div className="wishes">
            <p>
              Желаем вам в новом году крепкого здоровья, благополучия, новых достижений и 
              успешной реализации всех планов!
            </p>
            <p className="wishes-bold">
              Пусть 2026 год принесёт радость, процветание и будет полон ярких событий!
            </p>
          </div>

          <div className="signature">
            <p>С наилучшими пожеланиями,</p>
            <p className="team-name">Команда FireProof</p>
          </div>
        </div>

        <div className="footer">
          <div className="contact-info">
            <a href="tel:+37253442034" className="contact-item">📞 +372 5344 2034</a>
            <a href="mailto:info@fireproof.ee" className="contact-item">✉️ info@fireproof.ee</a>
            <a href="https://fireproof.ee" className="contact-item">🌐 fireproof.ee</a>
          </div>
          <p className="footer-tagline">
            Профессиональные решения в области противопожарной защиты
          </p>
          <Link to="/" className="cta-button">
            🏠 На главную страницу →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChristmasCardPage

