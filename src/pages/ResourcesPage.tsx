import { Link } from 'react-router-dom'
import './ResourcesPage.css'

function ResourcesPage() {
  const resources = [
    {
      title: 'Руководства по обслуживанию',
      description: 'Полезные руководства по обслуживанию огнезащитных покрытий',
      type: 'Руководство'
    },
    {
      title: 'Чеклисты пожарной безопасности',
      description: 'Чеклисты для проверки пожарной безопасности объекта',
      type: 'Чеклист'
    },
    {
      title: 'Нормативные документы',
      description: 'Актуальные нормативные документы и стандарты',
      type: 'Документ'
    },
    {
      title: 'FAQ',
      description: 'Часто задаваемые вопросы о противопожарной защите',
      type: 'FAQ'
    },
    {
      title: 'Глоссарий терминов',
      description: 'Определения терминов в области противопожарной защиты',
      type: 'Справочник'
    }
  ]

  return (
    <div className="resources-page">
      <div className="page-header">
        <div className="container">
          <h1>База знаний</h1>
          <p>Полезные ресурсы и материалы</p>
        </div>
      </div>

      <div className="resources-content">
        <div className="container">
          <div className="resources-grid">
            {resources.map((resource, idx) => (
              <div key={idx} className="resource-card">
                <div className="resource-type">{resource.type}</div>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <button className="btn btn-primary">Открыть</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage

