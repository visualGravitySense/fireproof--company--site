/**
 * Общая логика отправки сообщений в Telegram
 * Используется всеми ботами в проекте
 */

const TELEGRAM_API = 'https://api.telegram.org';

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendTelegramMessage(
  botToken: string,
  chatId: string | number,
  text: string,
  parseMode: 'HTML' = 'HTML'
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return { success: false, error: data.description || 'Failed to send' };
    }
    return { success: true };
  } catch (err) {
    console.error('Telegram send error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
