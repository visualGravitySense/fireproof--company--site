import { Link } from 'react-router-dom'
import './ProjectsPage.css'

function ProjectsPage() {
  const categories = [
    {
      id: 'commercial',
      title: 'Коммерческие проекты',
      description: 'Огнезащита коммерческих зданий и объектов',
      count: 45
    },
    {
      id: 'industrial',
      title: 'Промышленные проекты',
      description: 'Комплексные решения для промышленных объектов',
      count: 35
    },
    {
      id: 'residential',
      title: 'Жилые проекты',
      description: 'Защита жилых зданий и комплексов',
      count: 20
    }
  ]

  return (
    <div className="projects-page">
      <div className="page-header">
        <div className="container">
          <h1>Наши проекты</h1>
          <p>100+ успешно реализованных проектов</p>
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
                <div className="project-count">{category.count} проектов</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="stats-section">
        <div className="container">
          <h2>Статистика проектов</h2>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">100+</div>
              <div className="stat-label">Проектов</div>
            </div>
            <div className="stat">
              <div className="stat-number">230,000</div>
              <div className="stat-label">м² обработанной площади</div>
            </div>
            <div className="stat">
              <div className="stat-number">20+</div>
              <div className="stat-label">лет опыта</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage

