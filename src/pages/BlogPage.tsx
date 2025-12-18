import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BlogPage.css'

function BlogPage() {
  // CREATE Action Funnel: State для улучшения UX
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [exitIntentDetected, setExitIntentDetected] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // CREATE: CUE - Прогресс-бар прокрутки
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // CREATE: TIMING - Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setExitIntentDetected(true)
        setTimeout(() => setExitIntentDetected(false), 5000)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  // Fogg: Helper функция для иконок категорий
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Руководства': '📚',
      'Новости': '📰',
      'Статьи': '📝'
    }
    return icons[category] || '📄'
  }

  const blogPosts = [
    {
      id: 1,
      slug: 'kak-vybrat-ognezashitnoe-pokrytie',
      title: 'Как выбрать огнезащитное покрытие для вашего здания',
      excerpt: 'Руководство по выбору правильного огнезащитного покрытия в зависимости от типа конструкции',
      date: '2025-01-15',
      category: 'Руководства',
      views: 1250,
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      slug: 'novye-trebovaniya-pozharnoy-bezopasnosti',
      title: 'Новые требования пожарной безопасности в Эстонии 2025',
      excerpt: 'Обзор новых нормативов и требований к противопожарной защите',
      date: '2025-01-10',
      category: 'Новости',
      views: 980,
      rating: 4.6,
      popular: true
    },
    {
      id: 3,
      slug: 'top-5-mifov-ob-ognezashite',
      title: 'Топ-5 мифов об огнезащите',
      excerpt: 'Развеиваем популярные мифы о противопожарной защите',
      date: '2025-01-05',
      category: 'Статьи',
      views: 750,
      rating: 4.7,
      popular: false
    },
    {
      id: 4,
      slug: 'ognezashita-vs-ognetushashie-sistemy',
      title: 'Огнезащита vs огнетушащие системы: что важнее?',
      excerpt: 'Сравнение активных и пассивных систем противопожарной защиты',
      date: '2024-12-28',
      category: 'Статьи',
      views: 620,
      rating: 4.5,
      popular: false
    }
  ]

  // CREATE: ABILITY - Фильтрация постов
  const categories = ['Все', 'Руководства', 'Новости', 'Статьи']
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || selectedCategory === 'Все' || post.category === selectedCategory
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="blog-page">
      {/* CREATE: CUE - Прогресс-бар прокрутки */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* CREATE: TIMING - Exit intent notification */}
      {exitIntentDetected && (
        <div className="exit-intent-notification">
          <div className="exit-intent-content">
            <span className="exit-icon">📚</span>
            <div>
              <strong>Не уходите!</strong>
              <p>У нас есть полезные статьи для вас</p>
            </div>
            <button 
              className="exit-close"
              onClick={() => setExitIntentDetected(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="container">
          <h1>Блог и база знаний</h1>
          <p>Экспертные статьи о противопожарной защите</p>
        </div>
      </div>

      <div className="blog-content">
        <div className="container">
          {/* CREATE: ABILITY - Фильтры и поиск */}
          <div className="blog-filters">
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter ${selectedCategory === category || (!selectedCategory && category === 'Все') ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category === 'Все' ? null : category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="blog-search">
              <input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          {/* CREATE: EVALUATION - Популярные статьи */}
          {!selectedCategory && !searchQuery && (
            <div className="popular-posts-banner">
              <span className="popular-icon">🔥</span>
              <span>Популярные статьи этой недели</span>
            </div>
          )}

          {/* CREATE: EVALUATION - Результаты поиска */}
          {searchQuery && (
            <div className="search-results-info">
              Найдено статей: <strong>{filteredPosts.length}</strong>
            </div>
          )}

          <div className="blog-grid">
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id} 
                className={`blog-card ${isVisible ? 'visible' : ''} ${post.popular ? 'popular' : ''}`}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* CREATE: CUE - Популярный бейдж */}
                {post.popular && (
                  <div className="popular-badge">
                    <span className="popular-badge-icon">🔥</span>
                    <span>Популярно</span>
                  </div>
                )}

                {/* CREATE: REACTION - Trust Badge для категории */}
                <div className="blog-meta">
                  <span className="blog-category-badge">
                    <span className="category-icon">{getCategoryIcon(post.category)}</span>
                    <span>{post.category}</span>
                  </span>
                  <span className="blog-date">
                    <span className="date-icon">📅</span>
                    <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                  </span>
                </div>

                {/* CREATE: REACTION - Заголовок с визуальным акцентом */}
                <h2 className="blog-title">{post.title}</h2>

                {/* CREATE: REACTION - Описание с улучшенной читаемостью */}
                <p className="blog-excerpt">{post.excerpt}</p>

                {/* CREATE: EVALUATION - Социальные доказательства */}
                <div className="blog-evaluation">
                  <div className="evaluation-item">
                    <span className="evaluation-icon">👁️</span>
                    <span className="evaluation-value">{post.views}</span>
                    <span className="evaluation-label">просмотров</span>
                  </div>
                  <div className="evaluation-item">
                    <span className="evaluation-icon">⭐</span>
                    <span className="evaluation-value">{post.rating}</span>
                    <span className="evaluation-label">рейтинг</span>
                  </div>
                  <div className="evaluation-item">
                    <span className="evaluation-icon">⏱️</span>
                    <span className="evaluation-value">5</span>
                    <span className="evaluation-label">мин чтения</span>
                  </div>
                </div>

                {/* CREATE: EXECUTION - CTA кнопка с визуальными подсказками */}
                <div className="blog-actions">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="read-more-btn"
                    onClick={() => {
                      // CREATE: EXECUTION - Отслеживание клика
                      console.log('Article clicked:', post.slug)
                    }}
                  >
                    <span className="btn-icon">📖</span>
                    <span>Читать далее</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

