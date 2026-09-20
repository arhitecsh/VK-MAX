import type { ScheduleItem } from "../types"

// ============================================================
// Mock-данные: расписание уроков на неделю.
// day: 0=Пн, 1=Вт, 2=Ср, 3=Чт, 4=Пт
// ============================================================

export const mockSchedule: ScheduleItem[] = [
  // Понедельник
  { id: "s-mon-1", subject: "Математика", number: 1, time: "09:00", day: 0, room: "204", teacher: "Иванова А.П." },
  { id: "s-mon-2", subject: "Физика", number: 2, time: "10:00", day: 0, room: "310", teacher: "Петров С.Н." },
  { id: "s-mon-3", subject: "История", number: 3, time: "11:10", day: 0, room: "115", teacher: "Сидорова Е.В." },
  { id: "s-mon-4", subject: "Английский язык", number: 4, time: "12:20", day: 0, room: "220", teacher: "Кузнецова М.А." },

  // Вторник
  { id: "s-tue-1", subject: "Русский язык", number: 1, time: "09:00", day: 1, room: "118", teacher: "Волкова Т.И." },
  { id: "s-tue-2", subject: "Химия", number: 2, time: "10:00", day: 1, room: "305", teacher: "Морозов Д.К." },
  { id: "s-tue-3", subject: "Биология", number: 3, time: "11:10", day: 1, room: "308", teacher: "Фёдорова Л.С." },
  { id: "s-tue-4", subject: "География", number: 4, time: "12:20", day: 1, room: "112", teacher: "Николаев В.Г." },

  // Среда (сегодня)
  { id: "s-wed-1", subject: "Математика", number: 1, time: "09:00", day: 2, room: "204", teacher: "Иванова А.П." },
  { id: "s-wed-2", subject: "Физика", number: 2, time: "10:00", day: 2, room: "310", teacher: "Петров С.Н." },
  { id: "s-wed-3", subject: "Информатика", number: 3, time: "11:10", day: 2, room: "201", teacher: "Орлов И.И." },
  { id: "s-wed-4", subject: "Математика", number: 4, time: "12:20", day: 2, room: "204", teacher: "Иванова А.П." },

  // Четверг
  { id: "s-thu-1", subject: "Английский язык", number: 1, time: "09:00", day: 3, room: "220", teacher: "Кузнецова М.А." },
  { id: "s-thu-2", subject: "История", number: 2, time: "10:00", day: 3, room: "115", teacher: "Сидорова Е.В." },
  { id: "s-thu-3", subject: "Физика", number: 3, time: "11:10", day: 3, room: "310", teacher: "Петров С.Н." },
  { id: "s-thu-4", subject: "Русский язык", number: 4, time: "12:20", day: 3, room: "118", teacher: "Волкова Т.И." },

  // Пятница
  { id: "s-fri-1", subject: "Химия", number: 1, time: "09:00", day: 4, room: "305", teacher: "Морозов Д.К." },
  { id: "s-fri-2", subject: "География", number: 2, time: "10:00", day: 4, room: "112", teacher: "Николаев В.Г." },
  { id: "s-fri-3", subject: "Биология", number: 3, time: "11:10", day: 4, room: "308", teacher: "Фёдорова Л.С." },
  { id: "s-fri-4", subject: "Информатика", number: 4, time: "12:20", day: 4, room: "201", teacher: "Орлов И.И." },
]