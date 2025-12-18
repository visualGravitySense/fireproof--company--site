import { useState, useEffect } from 'react'
import './ContactPage.css'

function ContactPage() {
  // Fogg Behavior Model: State для улучшения UX
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isVisible, setIsVisible] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fogg: ABILITY - Валидация полей
  const validateField = (name: string, value: string) => {
    let isValid = true
    switch (name) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        break
      case 'name':
        isValid = value.trim().length >= 2
        break
      case 'message':
        isValid = value.trim().length >= 10
        break
    }
    setFieldErrors(prev => ({ ...prev, [name]: !isValid }))
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Fogg: PROMPTS - Валидация в реальном времени
    if (fieldTouched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFieldTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Fogg: ABILITY - Валидация всех полей
    const allFieldsValid = Object.keys(formData).every(key => {
      if (key === 'phone') return true // телефон необязателен
      return validateField(key, formData[key as keyof typeof formData])
    })

    if (!allFieldsValid) {
      setFormStatus('error')
      return
    }

    setFormStatus('submitting')
    
    try {
      // В реальном приложении здесь будет отправка формы
      console.log('Form submitted:', formData)
      
      // Fogg: EXECUTION - Успешная отправка
      setFormStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setFieldTouched({})
      setFieldErrors({})
      
      setTimeout(() => {
        setFormStatus('idle')
      }, 5000)
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }
  }

  return (
    <div className="contact-page">
      {/* Fogg: MOTIVATION & PROMPTS - Hero блок с улучшениями */}
      <div className={`page-header contact-hero ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          {/* Fogg: MOTIVATION - Trust Badge */}
          <div className="contact-trust-badge">
            <span className="trust-icon">✓</span>
            <span>Быстрый ответ • Бесплатная консультация • Опытные эксперты</span>
          </div>

          <h1 className="contact-hero-title">Контакты</h1>
          <p className="contact-hero-subtitle">Свяжитесь с нами для консультации</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="contact-social-proof">
            <div className="proof-item">
              <span className="proof-icon">⚡</span>
              <span className="proof-text">Ответ в течение 24 часов</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">💰</span>
              <span className="proof-text">Бесплатная консультация</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">👥</span>
              <span className="proof-text">Опытные эксперты</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Fogg: MOTIVATION - Контактная информация с улучшениями */}
            <div className="contact-info">
              <h2 className="info-section-title">
                <span className="title-icon">📞</span>
                Контактная информация
              </h2>

              {/* Fogg: PROMPTS - Интерактивные контактные карточки */}
              <div className="info-items">
                <a href="mailto:info@fireproof.ee" className="info-card">
                  <div className="info-card-icon">✉️</div>
                  <div className="info-card-content">
                    <h3>Email</h3>
                    <p>info@fireproof.ee</p>
                  </div>
                  <div className="info-card-arrow">→</div>
                </a>

                <a href="tel:+372XXXXXXX" className="info-card">
                  <div className="info-card-icon">📱</div>
                  <div className="info-card-content">
                    <h3>Телефон</h3>
                    <p>+372 XXX XXXX</p>
                  </div>
                  <div className="info-card-arrow">→</div>
                </a>

                <div className="info-card">
                  <div className="info-card-icon">📍</div>
                  <div className="info-card-content">
                    <h3>Адрес</h3>
                    <p>Эстония, Таллинн</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">🕐</div>
                  <div className="info-card-content">
                    <h3>Рабочие часы</h3>
                    <p>Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* Fogg: MOTIVATION - Дополнительная информация */}
              <div className="contact-highlight">
                <span className="highlight-icon">💡</span>
                <div>
                  <strong>Нужна срочная консультация?</strong>
                  <p>Позвоните нам прямо сейчас</p>
                </div>
              </div>
            </div>

            {/* Fogg: ABILITY & PROMPTS - Улучшенная форма */}
            <div className="contact-form-wrapper">
              <h2 className="form-section-title">
                <span className="title-icon">✉️</span>
                Отправить сообщение
              </h2>

              {/* Fogg: PROMPTS - Статус формы */}
              {formStatus === 'success' && (
                <div className="form-status-message success">
                  <span className="status-icon">✓</span>
                  <span>Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-status-message error">
                  <span className="status-icon">⚠️</span>
                  <span>Пожалуйста, проверьте правильность заполнения полей.</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Fogg: ABILITY - Улучшенные поля формы */}
                <div className="form-group">
                  <label htmlFor="name">
                    Имя *
                    {fieldTouched.name && fieldErrors.name && (
                      <span className="field-error">Минимум 2 символа</span>
                    )}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldTouched.name && fieldErrors.name ? 'error' : fieldTouched.name && !fieldErrors.name ? 'valid' : ''}
                    />
                    {fieldTouched.name && !fieldErrors.name && formData.name && (
                      <span className="field-check">✓</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email *
                    {fieldTouched.email && fieldErrors.email && (
                      <span className="field-error">Некорректный email</span>
                    )}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldTouched.email && fieldErrors.email ? 'error' : fieldTouched.email && !fieldErrors.email ? 'valid' : ''}
                    />
                    {fieldTouched.email && !fieldErrors.email && formData.email && (
                      <span className="field-check">✓</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Сообщение *
                    {fieldTouched.message && fieldErrors.message && (
                      <span className="field-error">Минимум 10 символов</span>
                    )}
                  </label>
                  <div className="input-wrapper">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={500}
                      className={fieldTouched.message && fieldErrors.message ? 'error' : fieldTouched.message && !fieldErrors.message ? 'valid' : ''}
                    />
                    {fieldTouched.message && !fieldErrors.message && formData.message && (
                      <span className="field-check">✓</span>
                    )}
                  </div>
                  <div className="char-counter">
                    {formData.message.length} / 500 символов
                  </div>
                </div>

                {/* Fogg: PROMPTS - CTA кнопка с визуальными подсказками */}
                <button 
                  type="submit" 
                  className={`btn btn-primary btn-large contact-submit-btn ${formStatus === 'submitting' ? 'submitting' : ''}`}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className="btn-icon">⏳</span>
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📤</span>
                      <span>Отправить сообщение</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

