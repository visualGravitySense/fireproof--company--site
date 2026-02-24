import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { TelegramService } from '../../services/telegramService'
import { HiCheck, HiMapPin } from '../../utils/icons'
import './LeadGenBlock.css'

const BENEFITS = [
  'leadGen.benefits.visit',
  'leadGen.benefits.inspection',
  'leadGen.benefits.issues',
  'leadGen.benefits.plan',
] as const

interface LeadGenBlockProps {
  variant?: 'block' | 'popup'
  onClose?: () => void
}

export function LeadGenBlock({ variant = 'block', onClose }: LeadGenBlockProps) {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', objectType: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => sectionRef.current && observer.unobserve(sectionRef.current)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const ok = await TelegramService.notifyQuickForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        objectType: formData.objectType || undefined,
      })
      if (ok) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', objectType: '' })
        setShowForm(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 3000)
  }

  const isPopup = variant === 'popup'

  return (
    <section
      ref={sectionRef}
      className={`lead-gen-block ${isPopup ? 'lead-gen-popup' : ''} ${isVisible ? 'visible' : ''}`}
      role="region"
      aria-label={t('leadGen.title')}
    >
      <div className="lead-gen-inner">
        {isPopup && onClose && (
          <button
            type="button"
            className="lead-gen-close"
            onClick={onClose}
            aria-label={t('leadGen.close')}
          >
            ×
          </button>
        )}

        <div className="lead-gen-content">
          <div className="lead-gen-badge">
            <span className="lead-gen-badge-icon">📋</span>
            <span>{t('leadGen.badge')}</span>
          </div>
          <h2 className="lead-gen-title">{t('leadGen.title')}</h2>
          <ul className="lead-gen-benefits">
            {BENEFITS.map((key, i) => (
              <li key={i}>
                <span className="lead-gen-check"><HiCheck /></span>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
          <div className="lead-gen-location">
            <span className="lead-gen-location-icon" aria-hidden>📍</span>
            <span>{t('leadGen.location')}</span>
          </div>

          {!showForm ? (
            <>
              <button
                type="button"
                className="lead-gen-cta"
                onClick={() => setShowForm(true)}
              >
                <span>{t('leadGen.cta')}</span>
                <span className="lead-gen-cta-arrow">→</span>
              </button>
              <p className="lead-gen-note">{t('leadGen.note')}</p>
            </>
          ) : (
            <form className="lead-gen-form" onSubmit={handleSubmit}>
              {status === 'success' && (
                <div className="lead-gen-success">{t('contact.form.success')}</div>
              )}
              {status === 'error' && (
                <div className="lead-gen-error">{t('contact.form.error')}</div>
              )}
              <input
                type="text"
                placeholder={t('home.hero.form.namePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="lead-gen-input"
              />
              <input
                type="tel"
                placeholder={t('home.hero.form.phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="lead-gen-input"
              />
              <input
                type="email"
                placeholder={t('home.hero.form.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="lead-gen-input"
              />
              <select
                className="lead-gen-input"
                value={formData.objectType}
                onChange={(e) => setFormData({ ...formData, objectType: e.target.value })}
                aria-label={t('home.hero.form.objectType')}
              >
                <option value="">{t('home.hero.form.objectType')}</option>
                <option value="residential">{t('home.hero.form.objectTypeResidential')}</option>
                <option value="commercial">{t('home.hero.form.objectTypeCommercial')}</option>
                <option value="industrial">{t('home.hero.form.objectTypeIndustrial')}</option>
              </select>
              <button
                type="submit"
                className="lead-gen-cta lead-gen-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? t('leadGen.sending') : t('leadGen.cta')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
