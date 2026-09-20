import type { Task } from "../../types"
import { dayShort } from "../../lib/format"
import styles from "./Radar.module.css"

const DAYS = [0, 1, 2, 3, 4]
const TODAY_DAY = 2 // среда (для демо)

const KIND_ICON: Record<Task["kind"], string> = {
  exam: "📝",
  lab: "🧪",
  homework: "📚",
  reading: "📖",
  event: "📌",
}

interface Props {
  tasks: Task[]
  onOpen: (id: string) => void
}

export function Radar({ tasks, onOpen }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.timeline}>
        <div className={styles.line} aria-hidden />
        {DAYS.map((day) => {
          const dayTasks = tasks
            .filter((t) => t.day === day)
            .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""))
          const isToday = day === TODAY_DAY
          return (
            <div
              key={day}
              className={`${styles.col} ${isToday ? styles.today : ""}`}
            >
              <div className={styles.node} aria-hidden />
              <div className={styles.dayLabel}>
                {dayShort(day)}
                {isToday && <span className={styles.todayTag}>сегодня</span>}
              </div>
              <div className={styles.chips}>
                {dayTasks.length === 0 && (
                  <span className={styles.empty}>—</span>
                )}
                {dayTasks.map((t) => (
                  <button
                    key={t.id}
                    className={`${styles.chip} ${styles[t.priority]} ${
                      t.status === "completed" ? styles.done : ""
                    }`}
                    onClick={() => onOpen(t.id)}
                    title={t.title}
                  >
                    <span className={styles.chipIcon}>{KIND_ICON[t.kind]}</span>
                    <span className={styles.chipTitle}>{t.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dHigh}`} /> срочно
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dMedium}`} /> внимание
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dLow}`} /> обычное
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dDone}`} /> готово
        </span>
      </div>
    </div>
  )
}