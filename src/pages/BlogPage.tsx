import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BlogPage.css'
import { HiBookOpen } from '../utils/icons'
import { useLanguage } from '../contexts/LanguageContext'

function BlogPage() {
  const { t } = useLanguage()
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
      [t('blog.categories.guides')]: '📚',
      [t('blog.categories.news')]: '📰',
      [t('blog.categories.articles')]: '📝'
    }
    return icons[category] || '📄'
  }
  
  // Функция для получения переведенного названия категории
  const getCategoryTranslation = (categoryKey: string) => {
    const categoryMap: Record<string, string> = {
      'Руководства': t('blog.categories.guides'),
      'Новости': t('blog.categories.news'),
      'Статьи': t('blog.categories.articles')
    }
    return categoryMap[categoryKey] || categoryKey
  }

  const blogPosts = [
    {
      id: 1,
      slug: 'kak-vybrat-ognezashitnoe-pokrytie',
      title: 'Как выбрать огнезащитное покрытие для вашего здания',
      excerpt: 'Руководство по выбору правильного огнезащитного покрытия в зависимости от типа конструкции',
      date: '2025-01-15',
      category: 'Руководства',
      categoryKey: 'guides',
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
      categoryKey: 'news',
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
      categoryKey: 'articles',
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
      categoryKey: 'articles',
      views: 620,
      rating: 4.5,
      popular: false
    }
  ]

  // CREATE: ABILITY - Фильтрация постов
  const categories = [
    { key: 'all', label: t('blog.categories.all') },
    { key: 'guides', label: t('blog.categories.guides') },
    { key: 'news', label: t('blog.categories.news') },
    { key: 'articles', label: t('blog.categories.articles') }
  ]
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || 
      (selectedCategory === 'guides' && post.categoryKey === 'guides') ||
      (selectedCategory === 'news' && post.categoryKey === 'news') ||
      (selectedCategory === 'articles' && post.categoryKey === 'articles')
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
            <button 
              className="exit-close"
              onClick={() => setExitIntentDetected(false)}
              aria-label={t('blog.exitIntent.close')}
            >
              ×
            </button>
            <div className="exit-intent-header">
              <span className="exit-icon"><HiBookOpen /></span>
              <div>
                <strong>{t('blog.exitIntent.title')}</strong>
                <p>{t('blog.exitIntent.subtitle')}</p>
              </div>
            </div>
            <div className="exit-intent-articles">
              {blogPosts.slice(0, 2).map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="exit-article-card"
                  onClick={() => setExitIntentDetected(false)}
                >
                  <div className="article-card-content">
                    <span className="article-category">{getCategoryTranslation(post.category)}</span>
                    <h3>{post.title}</h3>
                    <p className="article-excerpt">{post.excerpt}</p>
                  </div>
                  <span className="article-arrow">→</span>
                </Link>
              ))}
            </div>
            <Link
              to="/blog"
              className="exit-view-all"
              onClick={() => setExitIntentDetected(false)}
            >
              {t('blog.exitIntent.viewAll')} →
            </Link>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="container">
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.subtitle')}</p>
        </div>
      </div>

      <div className="blog-content">
        <div className="container">
          {/* CREATE: ABILITY - Фильтры и поиск */}
          <div className="blog-filters">
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.key}
                  className={`category-filter ${selectedCategory === category.key || (!selectedCategory && category.key === 'all') ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.key === 'all' ? null : category.key)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="blog-search">
              <input
                type="text"
                placeholder={t('blog.search')}
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
              <span>{t('blog.popular')}</span>
            </div>
          )}

          {/* CREATE: EVALUATION - Результаты поиска */}
          {searchQuery && (
            <div className="search-results-info">
              {t('blog.searchResults')} <strong>{filteredPosts.length}</strong>
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
                    <span>{t('blog.popularBadge')}</span>
                  </div>
                )}

                {/* CREATE: REACTION - Trust Badge для категории */}
                <div className="blog-meta">
                  <span className="blog-category-badge">
                    <span className="category-icon">{getCategoryIcon(post.category)}</span>
                    <span>{getCategoryTranslation(post.category)}</span>
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
                    <span className="evaluation-label">{t('blog.evaluation.views')}</span>
                  </div>
                  <div className="evaluation-item">
                    <span className="evaluation-icon">⭐</span>
                    <span className="evaluation-value">{post.rating}</span>
                    <span className="evaluation-label">{t('blog.evaluation.rating')}</span>
                  </div>
                  <div className="evaluation-item">
                    <span className="evaluation-icon">⏱️</span>
                    <span className="evaluation-value">5</span>
                    <span className="evaluation-label">{t('blog.evaluation.readingTime')}</span>
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
                    <span>{t('blog.readMore')}</span>
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

