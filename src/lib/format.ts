// ============================================================
// Утилиты форматирования дат и текста.
// Для детерминированного демо "сегодня" зафиксировано
// на среду, 18 сентября 2026 (совпадает со сценарием).
// ============================================================

/** Фиксированное "сегодня" для демо-сценария. */
export const TODAY = new Date(2026, 8, 18) // 18 сентября 2026, среда

const DAY_NAMES = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
]
const DAY_SHORT = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
]

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Разница в днях между TODAY и датой d (положительная — в будущем). */
export function daysFromToday(d: Date): number {
  return Math.round((startOfDay(d).getTime() - startOfDay(TODAY).getTime()) / 86400000)
}

/** "Среда, 18 сентября" */
export function formatFullDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`
}

/** "14:30" из ISO-строки */
export function formatTime(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

/** "Сегодня, 14:30" / "Завтра, 18:00" / "Пятница, 18:00" / "20 сентября, 18:00" */
export function formatDeadline(iso?: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  const diff = daysFromToday(d)
  const time = formatTime(iso)
  if (diff === 0) return `Сегодня, ${time}`
  if (diff === 1) return `Завтра, ${time}`
  if (diff > 1 && diff < 7) return `${DAY_NAMES[d.getDay()]}, ${time}`
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${time}`
}

/** Коротко: "Сегодня" / "Завтра" / "До пятницы" / "20 сентября" */
export function formatDeadlineShort(iso?: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  const diff = daysFromToday(d)
  if (diff === 0) return "Сегодня"
  if (diff === 1) return "Завтра"
  if (diff > 1 && diff < 7) return `До ${DAY_NAMES[d.getDay()].toLowerCase()}`
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

/** Приветствие по реальному времени. */
export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 6) return "Доброй ночи"
  if (h < 12) return "Доброе утро"
  if (h < 18) return "Добрый день"
  return "Добрый вечер"
}

/** Короткое имя дня по индексу 0=Пн..4=Пт. */
export function dayShort(day: number): string {
  return DAY_SHORT[(day + 1) % 7]
}

/** Русская плюрализация: plural(5, "урок", "урока", "уроков") → "уроков". */
export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

/** "40 минут" / "1 час 20 минут" */
export function formatMinutes(min?: number): string {
  if (!min) return ""
  if (min < 60) return `${min} мин`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h} ч ${m} мин` : `${h} ч`
}