/**
 * Bot 1 — Fireproof: приём форм с сайта и отправка в Telegram
 * Деплой: Vercel (отдельно или вместе с другими ботами)
 *
 * Сайт (GitHub Pages) → fetch() → /api/bot1 → Telegram
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendTelegramMessage, escapeHtml } from '../lib/telegram';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT1_TOKEN || '';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN or BOT1_TOKEN not set');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  try {
    const { type, chatId, data } = (req.body || {}) as {
      type: string;
      chatId: string;
      data: Record<string, unknown>;
    };

    if (!chatId) {
      return res.status(400).json({ error: 'Chat ID is required' });
    }

    const time = new Date().toLocaleString('et-EE', { timeZone: 'Europe/Tallinn' });
    let message = '';

    switch (type) {
      case 'website_registration':
        message = [
          '📝 <b>Запрос на консультацию</b>',
          `👤 <b>Имя:</b> ${escapeHtml(String(data?.name ?? '—'))}`,
          `📧 <b>Email:</b> ${escapeHtml(String(data?.email ?? '—'))}`,
          `📱 <b>Телефон:</b> ${escapeHtml(String(data?.phone ?? '—'))}`,
          `⏰ <b>Время:</b> ${time}`,
        ].join('\n');
        break;

      case 'contact_form':
        const msg = typeof data?.message === 'string' ? data.message : '';
        const msgSafe = msg.length > 500 ? msg.slice(0, 500) + '...' : msg;
        message = [
          '✉️ <b>Новое сообщение с сайта</b>',
          `👤 <b>Имя:</b> ${escapeHtml(String(data?.name ?? '—'))}`,
          `📧 <b>Email:</b> ${escapeHtml(String(data?.email ?? '—'))}`,
          `📱 <b>Телефон:</b> ${escapeHtml(String(data?.phone ?? '—'))}`,
          `💬 <b>Сообщение:</b>\n${escapeHtml(msgSafe)}`,
          `⏰ <b>Время:</b> ${time}`,
        ].join('\n');
        break;

      case 'feedback':
        const rating = Number(data?.rating) || 0;
        const comment = typeof data?.comment === 'string' ? data.comment : '';
        const commentSafe = comment.length > 300 ? comment.slice(0, 300) + '...' : comment;
        message = [
          '⭐ <b>Новый отзыв</b>',
          `📊 <b>Оценка:</b> ${rating}/5`,
          commentSafe ? `💬 <b>Комментарий:</b>\n${escapeHtml(commentSafe)}` : '',
          `⏰ <b>Время:</b> ${time}`,
        ]
          .filter(Boolean)
          .join('\n');
        break;

      case 'help_click':
        message = [
          '❓ <b>Клик по кнопке помощи</b>',
          `📍 <b>Источник:</b> ${escapeHtml(String(data?.source ?? 'help'))}`,
          `⏰ <b>Время:</b> ${time}`,
        ].join('\n');
        break;

      default:
        return res.status(400).json({ error: 'Invalid notification type' });
    }

    const result = await sendTelegramMessage(BOT_TOKEN, chatId, message);

    if (result.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ error: result.error || 'Failed to send notification' });
  } catch (err) {
    console.error('bot1 error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
