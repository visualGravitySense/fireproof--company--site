/**
 * Локальный сервер для тестирования бота
 * Запуск: npm run test:bot
 * Все сообщения выводятся в терминал
 */

import http from 'http';

const PORT = 3001;

function formatMessage(type, data) {
  const time = new Date().toLocaleString('et-EE', { timeZone: 'Europe/Tallinn' });
  switch (type) {
    case 'website_registration':
      return [
        '📝 Запрос на консультацию',
        `👤 Имя: ${data?.name ?? '—'}`,
        `📧 Email: ${data?.email ?? '—'}`,
        `📱 Телефон: ${data?.phone ?? '—'}`,
        `⏰ Время: ${time}`,
      ].join('\n');
    case 'contact_form':
      const msg = (data?.message || '').slice(0, 500);
      return [
        '✉️ Новое сообщение с сайта',
        `👤 Имя: ${data?.name ?? '—'}`,
        `📧 Email: ${data?.email ?? '—'}`,
        `📱 Телефон: ${data?.phone ?? '—'}`,
        `💬 Сообщение:\n${msg}`,
        `⏰ Время: ${time}`,
      ].join('\n');
    case 'feedback':
      return [
        '⭐ Новый отзыв',
        `📊 Оценка: ${data?.rating ?? 0}/5`,
        data?.comment ? `💬 Комментарий:\n${(data.comment || '').slice(0, 300)}` : '',
        `⏰ Время: ${time}`,
      ].filter(Boolean).join('\n');
    case 'help_click':
      return [
        '❓ Клик по кнопке помощи',
        `📍 Источник: ${data?.source ?? 'help'}`,
        `⏰ Время: ${time}`,
      ].join('\n');
    case 'button_click':
      return [
        '🖱️ Клик на сайте',
        `📍 Страница: ${data?.page ?? '—'}`,
        `🔘 Кнопка: ${data?.label ?? data?.id ?? '—'}`,
        data?.url ? `🔗 Ссылка: ${data.url}` : '',
        `⏰ Время: ${time}`,
      ].filter(Boolean).join('\n');
    case 'quick_contact':
      const contact = String(data?.contact ?? data?.message ?? '—').trim();
      return [
        '📩 Быстрый контакт',
        `💬 Email / Телефон / Вопрос:\n${contact.slice(0, 500)}`,
        `⏰ Время: ${time}`,
      ].join('\n');
    default:
      return `[${type}] ${JSON.stringify(data)}`;
  }
}

function printToTerminal(type, data, message) {
  const sep = '─'.repeat(50);
  console.log('\n' + sep);
  console.log('📤 BOT1 → Сообщение (тест)');
  console.log(sep);
  console.log(message);
  console.log(sep + '\n');
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/bot1') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, bot: 'fireproof-test', message: 'Test server - messages print to terminal' }));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/bot1') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { type, chatId, data } = JSON.parse(body || '{}');
      const message = formatMessage(type, data || {});
      printToTerminal(type, data, message);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      console.error('Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404).end();
});

function tryListen(port) {
  server.listen(port, () => {
    console.log(`\n🤖 Bot test server: http://localhost:${port}/api/bot1`);
    console.log('   Messages will print here. Set VITE_TELEGRAM_API_URL=http://localhost:' + port + '/api/bot1 for testing.\n');
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < 3010) {
      tryListen(port + 1);
    } else {
      throw err;
    }
  });
}
tryListen(PORT);
