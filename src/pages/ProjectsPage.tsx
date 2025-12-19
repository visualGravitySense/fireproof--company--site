import { Link } from 'react-router-dom'
import './ProjectsPage.css'
import { useLanguage } from '../contexts/LanguageContext'

function ProjectsPage() {
  const { t } = useLanguage()
  const categories = [
    {
      id: 'commercial',
      title: t('home.projectsPage.categories.commercial.title'),
      description: t('home.projectsPage.categories.commercial.description'),
      count: 45
    },
    {
      id: 'industrial',
      title: t('home.projectsPage.categories.industrial.title'),
      description: t('home.projectsPage.categories.industrial.description'),
      count: 35
    },
    {
      id: 'residential',
      title: t('home.projectsPage.categories.residential.title'),
      description: t('home.projectsPage.categories.residential.description'),
      count: 20
    }
  ]

  return (
    <div className="projects-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('home.projectsPage.title')}</h1>
          <p>{t('home.projectsPage.subtitle')}</p>
        </div>
      </div>

      <div className="projects-categories">
        <div className="container">
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/projects/${category.id}`}
                className="category-card"
              >
                <h2>{category.title}</h2>
                <p>{category.description}</p>
                <div className="project-count">{category.count} {t('home.projectsPage.categories.commercial.count')}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="stats-section">
        <div className="container">
          <h2>{t('home.projectsPage.stats.title')}</h2>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">100+</div>
              <div className="stat-label">{t('home.projectsPage.stats.projects')}</div>
            </div>
            <div className="stat">
              <div className="stat-number">230,000</div>
              <div className="stat-label">{t('home.projectsPage.stats.area')}</div>
            </div>
            <div className="stat">
              <div className="stat-number">20+</div>
              <div className="stat-label">{t('home.projectsPage.stats.years')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage

