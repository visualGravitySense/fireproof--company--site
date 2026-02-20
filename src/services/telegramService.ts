// Сервис отправки уведомлений в Telegram
// Использует API route для безопасности токена бота

const ADMIN_CHAT_ID = import.meta.env.VITE_TELEGRAM_ADMIN_CHAT_ID || '';
const API_URL = import.meta.env.VITE_TELEGRAM_API_URL || '/api/bot1';

type NotifyType =
  | 'website_registration'
  | 'contact_form'
  | 'feedback'
  | 'help_click'
  | 'button_click'
  | 'quick_contact';

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
        console.error('Telegram API error:', result);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
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
}
