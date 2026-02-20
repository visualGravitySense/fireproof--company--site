Структура ботов (по task-2.md, архитектура GitHub Pages + Vercel):

### 1. **Клиентский сервис**
`src/services/telegramService.ts` — отправляет данные из формы на API:

- Методы: `notifyQuickForm`, `notifyContactForm`, `notifyFeedback`, `notifyHelpClick`
- API: `VITE_TELEGRAM_API_URL` (по умолчанию `/api/bot1`)
- Chat ID: `VITE_TELEGRAM_ADMIN_CHAT_ID`

### 2. **Bot 1 — Fireproof (Vercel)**
`api/bot1.ts` — первый бот, приём форм и отправка в Telegram:

- Типы: `website_registration`, `contact_form`, `feedback`, `help_click`
- CORS включён для запросов с GitHub Pages
- Токен: `TELEGRAM_BOT_TOKEN` или `BOT1_TOKEN` в env

### 3. **Общая логика**
`lib/telegram.ts` — отправка сообщений в Telegram
`lib/db.ts` — заглушка для будущей БД (Supabase, Neon)

### 4. **Деплой**
- Vercel: `api/bot1.ts` — serverless function
- GitHub Pages: статический фронтенд
- В Vercel: `VITE_TELEGRAM_API_URL=https://проект.vercel.app/api/bot1` (если боты на отдельном проекте)