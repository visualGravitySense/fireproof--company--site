// Vercel Serverless Function for sending Telegram notifications
// This avoids CORS issues and keeps the bot token secure

import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}

async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  parseMode: 'HTML' | 'Markdown' | 'MarkdownV2' = 'HTML'
): Promise<{ success: boolean; error?: string }> {
  try {
    const message: TelegramMessage = {
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    };

    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return { success: false, error: data.description || 'Failed to send message' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, chatId, data } = req.body;

    if (!chatId) {
      return res.status(400).json({ error: 'Chat ID is required' });
    }

    let message = '';

    switch (type) {
      case 'new_user':
        message = `
🆕 <b>New User Registered</b>

👤 <b>Name:</b> ${data.name || 'Not provided'}
📧 <b>Email:</b> ${data.email || 'Not provided'}
📱 <b>Phone:</b> ${data.phone || 'Not provided'}
😰 <b>Anxiety Level:</b> ${data.anxietyLevel ? `${data.anxietyLevel}/5` : 'Not set'}

⏰ <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
        `.trim();
        break;

      case 'website_registration':
        message = `
📝 <b>Registratsioon veebilehel</b>

👤 <b>Nimi:</b> ${data?.name ?? 'Not provided'}
📧 <b>Email:</b> ${data?.email ?? 'Not provided'}
📱 <b>Telefon:</b> ${data?.phone ?? 'Not provided'}

⏰ <b>Aeg:</b> ${new Date().toLocaleString('et-EE', { timeZone: 'Europe/Tallinn' })}
        `.trim();
        break;

      case 'lesson_booking':
        const lessonTypeEmoji = data.type === 'theory' ? '📚' : '🚗';
        const lessonTypeText = data.type === 'theory' ? 'Theory' : 'Practice';
        message = `
📅 <b>New Lesson Booking</b>

👤 <b>Student:</b> ${data.userName || 'Not provided'}
📧 <b>Email:</b> ${data.userEmail || 'Not provided'}
👨‍🏫 <b>Instructor:</b> ${data.instructorName}
${lessonTypeEmoji} <b>Type:</b> ${lessonTypeText}
📆 <b>Date:</b> ${data.date}
🕐 <b>Time:</b> ${data.time}

⏰ <b>Booked at:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
        `.trim();
        break;

      case 'support_message':
        const anxietyEmoji = data.anxietyLevel
          ? data.anxietyLevel >= 4
            ? '🔴'
            : data.anxietyLevel >= 3
            ? '🟡'
            : '🟢'
          : '⚪';
        const messageText = data.messageText.length > 500
          ? data.messageText.substring(0, 500) + '...'
          : data.messageText;
        message = `
💬 <b>New Support Request</b>

👤 <b>Student:</b> ${data.userName || 'Not provided'}
📧 <b>Email:</b> ${data.userEmail || 'Not provided'}
${anxietyEmoji} <b>Anxiety Level:</b> ${data.anxietyLevel ? `${data.anxietyLevel}/5` : 'Not set'}

💭 <b>Message:</b>
${messageText}

⏰ <b>Sent at:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Tallinn' })}
        `.trim();
        break;

      default:
        return res.status(400).json({ error: 'Invalid notification type' });
    }

    const result = await sendTelegramMessage(chatId, message, 'HTML');

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: result.error || 'Failed to send notification' });
    }
  } catch (error) {
    console.error('Error in telegram-notify handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
