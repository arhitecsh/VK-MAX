// ============================================================
// Типы данных «Мой портфель»
// Эти интерфейсы описывают структуру данных, которую позже
// можно будет получать из реального API (MAX / backend).
// ============================================================

/** Уровень важности задачи. */
export type Priority = "high" | "medium" | "low"

/** Статус выполнения задачи. */
export type TaskStatus = "todo" | "in_progress" | "completed"

/** Тип учебного события для списка дел и расписания. */
export type TaskKind =
  | "exam" // контрольная / самостоятельная
  | "lab" // лабораторная
  | "homework" // домашнее задание
  | "reading" // прочитать параграф
  | "event" // другое важное событие

/** Откуда появилась задача (прозрачность источника). */
export type TaskSource =
  | "teacher_message"
  | "schedule"
  | "file"
  | "manual"

/** Учебное задание / событие в портфеле. */
export interface Task {
  id: string
  title: string
  subject: string
  kind: TaskKind
  /** ISO-дата дедлайна, например "2026-09-20T18:00:00" */
  deadline?: string
  priority: Priority
  status: TaskStatus
  source: TaskSource
  /** Человекочитаемое описание источника, напр. "Сообщение учителя физики" */
  sourceLabel?: string
  /** Когда источник появился, напр. "сегодня, 16:42" */
  sourceTime?: string
  /** Оценочное время выполнения в минутах */
  estimatedTime?: number
  /** Краткое описание / детали */
  description?: string
  /** Прикреплённый файл (имя) */
  attachment?: string
  /** День недели (0=Пн ... 4=Пт) для отображения в расписании */
  day: number
}

/** Входящее сообщение / учебная информация, которая может стать задачей. */
export interface IncomingMessage {
  id: string
  subject: string
  /** Текст сообщения от учителя */
  text: string
  /** Когда пришло, напр. "сегодня, 16:42" */
  receivedAt: string
  /** Уже добавлено в портфель? */
  addedToPortfolio: boolean
  /** id задачи, если уже добавлено */
  taskId?: string
  /** Подсказка для кнопки действия */
  actionLabel: string
  /** Готовая задача, которую создаст система (mock "ИИ") */
  suggestedTask?: Omit<Task, "id" | "status">
}

/** Урок в расписании. */
export interface ScheduleItem {
  id: string
  subject: string
  /** Номер урока */
  number: number
  /** Время начала, напр. "09:00" */
  time: string
  /** День недели (0=Пн ... 4=Пт) */
  day: number
  /** Кабинет */
  room?: string
  /** Учитель */
  teacher?: string
}

/** Вкладка приложения. */
export type Tab = "home" | "inbox" | "week" | "profile"
