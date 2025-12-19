# Настройка EmailJS

## Шаг 1: Регистрация на EmailJS

1. Зайдите на https://www.emailjs.com/
2. Зарегистрируйтесь или войдите в аккаунт
3. Перейдите в Dashboard

## Шаг 2: Настройка Email Service

1. Перейдите в раздел **Email Services**
2. Нажмите **Add New Service**
3. Выберите ваш email провайдер (Gmail, Outlook и т.д.)
4. Следуйте инструкциям для подключения
5. Скопируйте **Service ID** (например: `service_xxxxxxx`)

## Шаг 3: Создание Email Templates

### Шаблон 1: Contact Form (Основная форма контактов)

1. Перейдите в **Email Templates**
2. Нажмите **Create New Template**
3. Название: `Contact Form`
4. Используйте следующие переменные в шаблоне:

```
Тема: Новое сообщение с сайта от {{from_name}}

Сообщение от: {{from_name}}
Email: {{from_email}}
Телефон: {{phone}}

Сообщение:
{{message}}

---
Reply-To: {{reply_to}}
```

5. Скопируйте **Template ID** (например: `template_xxxxxxx`)

### Шаблон 2: Quick Form (Быстрая форма консультации)

1. Создайте новый шаблон
2. Название: `Quick Consultation Form`
3. Используйте следующие переменные:

```
Тема: Запрос на консультацию от {{from_name}}

Имя: {{from_name}}
Email: {{from_email}}
Телефон: {{phone}}
Тип объекта: {{object_type}}

---
Reply-To: {{reply_to}}
```

4. Скопируйте **Template ID**

### Шаблон 3: Consultation (Альтернативный шаблон для консультации)

Можно использовать тот же шаблон что и Quick Form, или создать отдельный.

## Шаг 4: Получение Public Key

1. Перейдите в **Account** -> **General**
2. Найдите **Public Key** в разделе API Keys
3. Скопируйте ключ (например: `xxxxxxxxxxxxxxxx`)

## Шаг 5: Настройка переменных окружения

1. Скопируйте файл `.env.example` в `.env`:
   ```bash
   cp .env.example .env
   ```

2. Откройте `.env` и заполните все переменные:

```env
VITE_EMAILJS_PUBLIC_KEY=ваш_public_key
VITE_EMAILJS_SERVICE_ID=ваш_service_id
VITE_EMAILJS_TEMPLATE_CONTACT=ваш_template_id_contact
VITE_EMAILJS_TEMPLATE_QUICK=ваш_template_id_quick
VITE_EMAILJS_TEMPLATE_CONSULTATION=ваш_template_id_consultation
```

3. Перезапустите dev сервер после изменения `.env`

## Шаг 6: Проверка работы

1. Запустите сайт: `npm run dev`
2. Попробуйте отправить форму на странице контактов
3. Проверьте консоль браузера на наличие ошибок
4. Проверьте ваш email почтовый ящик

## Важные заметки

- **Безопасность**: Public Key безопасно хранить в коде, так как он используется только на клиенте
- **Лимиты**: Бесплатный план EmailJS имеет ограничения (200 emails/месяц)
- **Тестирование**: Используйте тестовые данные для проверки работы
- **Ошибки**: Все ошибки логируются в консоль браузера для отладки

## Структура переменных в шаблонах

### Contact Form (contact):
- `from_name` - имя отправителя
- `from_email` - email отправителя
- `phone` - телефон (опционально)
- `message` - сообщение
- `reply_to` - email для ответа
- `to_email` - получатель (обычно info@fireproof.ee)
- `subject` - тема письма

### Quick Form (quick):
- `from_name` - имя отправителя
- `from_email` - email отправителя
- `phone` - телефон (опционально)
- `object_type` - тип объекта (опционально)
- `reply_to` - email для ответа
- `to_email` - получатель
- `subject` - тема письма

