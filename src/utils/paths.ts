/**
 * Утилита для получения правильных путей к статическим файлам
 * с учетом base path для GitHub Pages
 */

/**
 * Получает путь к статическому файлу с учетом base path
 * @param path - путь к файлу (например, "/fp-logo-2.svg")
 * @returns путь с учетом base path (например, "/fireproof-site/fp-logo-2.svg" или "/fp-logo-2.svg")
 */
export function getStaticPath(path: string): string {
  // Получаем base URL из Vite (например, "/" или "/fireproof-site/")
  const base = import.meta.env.BASE_URL || '/'
  
  // Убираем начальный слеш из пути, если он есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Если base path это корень, просто возвращаем путь с начальным слешем
  if (base === '/') {
    return '/' + cleanPath
  }
  
  // Для поддиректории: base path должен заканчиваться на '/'
  const basePath = base.endsWith('/') ? base : base + '/'
  
  // Возвращаем путь с base path
  return basePath + cleanPath
}

