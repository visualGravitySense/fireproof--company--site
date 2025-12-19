# GitHub Actions для деплоя на GitHub Pages

## Настройка

### 1. Включите GitHub Pages в настройках репозитория

1. Перейдите в Settings → Pages вашего репозитория
2. В разделе "Source" выберите **GitHub Actions**
3. Сохраните изменения

### 2. Настройте base path (если нужно)

Если ваш репозиторий называется `fireproof-site` (не `username.github.io`), то:
- Сайт будет доступен по адресу: `https://username.github.io/fireproof-site/`
- Base path уже настроен в `vite.config.ts` как `/fireproof-site/`

Если вы используете репозиторий `username.github.io`, то:
- Сайт будет доступен по адресу: `https://username.github.io/`
- Измените в `vite.config.ts`: `base: '/'`

### 3. Переменные окружения (опционально)

Если нужно использовать переменные окружения для EmailJS в production:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте следующие secrets:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_CONTACT`
   - `VITE_EMAILJS_TEMPLATE_QUICK`
   - `VITE_EMAILJS_TEMPLATE_CONSULTATION`

3. Раскомментируйте соответствующие строки в `.github/workflows/deploy.yml`

### 4. Деплой

После настройки:
1. Закоммитьте изменения и запушьте в ветку `main` или `master`
2. GitHub Actions автоматически запустится
3. Деплой займет несколько минут
4. После успешного деплоя сайт будет доступен на GitHub Pages

## Проверка деплоя

1. Перейдите в раздел **Actions** вашего репозитория
2. Выберите последний workflow run
3. Проверьте, что все шаги выполнены успешно (зеленые галочки)
4. Сайт будет доступен по URL, указанному в Settings → Pages

