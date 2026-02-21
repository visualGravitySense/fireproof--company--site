# Интеграция с Telegram-ботом

Все контактные кнопки и формы на сайте отправляют уведомления в Telegram-бот.

## Почему бот не работает на GitHub Pages

GitHub Pages — только статика. API `/api/bot1` там **не работает**. Нужен Vercel для serverless-функций.

---

## Настройка бота на Vercel

### Шаг 1. Деплой на Vercel

1. Зайдите на [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Импортируйте репозиторий `fireproof-site`
3. **Deploy** (Vercel сам определит Vite + API)

### Шаг 2. Переменные окружения в Vercel

Vercel → ваш проект → **Settings** → **Environment Variables**:

| Переменная | Значение | Где |
|------------|----------|-----|
| `TELEGRAM_BOT_TOKEN` | Токен от @BotFather | Production, Preview |
| `VITE_TELEGRAM_ADMIN_CHAT_ID` | Ваш Chat ID (напр. 5883625804) | Production, Preview |

**Chat ID:** напишите @userinfobot в Telegram — он вернёт ваш Id.

### Шаг 3. Сайт на GitHub Pages — обязательно

Если сайт на **GitHub Pages**, добавьте в **Settings** → **Secrets and variables** → **Actions**:

| Secret | Значение |
|--------|----------|
| `VITE_TELEGRAM_ADMIN_CHAT_ID` | Ваш Chat ID (напр. 5883625804) | 
| `VITE_TELEGRAM_API_URL` | `https://fireproof-site.vercel.app/api/bot1` (опционально, fallback по умолчанию)

**Без `VITE_TELEGRAM_ADMIN_CHAT_ID` бот не работает на GitHub Pages.** После добавления — запустите workflow заново (Deploy).

**Важно:** URL API должен совпадать с вашим проектом в Vercel. Если репозиторий `fireproof-site`, то обычно это `https://fireproof-site.vercel.app/api/bot1`. Добавьте `VITE_TELEGRAM_API_URL` в Secrets, если fallback не подходит.

### Шаг 4. Проверка API

```bash
curl -X POST https://ваш-проект.vercel.app/api/bot1 \
  -H "Content-Type: application/json" \
  -d '{"type":"help_click","chatId":"ВАШ_CHAT_ID","data":{"source":"test"}}'
```

Должно прийти сообщение в Telegram.

## Production (Vercel)

При деплое на Vercel:
- Сайт и API на одном домене → `VITE_TELEGRAM_API_URL` не задавать (по умолчанию `/api/bot1`)
- Все сообщения уходят в Telegram

## Что отправляется в Telegram

| Действие | Тип | Данные |
|----------|-----|--------|
| Форма контактов (/contact) | contact_form | имя, email, телефон, сообщение |
| Быстрая форма (Hero, CTA) | website_registration | имя, email, телефон |
| Поле «Email, телефон или вопрос» | quick_contact | контакт/вопрос |
| Форма отзыва (💬) | feedback | оценка, комментарий |
| Кнопка помощи (❓) | help_click | источник, время |
| Клики по кнопкам/ссылкам | button_click | страница, кнопка, ссылка |
| Посещение сайта (загрузка страницы) | page_visit | страница, referrer |

**Примечание:** Уведомления о посещении ограничены 1 раз в 5 минут на сессию (чтобы не спамить при обновлении страницы).

## Диагностика (бот не работает на GitHub Pages)

1. **Откройте DevTools (F12) → Console** на сайте GitHub Pages. При отправке формы смотрите:
   - `VITE_TELEGRAM_ADMIN_CHAT_ID не задан` → добавьте secret и перезапустите workflow
   - `Ошибка отправки в Telegram` + `API URL: ...` → проверьте URL (должен быть ваш Vercel)
   - `Telegram API error` → смотрите текст ошибки (CORS, 404, 500)

2. **DevTools → Network** — найдите запрос к `api/bot1`:
   - CORS error → Vercel API должен отдавать `Access-Control-Allow-Origin: *` (уже настроено)
   - 404 → неверный URL, проверьте домен Vercel (fireproof-site vs fireproof-company-site)
   - 500 → проверьте `TELEGRAM_BOT_TOKEN` в Vercel

3. **Проверьте URL Vercel:** зайдите в Vercel → ваш проект → Domains. Используйте этот домен в `VITE_TELEGRAM_API_URL`.
