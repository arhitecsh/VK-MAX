# РАДАР

> **Понимай, что важно сегодня.**

**Радар** — мини-приложение для школьников (7–11 класс), которое собирает учебную информацию из разных источников (расписание, сообщения учителей, домашние задания, файлы, дедлайны) и помогает понять **что сейчас действительно важно сделать, чтобы ничего не пропустить**.

Это **первый визуальный прототип (clickable prototype)** для хакатона. Настоящего бэкенда, авторизации и интеграций пока нет — всё на mock-данных.

---

## 🚀 Начало работы и вклад в проект

Этот раздел поможет вам быстро начать работу с проектом и внести свой вклад.

### 1. Установка и запуск

```bash
# Установка зависимостей
npm install
# или
pnpm install

# Запуск сервера разработки
npm run dev
# или
pnpm dev
```

Откройте в браузере: **http://localhost:5173/**

Для продакшен-сборки:
```bash
npm run build
npm run preview
```

> Основной приоритет — **мобильный экран**. На десктопе приложение отображается как «телефон» по центру — удобно для демонстрации жюри.

### 2. Руководство по контрибьюции

Для подробной информации о том, как внести свой вклад в проект, пожалуйста, ознакомьтесь с нашим руководством:
*   [Руководство по контрибьюции (CONTRIBUTING.md)](CONTRIBUTING.md)

---

## 🗺️ База знаний проекта

Вся документация по проекту, включая архитектуру, пользовательские сценарии и концепцию, находится в директории `knowledge-base/`.

*   [Обзор проекта (00-Overview.md)](knowledge-base/00-Overview.md)
*   [Проблема, которую решаем (01-Problem.md)](knowledge-base/01-Problem.md)
*   [Целевая аудитория (02-Target-Audience.md)](knowledge-base/02-Target-Audience.md)
*   [Концепция продукта (03-Product-Concept.md)](knowledge-base/03-Product-Concept.md)
*   [Пользовательские сценарии (04-User-Flows.md)](knowledge-base/04-User-Flows.md)
*   [Принципы UX (05-UX-Principles.md)](knowledge-base/05-UX-Principles.md)
*   [Визуальный дизайн (06-UI-Design.md)](knowledge-base/06-UI-Design.md)
*   [Архитектура проекта (07-Architecture.md)](knowledge-base/07-Architecture.md)
*   [Компоненты (08-Components.md)](knowledge-base/08-Components.md)
*   [Mock-данные (09-Mock-Data.md)](knowledge-base/09-Mock-Data.md)
*   [Будущие функции (10-Future-Features.md)](knowledge-base/10-Future-Features.md)
*   [Презентация хакатона (11-Hackathon-Presentation.md)](knowledge-base/11-Hackathon-Presentation.md)
*   [Техническая дорожная карта (12-Technical-Roadmap.md)](knowledge-base/12-Technical-Roadmap.md)

### Дополнительные руководства для агентов и контрибьюторов:

*   [Руководство по взаимодействию с ИИ-агентами (13-AI-Agent-Interaction.md)](knowledge-base/13-AI-Agent-Interaction.md)
*   [Руководство по взаимодействию с проектом (14-Project-Interaction.md)](knowledge-base/14-Project-Interaction.md)

---

## 🎨 Визуальный стиль

Визуальное настроение **Сферума**: чисто, дружелюбно, технологично, много воздуха, мягкие карточки, аккуратные скругления.

Цвет помогает ориентироваться (но не превращает интерфейс в светофор):

*   🔴 **срочно**
*   🟡 **обратить внимание**
*   🔵 **обычная информация / можно позже**
*   🟢 **выполнено**

Палитра и токены — в [`src/index.css`](src/index.css) (CSS-переменные).

---

## 🏗️ Архитектура

```
src/
├── components/        # переиспользуемые компоненты
│   ├── BottomNavigation/
│   ├── TaskCard/
│   ├── ScheduleCard/
│   ├── Radar/
│   ├── IncomingCard/
│   ├── TaskDetail/
│   ├── LostScreen/
│   ├── PriorityBadge/
│   ├── StatusBadge/
│   ├── PageHeader/
│   ├── EmptyState/
│   └── Modal/
├── pages/             # экраны приложения
│   ├── Home/
│   ├── Radar/
│   ├── Inbox/
│   ├── Week/
│   └── Profile/
├── data/              # mock-данные (позже — API)
│   ├── mockTasks.ts
│   ├── mockMessages.ts
│   └── mockSchedule.ts
├── context/           # глобальное состояние (React state)
│   └── AppContext.tsx
├── lib/               # утилиты (форматирование дат и т.п.)
│   └── format.ts
├── types/             # TypeScript-интерфейсы
│   └── index.ts
├── App.tsx
└── main.tsx
```

*   **Стек:** React 18 + TypeScript + Vite + CSS Modules.
*   **Состояние:** React Context + `useState` (без внешних библиотек).
*   **Подготовка к API:** данные изолированы в `data/`, типы — в `types/`, действия — в `context/`. Замена mock на реальный API не потребует переделки UI.

---

## ⚠️ Ограничения прототипа

Это набросок, а не production-продукт. Намеренно **не** реализовано: авторизация, база данных, реальные API MAX, настоящая AI-модель, уведомления, Docker, админ-панель.

ИИ в прототипе — **скрытая технология**: «понимание» сообщений и определение приоритетов имитируется mock-данными (`suggestedTask` во входящих).
