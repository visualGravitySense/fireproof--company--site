import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BlogPostPage.css'

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()

  // Fogg Behavior Model: State для улучшения UX
  const [isVisible, setIsVisible] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [readingTime, setReadingTime] = useState(5)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fogg: ABILITY - Прогресс чтения
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // В реальном приложении данные будут загружаться из API
  const post = {
    title: 'Как выбрать огнезащитное покрытие для вашего здания',
    date: '2025-01-15',
    category: 'Руководства',
    views: 1250,
    rating: 4.8,
    readingTime: 5,
    author: 'Эксперт Fire Proof',
    content: `
      <p>Выбор правильного огнезащитного покрытия - это критически важное решение для безопасности вашего здания.</p>
      <h3>Факторы выбора</h3>
      <ul>
        <li>Тип конструкции (бетон, дерево, сталь)</li>
        <li>Требуемый класс огнестойкости</li>
        <li>Условия эксплуатации</li>
        <li>Бюджет проекта</li>
      </ul>
      <p>Наши эксперты помогут вам выбрать оптимальное решение для вашего проекта.</p>
    `
  }

  return (
    <div className="blog-post-page">
      {/* Fogg: PROMPTS - Прогресс чтения */}
      <div className="reading-progress-bar">
        <div 
          className="reading-progress-fill" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Fogg: MOTIVATION & PROMPTS - Hero блок */}
      <div className={`page-header post-hero ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          {/* Fogg: PROMPTS - Навигация назад */}
          <Link to="/blog" className="back-link">
            <span className="back-icon">←</span>
            <span>Назад к блогу</span>
          </Link>

          {/* Fogg: MOTIVATION - Trust Badge */}
          <div className="post-trust-badge">
            <span className="trust-icon">✓</span>
            <span>Экспертная статья • Проверенная информация • Актуальные данные</span>
          </div>

          {/* Fogg: MOTIVATION - Метаданные с иконками */}
          <div className="post-meta">
            <span className="post-category">
              <span className="meta-icon">📚</span>
              {post.category}
            </span>
            <span className="post-date">
              <span className="meta-icon">📅</span>
              {new Date(post.date).toLocaleDateString('ru-RU')}
            </span>
            <span className="post-author">
              <span className="meta-icon">👤</span>
              {post.author}
            </span>
          </div>

          <h1 className="post-hero-title">{post.title}</h1>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="post-social-proof">
            <div className="proof-item">
              <span className="proof-icon">👁️</span>
              <span className="proof-value">{post.views.toLocaleString()}</span>
              <span className="proof-label">просмотров</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">⭐</span>
              <span className="proof-value">{post.rating}</span>
              <span className="proof-label">рейтинг</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">⏱️</span>
              <span className="proof-value">{post.readingTime}</span>
              <span className="proof-label">мин чтения</span>
            </div>
          </div>
        </div>
      </div>

      <article className="post-content">
        <div className="container">
          <div className="post-layout">
            {/* Fogg: ABILITY - Боковая панель с навигацией */}
            <aside className="post-sidebar">
              <div className="sidebar-sticky">
                {/* Fogg: PROMPTS - Быстрые действия */}
                <div className="sidebar-section">
                  <h3 className="sidebar-title">
                    <span className="sidebar-icon">⚡</span>
                    Быстрые действия
                  </h3>
                  <Link to="/contact" className="sidebar-cta primary">
                    <span className="cta-icon">📞</span>
                    <span>Получить консультацию</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                  <Link to="/services" className="sidebar-cta secondary">
                    <span className="cta-icon">🔧</span>
                    <span>Наши услуги</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                </div>

                {/* Fogg: MOTIVATION - Дополнительная информация */}
                <div className="sidebar-section">
                  <h3 className="sidebar-title">
                    <span className="sidebar-icon">💡</span>
                    Полезная информация
                  </h3>
                  <div className="info-card">
                    <span className="info-icon">📋</span>
                    <div>
                      <strong>Нужна помощь?</strong>
                      <p>Наши эксперты готовы ответить на ваши вопросы</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Fogg: ABILITY - Основной контент */}
            <div className="post-main">
              <div 
                className="post-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Fogg: PROMPTS - CTA секция */}
              <div className="post-cta-section">
                <div className="cta-content">
                  <h3 className="cta-title">
                    <span className="cta-title-icon">🎯</span>
                    Нужна помощь в выборе?
                  </h3>
                  <p className="cta-description">
                    Наши эксперты помогут вам выбрать оптимальное огнезащитное покрытие для вашего проекта
                  </p>
                  <div className="cta-actions">
                    <Link to="/contact" className="cta-btn primary">
                      <span className="btn-icon">📞</span>
                      <span>Получить консультацию</span>
                      <span className="btn-arrow">→</span>
                    </Link>
                    <Link to="/services" className="cta-btn secondary">
                      <span className="btn-icon">🔍</span>
                      <span>Узнать больше</span>
                      <span className="btn-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Fogg: PROMPTS - Навигация к другим статьям */}
              <div className="post-navigation">
                <Link to="/blog" className="nav-link">
                  <span className="nav-icon">←</span>
                  <span>Вернуться к блогу</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPostPage

