/**
 * Отправка тестового сообщения на локальный бот
 * Запуск: npm run test:bot:send
 * (Сначала в другом терминале: npm run test:bot)
 */

const API = process.env.BOT_API || (async () => {
  for (let p = 3001; p <= 3010; p++) {
    try {
      const r = await fetch(`http://localhost:${p}/api/bot1`, { method: 'GET' });
      if (r.ok) return `http://localhost:${p}/api/bot1`;
    } catch (_) {}
  }
  return 'http://localhost:3001/api/bot1';
})();

const tests = [
  { type: 'help_click', data: { source: 'test-script' } },
  { type: 'button_click', data: { page: '/', label: 'Бесплатная консультация', url: '/contact' } },
  { type: 'website_registration', data: { name: 'Test User', email: 'test@test.ee', phone: '+372 5000000' } },
  { type: 'feedback', data: { rating: 5, comment: 'Test feedback' } },
];

async function send(type, data, api) {
  const res = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, chatId: 'test', data }),
  });
  const json = await res.json();
  console.log(`[${type}] ${res.ok ? '✓' : '✗'}`, json);
}

(async () => {
  const api = typeof API === 'string' ? API : await API;
  console.log('Sending test messages to', api);
  for (const { type, data } of tests) {
    await send(type, data, api);
        await new Promise(r => setTimeout(r, 500));
  }
})();
