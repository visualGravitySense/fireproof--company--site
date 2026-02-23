// Сервис отправки уведомлений в Telegram
// Использует API route для безопасности токена бота

const ADMIN_CHAT_ID = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID || '';

// На Vercel: /api/bot1 (тот же домен). На GitHub Pages: полный URL Vercel API
// Fallback: fireproof-site.vercel.app (имя репо). Иначе задайте VITE_TELEGRAM_API_URL в GitHub Secrets
const API_URL = import.meta.env.VITE_TELEGRAM_API_URL
  || (import.meta.env.PROD ? 'https://fireproof-site.vercel.app/api/bot1' : '/api/bot1');

type NotifyType =
  | 'website_registration'
  | 'contact_form'
  | 'feedback'
  | 'help_click'
  | 'button_click'
  | 'quick_contact'
  | 'page_visit'
  | 'form_abandoned'
  | 'cta_reached';

export class TelegramService {
  private static async send(type: NotifyType, data: Record<string, unknown>): Promise<boolean> {
    if (!ADMIN_CHAT_ID) {
      console.warn('VITE_TELEGRAM_ADMIN_CHAT_ID не задан, уведомление в Telegram пропущено');
      return false;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, chatId: ADMIN_CHAT_ID, data }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error('Telegram API error:', result, '| URL:', API_URL);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      console.error('API URL:', API_URL, '(проверьте VITE_TELEGRAM_API_URL и CORS на Vercel)');
      return false;
    }
  }

  /** Быстрая форма (имя, email, телефон) */
  static async notifyQuickForm(data: {
    name: string;
    email: string;
    phone?: string;
    objectType?: string;
  }): Promise<boolean> {
    return this.send('website_registration', data);
  }

  /** Полная контактная форма с сообщением */
  static async notifyContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<boolean> {
    return this.send('contact_form', data);
  }

  /** Отзыв/обратная связь */
  static async notifyFeedback(data: {
    rating: number;
    comment?: string;
  }): Promise<boolean> {
    return this.send('feedback', data);
  }

  /** Клик по кнопке помощи */
  static async notifyHelpClick(): Promise<boolean> {
    return this.send('help_click', {
      source: 'help_button',
      timestamp: new Date().toISOString(),
    });
  }

  /** Клик по кнопке/ссылке на сайте */
  static async notifyButtonClick(data: {
    id?: string;
    label: string;
    page: string;
    url?: string;
  }): Promise<boolean> {
    return this.send('button_click', data);
  }

  /** Быстрый контакт: email, телефон или вопрос (одно поле) */
  static async notifyQuickContact(contact: string): Promise<boolean> {
    return this.send('quick_contact', { contact });
  }

  /** Посещение сайта (при загрузке страницы) */
  static async notifyPageVisit(data?: { path?: string; referrer?: string }): Promise<boolean> {
    const path = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
    const referrer = typeof document !== 'undefined' ? document.referrer || undefined : undefined;
    return this.send('page_visit', {
      path: data?.path ?? path,
      referrer: data?.referrer ?? referrer,
    });
  }

  /** Пользователь доскроллил до CTA — считаем охват */
  static async notifyCtaReached(data?: { path?: string; scrollProgress?: number }): Promise<boolean> {
    const path = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
    return this.send('cta_reached', {
      path: data?.path ?? path,
      scrollProgress: data?.scrollProgress,
    });
  }

  /** Время на странице — при уходе или смене вкладки */
  static async notifyTimeOnPage(data: { path: string; timeSec: number }): Promise<boolean> {
    return this.send('time_on_page', data);
  }

  /** sendBeacon для надёжной отправки при закрытии вкладки */
  static sendBeaconTimeOnPage(data: { path: string; timeSec: number }): boolean {
    if (!ADMIN_CHAT_ID) return false;
    try {
      const body = JSON.stringify({
        type: 'time_on_page',
        chatId: ADMIN_CHAT_ID,
        data,
      });
      return navigator.sendBeacon(API_URL, new Blob([body], { type: 'application/json' }));
    } catch {
      return false;
    }
  }

  /** Форма открыта, но не отправлена — для follow-up */
  static async notifyFormAbandoned(data: {
    source: 'hero' | 'cta';
    name?: string;
    email?: string;
    phone?: string;
    objectType?: string;
    fieldsFilled?: number;
    scrollProgress?: number;
    timeOpenSec?: number;
  }): Promise<boolean> {
    return this.send('form_abandoned', data);
  }
}
