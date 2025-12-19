import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // База для GitHub Pages
  // Если репозиторий называется username.github.io, измените на base: '/'
  // Если репозиторий называется fireproof-site (или другое имя), будет автоматически определен через REPO_NAME
  base: process.env.GITHUB_ACTIONS 
    ? (process.env.REPO_NAME && process.env.REPO_NAME !== 'username.github.io' 
       ? `/${process.env.REPO_NAME}/` 
       : '/')
    : '/',
})

