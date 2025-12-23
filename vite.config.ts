import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Определяем base path
// Если используется кастомный домен (fireproof.ee), base должен быть '/'
// Если используется стандартный GitHub Pages URL (username.github.io/repo-name), base должен быть '/repo-name/'
const getBase = () => {
  // Если явно указан USE_CUSTOM_DOMAIN=true, используем корневой путь
  if (process.env.USE_CUSTOM_DOMAIN === 'true') {
    return '/'
  }
  
  if (process.env.GITHUB_ACTIONS) {
    // Если репозиторий называется username.github.io, используем корневой путь
    if (process.env.REPO_NAME && process.env.REPO_NAME !== 'username.github.io') {
      return `/${process.env.REPO_NAME}/`
    }
    return '/'
  }
  return '/'
}

const base = getBase()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
  // Убеждаемся, что все пути обрабатываются правильно
  build: {
    assetsDir: 'assets',
    // Копируем файлы из public в корень dist
    copyPublicDir: true,
  },
})

