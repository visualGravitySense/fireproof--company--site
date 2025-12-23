import { useState, useEffect } from 'react'
import './ContactPage.css'
import { useLanguage } from '../contexts/LanguageContext'
import { sendContactForm, type ContactFormData } from '../utils/emailService'

function ContactPage() {
  const { t } = useLanguage()
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
      // Отправка формы через EmailJS
      const result = await sendContactForm(formData as ContactFormData)
      
      if (result.success) {
        // Fogg: EXECUTION - Успешная отправка
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setFieldTouched({})
        setFieldErrors({})
        
        setTimeout(() => {
          setFormStatus('idle')
        }, 5000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Form submission error:', error)
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
            <span>{t('contact.trustBadge')}</span>
          </div>

          <h1 className="contact-hero-title">{t('contact.title')}</h1>
          <p className="contact-hero-subtitle">{t('contact.subtitle')}</p>

          {/* Fogg: MOTIVATION - Социальные доказательства */}
          <div className="contact-social-proof">
            <div className="proof-item">
              <span className="proof-icon">⚡</span>
              <span className="proof-text">{t('contact.socialProof.fast')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">💰</span>
              <span className="proof-text">{t('contact.socialProof.free')}</span>
            </div>
            <div className="proof-item">
              <span className="proof-icon">👥</span>
              <span className="proof-text">{t('contact.socialProof.experts')}</span>
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
                {t('contact.info.title')}
              </h2>

              {/* Fogg: PROMPTS - Интерактивные контактные карточки */}
              <div className="info-items">
                <a href="mailto:info@fireproof.ee" className="info-card">
                  <div className="info-card-icon">✉️</div>
                  <div className="info-card-content">
                    <h3>{t('contact.info.email.title')}</h3>
                    <p>{t('contact.info.email.value')}</p>
                  </div>
                  <div className="info-card-arrow">→</div>
                </a>

                <div className="info-card phone-card">
                  <div className="info-card-icon">📱</div>
                  <div className="info-card-content">
                    <h3>{t('contact.info.phone.title')}</h3>
                    <div className="phone-numbers">
                      <a href="tel:+37253442034" className="phone-link">Leonid: +372 5344 2034</a>
                      <a href="tel:+37253442035" className="phone-link">Nikolai: +372 5344 2035</a>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">📍</div>
                  <div className="info-card-content">
                    <h3>{t('contact.info.address.title')}</h3>
                    <p>{t('contact.info.address.value')}</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-card-icon">🕐</div>
                  <div className="info-card-content">
                    <h3>{t('contact.info.workingHours.title')}</h3>
                    <p>{t('contact.info.workingHours.value')}</p>
                  </div>
                </div>
              </div>

              {/* Fogg: MOTIVATION - Дополнительная информация */}
              <div className="contact-highlight">
                <span className="highlight-icon">💡</span>
                <div>
                  <strong>{t('contact.highlight.title')}</strong>
                  <p>{t('contact.highlight.text')}</p>
                </div>
              </div>
            </div>

            {/* Fogg: ABILITY & PROMPTS - Улучшенная форма */}
            <div className="contact-form-wrapper">
              <h2 className="form-section-title">
                <span className="title-icon">✉️</span>
                {t('contact.form.title')}
              </h2>

              {/* Fogg: PROMPTS - Статус формы */}
              {formStatus === 'success' && (
                <div className="form-status-message success">
                  <span className="status-icon">✓</span>
                  <span>{t('contact.form.success')}</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-status-message error">
                  <span className="status-icon">⚠️</span>
                  <span>{t('contact.form.error')}</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Fogg: ABILITY - Улучшенные поля формы */}
                <div className="form-group">
                  <label htmlFor="name">
                    {t('contact.form.name')}
                    {fieldTouched.name && fieldErrors.name && (
                      <span className="field-error">{t('contact.form.errors.name')}</span>
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
                    {t('contact.form.email')}
                    {fieldTouched.email && fieldErrors.email && (
                      <span className="field-error">{t('contact.form.errors.email')}</span>
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
                  <label htmlFor="phone">{t('contact.form.phone')}</label>
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
                    {t('contact.form.message')}
                    {fieldTouched.message && fieldErrors.message && (
                      <span className="field-error">{t('contact.form.errors.message')}</span>
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
                    {formData.message.length} {t('contact.form.charCounter')}
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
                      <span>{t('contact.form.sending')}</span>
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📤</span>
                      <span>{t('contact.form.send')}</span>
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

