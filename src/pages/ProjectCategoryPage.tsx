import { useParams, Link } from 'react-router-dom'
import './ProjectCategoryPage.css'

function ProjectCategoryPage() {
  const { category } = useParams<{ category: string }>()

  const categoryNames: Record<string, string> = {
    commercial: 'Коммерческие проекты',
    industrial: 'Промышленные проекты',
    residential: 'Жилые проекты'
  }

  // Пример проектов (в реальном приложении будут загружаться из API)
  const projects = [
    {
      id: 1,
      title: 'Торговый центр в Таллинне',
      location: 'Таллинн, Эстония',
      area: '15,000 м²',
      materials: ['Firetherm', 'Promat'],
      description: 'Комплексная огнезащита торгового центра'
    },
    {
      id: 2,
      title: 'Офисное здание',
      location: 'Тарту, Эстония',
      area: '8,500 м²',
      materials: ['Firetherm'],
      description: 'Огнезащита офисного комплекса'
    }
  ]

  return (
    <div className="project-category-page">
      <div className="page-header">
        <div className="container">
          <Link to="/projects" className="back-link">← Назад к проектам</Link>
          <h1>{categoryNames[category || ''] || 'Проекты'}</h1>
        </div>
      </div>

      <div className="projects-list">
        <div className="container">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="placeholder-image">Фото проекта</div>
              </div>
              <div className="project-info">
                <h2>{project.title}</h2>
                <p className="project-location">{project.location}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  <div className="detail-item">
                    <strong>Площадь:</strong> {project.area}
                  </div>
                  <div className="detail-item">
                    <strong>Материалы:</strong> {project.materials.join(', ')}
                  </div>
                </div>
                <button className="btn btn-primary">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCategoryPage

