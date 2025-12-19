// EmailJS Configuration
// Замените эти значения на ваши данные из EmailJS
// Получить можно на https://www.emailjs.com/

export const EMAILJS_CONFIG = {
  // Public Key из EmailJS Dashboard
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  
  // Service ID из EmailJS Dashboard
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  
  // Template IDs из EmailJS Dashboard
  TEMPLATES: {
    // Шаблон для основной формы контактов
    CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT || 'YOUR_TEMPLATE_ID_CONTACT',
    
    // Шаблон для быстрой формы (Hero/CTA секции)
    QUICK_FORM: import.meta.env.VITE_EMAILJS_TEMPLATE_QUICK || 'YOUR_TEMPLATE_ID_QUICK',
    
    // Шаблон для консультации
    CONSULTATION: import.meta.env.VITE_EMAILJS_TEMPLATE_CONSULTATION || 'YOUR_TEMPLATE_ID_CONSULTATION'
  }
}

// Проверка конфигурации (только в development)
if (import.meta.env.DEV) {
  const hasConfig = EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
                    EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID'
  
  if (!hasConfig) {
    console.warn('⚠️ EmailJS не настроен. Пожалуйста, настройте переменные окружения в .env файле')
    console.warn('📝 Создайте файл .env и добавьте:')
    console.warn('   VITE_EMAILJS_PUBLIC_KEY=your_public_key')
    console.warn('   VITE_EMAILJS_SERVICE_ID=your_service_id')
    console.warn('   VITE_EMAILJS_TEMPLATE_CONTACT=your_template_id')
    console.warn('   VITE_EMAILJS_TEMPLATE_QUICK=your_template_id')
    console.warn('   VITE_EMAILJS_TEMPLATE_CONSULTATION=your_template_id')
  }
}

