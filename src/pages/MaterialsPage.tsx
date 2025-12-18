import { Link, useParams } from 'react-router-dom'
import './MaterialsPage.css'

function MaterialsPage() {
  const { material } = useParams<{ material?: string }>()

  const materials = [
    {
      id: 'firetherm',
      name: 'Firetherm',
      description: 'Высококачественные огнезащитные материалы для бетонных конструкций',
      features: ['Высокая огнестойкость', 'Долговечность', 'Сертификация']
    },
    {
      id: 'normaali',
      name: 'Normaali',
      description: 'Надежные решения для противопожарной защиты',
      features: ['Проверенное качество', 'Широкое применение', 'Сертификация']
    },
    {
      id: 'promat',
      name: 'Promat',
      description: 'Инновационные огнезащитные материалы премиум-класса',
      features: ['Инновации', 'Высокая эффективность', 'Международные стандарты']
    }
  ]

  if (material) {
    const materialData = materials.find(m => m.id === material)
    if (!materialData) {
      return (
        <div className="materials-page">
          <div className="page-header">
            <div className="container">
              <Link to="/materials" className="back-link">← Назад к материалам</Link>
              <h1>Материал не найден</h1>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="materials-page">
        <div className="page-header">
          <div className="container">
            <Link to="/materials" className="back-link">← Назад к материалам</Link>
            <h1>{materialData.name}</h1>
            <p>{materialData.description}</p>
          </div>
        </div>
        <div className="material-detail">
          <div className="container">
            <h2>Характеристики</h2>
            <ul>
              {materialData.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="materials-page">
      <div className="page-header">
        <div className="container">
          <h1>Материалы</h1>
          <p>Сертифицированные материалы премиум-класса</p>
        </div>
      </div>

      <div className="materials-content">
        <div className="container">
          <div className="materials-grid">
            {materials.map(mat => (
              <Link key={mat.id} to={`/materials/${mat.id}`} className="material-card">
                <h2>{mat.name}</h2>
                <p>{mat.description}</p>
                <div className="material-features">
                  {mat.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="read-more">Подробнее →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaterialsPage

