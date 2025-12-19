# Инструкция по деплою на GitHub Pages

## Быстрый старт

### 1. Включите GitHub Pages в настройках репозитория

1. Перейдите в ваш репозиторий на GitHub
2. Откройте **Settings** → **Pages**
3. В разделе **Source** выберите **GitHub Actions**
4. Сохраните изменения

### 2. Настройте base path (если нужно)

Скрипт автоматически определяет название репозитория и настраивает base path.

- Если репозиторий называется `username.github.io` → base path будет `/`
- Если репозиторий называется `fireproof-site` (или другое имя) → base path будет `/fireproof-site/`

**Важно:** Если вы хотите вручную задать base path, отредактируйте `vite.config.ts`.

### 3. Запуск деплоя

После настройки:

1. **Автоматический деплой**: При каждом push в ветку `main` или `master` запускается автоматический деплой
2. **Ручной деплой**: Перейдите в **Actions** → выберите workflow **Deploy to GitHub Pages** → нажмите **Run workflow**

### 4. Проверка деплоя

1. Перейдите в раздел **Actions** вашего репозитория
2. Выберите последний workflow run
3. Дождитесь завершения всех шагов (зеленые галочки)
4. Сайт будет доступен по URL, указанному в **Settings** → **Pages**

Обычно это:
- `https://username.github.io/fireproof-site/` (для обычного репозитория)
- `https://username.github.io/` (для репозитория username.github.io)

## Переменные окружения для EmailJS

Если нужно использовать переменные окружения для EmailJS в production:

### 1. Добавьте Secrets в GitHub

1. Перейдите в **Settings** → **Secrets and variables** → **Actions**
2. Нажмите **New repository secret**
3. Добавьте следующие secrets:
   - `VITE_EMAILJS_PUBLIC_KEY` → ваш public key
   - `VITE_EMAILJS_SERVICE_ID` → ваш service ID
   - `VITE_EMAILJS_TEMPLATE_CONTACT` → template ID для контактов
   - `VITE_EMAILJS_TEMPLATE_QUICK` → template ID для быстрых форм
   - `VITE_EMAILJS_TEMPLATE_CONSULTATION` → template ID для консультаций

### 2. Раскомментируйте строки в workflow

Откройте `.github/workflows/deploy.yml` и раскомментируйте строки с переменными окружения в секции `env:` шага `Build`.

## Устранение проблем

### Проблема: 404 ошибки при переходе по роутам

**Решение:** Файл `public/404.html` уже добавлен для поддержки SPA роутинга. Убедитесь, что он скопирован в `dist` после сборки.

### Проблема: Статические файлы не загружаются

**Решение:** Проверьте, что base path правильно настроен в `vite.config.ts`. Он должен соответствовать пути вашего сайта на GitHub Pages.

### Проблема: Переменные окружения не работают

**Решение:** 
1. Убедитесь, что secrets добавлены в GitHub
2. Раскомментируйте соответствующие строки в `.github/workflows/deploy.yml`
3. Перезапустите workflow после изменений

## Локальная разработка

Для локальной разработки используйте:

```bash
npm run dev
```

Base path будет автоматически установлен как `/` для локальной разработки.

## Production сборка

Для проверки production сборки локально:

```bash
npm run build
npm run preview
```

