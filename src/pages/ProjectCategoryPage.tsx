import { useParams, Link } from 'react-router-dom'
import './ProjectCategoryPage.css'
import { getStaticPath } from '../utils/paths'

function ProjectCategoryPage() {
  const { category } = useParams<{ category: string }>()

  const categoryNames: Record<string, string> = {
    commercial: 'Коммерческие проекты',
    industrial: 'Промышленные проекты',
    residential: 'Жилые проекты'
  }

  // Проекты по категориям
  const allProjects: Record<string, Array<{
    id: number
    title: string
    location: string
    area?: string
    materials?: string[]
    description?: string
    image?: string
    category: string
  }>> = {
    commercial: [
      {
        id: 1,
        title: 'Hilton Tallinn Park',
        location: 'Tallinn, Estonia',
        area: '12,000 м²',
        materials: ['Firetherm', 'Promat'],
        description: 'Огнезащита премиум отеля',
        category: 'commercial',
        image: '/hilton_tallinn_park.jpg'
      },
      {
        id: 2,
        title: 'Viimsi Keskus',
        location: 'Tallinn, Estonia',
        area: '18,500 м²',
        materials: ['Firetherm', 'Normaali'],
        description: 'Комплексная огнезащита торгового центра',
        category: 'commercial',
        image: '/viimsi_keskus.jpg'
      },
      {
        id: 3,
        title: 'Magistrali Keskus',
        location: 'Tallinn, Estonia',
        area: '15,000 м²',
        materials: ['Firetherm', 'Promat'],
        description: 'Огнезащита крупного торгового комплекса',
        category: 'commercial',
        image: '/magistrali_keskus.jpg'
      },
      {
        id: 4,
        title: 'Rotermani Kvartal',
        location: 'Tallinn, Estonia',
        area: '22,000 м²',
        materials: ['Firetherm', 'Promat', 'Normaali'],
        description: 'Комплексная огнезащита торгово-офисного квартала',
        category: 'commercial',
        image: '/rotermanni_kvartal.jpg'
      }
    ],
    residential: [
      {
        id: 5,
        title: 'Elamu Mustamael',
        location: 'Tallinn, Estonia',
        area: '8,500 м²',
        materials: ['Firetherm'],
        description: 'Огнезащита жилого комплекса',
        category: 'residential',
        image: '/elamu_mustamael.jpg'
      }
    ],
    industrial: [
      {
        id: 6,
        title: 'Eesti Energia elektrijaam',
        location: 'Ida-Virumaa, Estonia',
        area: '45,000 м²',
        materials: ['Firetherm', 'Promat'],
        description: 'Огнезащита промышленного энергетического объекта',
        category: 'industrial',
        image: '/eesti_energia.jpg'
      }
    ]
  }

  const projects = allProjects[category || 'commercial'] || []

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
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {project.image ? (
                    <img 
                      src={project.image ? getStaticPath(project.image) : ''} 
                      alt={project.title}
                      width={400}
                      height={250}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const placeholder = target.nextElementSibling as HTMLElement
                        if (placeholder) placeholder.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div 
                    className="placeholder-image" 
                    style={{ display: project.image ? 'none' : 'flex' }}
                  >
                    <div className="placeholder-icon">🏗️</div>
                  </div>
                </div>
                <div className="project-info">
                  <p className="project-location">{project.location}</p>
                  <h2>{project.title}</h2>
                  <div className="project-underline"></div>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  {project.area && (
                    <div className="project-details">
                      <div className="detail-item">
                        <strong>Площадь:</strong> {project.area}
                      </div>
                      {project.materials && project.materials.length > 0 && (
                        <div className="detail-item">
                          <strong>Материалы:</strong> {project.materials.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCategoryPage

