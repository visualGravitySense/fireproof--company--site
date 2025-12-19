# Система локализации

## Структура переводов

Все переводы организованы по файлам:
- `ru.ts` - Русский язык (по умолчанию)
- `et.ts` - Эстонский язык
- `en.ts` - Английский язык

## Использование переводов

### В компонентах React:

```tsx
import { useLanguage } from '../../contexts/LanguageContext'

function MyComponent() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('home.hero.subtitle')}</p>
    </div>
  )
}
```

### Структура ключей:

Ключи организованы иерархически для удобства:
- `nav.*` - Навигация
- `home.*` - Главная страница
- `about.*` - О компании
- `services.*` - Услуги
- `blog.*` - Блог
- `contact.*` - Контакты
- `common.*` - Общие элементы

### Добавление новых переводов:

1. Добавьте ключ во все три файла (ru.ts, et.ts, en.ts)
2. Используйте вложенную структуру для организации
3. Пример:

```ts
// ru.ts
export const ru = {
  newSection: {
    title: 'Заголовок',
    description: 'Описание'
  }
}

// et.ts
export const et = {
  newSection: {
    title: 'Pealkiri',
    description: 'Kirjeldus'
  }
}

// en.ts
export const en = {
  newSection: {
    title: 'Title',
    description: 'Description'
  }
}
```

Использование: `t('newSection.title')`

## План локализации

### Приоритет 1 (Основные страницы):
- [x] Навигация
- [ ] Главная страница (Hero, Stats, Services, Projects, Partners, CTA)
- [ ] О компании
- [ ] Услуги
- [ ] Контакты

### Приоритет 2 (Дополнительные страницы):
- [ ] Блог
- [ ] Детальные страницы услуг
- [ ] Страницы проектов

### Приоритет 3 (Детали):
- [ ] Формы
- [ ] Сообщения об ошибках
- [ ] Уведомления
- [ ] Мета-теги (для SEO)

