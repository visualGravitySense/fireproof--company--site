import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Определяем base path
const getBase = () => {
  if (process.env.GITHUB_ACTIONS) {
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

