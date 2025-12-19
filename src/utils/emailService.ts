import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs.config'

// Типы для данных форм
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface QuickFormData {
  name: string
  email: string
  phone?: string
  objectType?: string
}

// Результат отправки
export interface EmailResult {
  success: boolean
  message: string
}

/**
 * Инициализация EmailJS с Public Key
 */
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }
}

/**
 * Отправка основной формы контактов
 */
export const sendContactForm = async (data: ContactFormData): Promise<EmailResult> => {
  try {
    // Инициализация если еще не выполнена
    initEmailJS()

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Не указан',
      message: data.message,
      to_email: 'info@fireproof.ee',
      subject: `Новое сообщение с сайта от ${data.name}`,
      reply_to: data.email
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.CONTACT,
      templateParams
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Сообщение успешно отправлено!'
      }
    } else {
      throw new Error(`EmailJS вернул статус: ${response.status}`)
    }
  } catch (error) {
    console.error('Ошибка отправки формы контактов:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла ошибка при отправке сообщения'
    }
  }
}

/**
 * Отправка быстрой формы (Hero/CTA секции)
 */
export const sendQuickForm = async (data: QuickFormData): Promise<EmailResult> => {
  try {
    initEmailJS()

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Не указан',
      object_type: data.objectType || 'Не указан',
      to_email: 'info@fireproof.ee',
      subject: `Запрос на консультацию от ${data.name}`,
      reply_to: data.email
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.QUICK_FORM,
      templateParams
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Запрос на консультацию отправлен!'
      }
    } else {
      throw new Error(`EmailJS вернул статус: ${response.status}`)
    }
  } catch (error) {
    console.error('Ошибка отправки быстрой формы:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Произошла ошибка при отправке запроса'
    }
  }
}

/**
 * Отправка формы консультации
 */
export const sendConsultationForm = async (data: QuickFormData): Promise<EmailResult> => {
  // Используем тот же шаблон что и для быстрой формы, или отдельный
  return sendQuickForm(data)
}

