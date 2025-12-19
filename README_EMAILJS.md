# Настройка EmailJS для отправки форм

Все формы на сайте настроены для отправки через EmailJS. Следуйте инструкциям ниже для полной настройки.

## Быстрый старт

1. **Создайте аккаунт на EmailJS**: https://www.emailjs.com/

2. **Создайте файл `.env`** в корне проекта и добавьте:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=ваш_public_key
   VITE_EMAILJS_SERVICE_ID=ваш_service_id
   VITE_EMAILJS_TEMPLATE_CONTACT=ваш_template_id
   VITE_EMAILJS_TEMPLATE_QUICK=ваш_template_id
   VITE_EMAILJS_TEMPLATE_CONSULTATION=ваш_template_id
   ```

3. **Следуйте инструкциям** в файле `src/config/EMAILJS_SETUP.md` для детальной настройки

4. **Перезапустите dev сервер** после настройки `.env`

## Настроенные формы

✅ **ContactPage** (`/contact`) - основная форма контактов
- Поля: имя, email, телефон, сообщение
- Отправляет: `sendContactForm()`

✅ **HomePage Hero форма** - быстрая форма консультации
- Поля: имя, email, телефон, тип объекта
- Отправляет: `sendQuickForm()`

✅ **HomePage CTA форма** - форма в CTA секции
- Поля: имя, email, телефон
- Отправляет: `sendQuickForm()`

## Структура проекта

```
src/
├── config/
│   ├── emailjs.config.ts       # Конфигурация EmailJS
│   └── EMAILJS_SETUP.md        # Детальная инструкция
├── utils/
│   └── emailService.ts         # Сервис для отправки email
└── pages/
    ├── ContactPage.tsx         # Использует sendContactForm()
    └── HomePage.tsx            # Использует sendQuickForm()
```

## Тестирование

После настройки EmailJS, все формы будут отправлять email на указанный адрес. Проверьте:
1. Консоль браузера на наличие ошибок
2. Ваш email ящик на получение писем
3. Правильность заполнения всех полей формы

