# Интеграция с Telegram-ботом

Все контактные кнопки и формы на сайте отправляют уведомления в Telegram-бот.

## Настройка

### 1. Переменные окружения

Добавьте в `.env` (или в настройки деплоя):

```
VITE_TELEGRAM_ADMIN_CHAT_ID=ваш_chat_id
```

**Как получить Chat ID:**
1. Напишите боту @userinfobot в Telegram
2. Он вернёт ваш `Id` — это и есть Chat ID

### 2. API для отправки

Сайт отправляет данные на API `/api/bot1`. Варианты:

**Вариант A: Деплой на Vercel** (рекомендуется)
- При деплое на Vercel API автоматически доступен
- Добавьте в Vercel: `TELEGRAM_BOT_TOKEN` (или `BOT1_TOKEN`) и `VITE_TELEGRAM_ADMIN_CHAT_ID`

**Вариант B: GitHub Pages + отдельный Vercel для ботов**
- Сайт на GitHub Pages, боты — отдельный проект Vercel
- Укажите: `VITE_TELEGRAM_API_URL=https://ваш-проект.vercel.app/api/bot1`

### 3. Токен бота

В Vercel → Settings → Environment Variables:

```
TELEGRAM_BOT_TOKEN=ваш_токен_бота
# или для бота 1:
BOT1_TOKEN=ваш_токен_бота
```

## Что отправляется в Telegram

| Действие | Тип | Данные |
|----------|-----|--------|
| Форма контактов (/contact) | contact_form | имя, email, телефон, сообщение |
| Быстрая форма (Hero, CTA) | website_registration | имя, email, телефон |
| Форма отзыва (💬) | feedback | оценка, комментарий |
| Кнопка помощи (❓) | help_click | источник, время |
