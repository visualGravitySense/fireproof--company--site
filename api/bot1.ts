/**
 * Bot 1 — Fireproof: приём форм с сайта и отправка в Telegram
 * Сайт → fetch() → /api/bot1 → Telegram
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT1_TOKEN || '';

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendToTelegram(
  botToken: string,
  chatId: string | number,
  text: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      return { success: false, error: data.description || 'Failed to send' };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: 'Bot token not configured. Set TELEGRAM_BOT_TOKEN in Vercel.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { type, chatId, data } = body;

    if (!chatId) {
      return res.status(400).json({ error: 'chatId is required' });
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
        return res.status(400).json({ error: 'Invalid type' });
    }

    const result = await sendToTelegram(BOT_TOKEN, chatId, message);

    if (result.success) {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ error: result.error || 'Failed to send' });
  } catch (err) {
    console.error('bot1 error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
