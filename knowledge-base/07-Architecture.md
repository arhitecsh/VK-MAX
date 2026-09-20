# 07 — Architecture

## Стек

- **React 18** + **TypeScript** + **Vite 5**
- **CSS Modules** (без Tailwind — полный контроль над Сферум-стилем)
- **React Context + useState** для состояния (без внешних библиотек)

## Структура

```
src/
├── components/   # переиспользуемые UI-компоненты
├── pages/        # экраны (вкладки)
├── data/         # mock-данные (позже — API)
├── context/      # глобальное состояние + действия
├── lib/          # утилиты (форматирование)
├── types/        # TypeScript-интерфейсы
├── App.tsx       # каркас: shell + модалки
└── main.tsx      # точка входа
```

## Поток данных

```
data/mock*.ts  →  context/AppContext  →  pages/components  →  UI
                     (состояние + действия)
```

- **Состояние** живёт в `AppContext`: `tasks`, `messages`, `activeTab`,
  `selectedTaskId`, `lostOpen`.
- **Действия** — функции контекста: `setTab`, `openTask`, `addTaskFromMessage`,
  `setTaskStatus`, `completeTask`, `resetDemo`.

## Decision: изоляция данных для будущей замены на API

### Решение
Mock-данные вынесены в `data/`, типы — в `types/`, действия — в `context/`.

### Почему
Чтобы позже подключить реальный backend / API MAX **без переделки UI**.

### Следствие
- Компоненты не знают, откуда данные — только типы.
- Для подключения API достаточно заменить источник в `AppContext`
  (загрузить данные, заменить действия на fetch-вызовы).
- Типы `Task`, `IncomingMessage`, `ScheduleItem` уже описывают
  ожидаемую структуру.

## Decision: фиксированная демо-дата

### Решение
«Сегодня» зафиксировано на **среду, 18.09.2026** (`TODAY` в `lib/format.ts`).

### Почему
Чтобы демо было **детерминированным**: «сегодня / завтра / до пятницы»
всегда показываются одинаково, независимо от реальной даты запуска.

### Следствие
Для реального продукта `TODAY` заменится на `new Date()`.

## Связанные заметки

[[08-Components]] · [[09-Mock-Data]] · [[12-Technical-Roadmap]]