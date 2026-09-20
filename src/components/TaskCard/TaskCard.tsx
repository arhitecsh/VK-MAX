import type { Task } from "../../types"
import { formatDeadlineShort, formatMinutes } from "../../lib/format"
import { PriorityBadge } from "../PriorityBadge/PriorityBadge"
import { StatusBadge } from "../StatusBadge/StatusBadge"
import styles from "./TaskCard.module.css"

const KIND_ICON: Record<Task["kind"], string> = {
  exam: "📝",
  lab: "🧪",
  homework: "📚",
  reading: "📖",
  event: "📌",
}

interface Props {
  task: Task
  onOpen: (id: string) => void
  /** Индекс для каскадной анимации появления. */
  index?: number
}

export function TaskCard({ task, onOpen, index = 0 }: Props) {
  const done = task.status === "completed"
  return (
    <button
      className={`${styles.card} ${styles[task.priority]} ${
        done ? styles.done : ""
      }`}
      onClick={() => onOpen(task.id)}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <span className={styles.accent} aria-hidden />
      <span className={styles.icon}>{KIND_ICON[task.kind]}</span>
      <span className={styles.main}>
        <span className={styles.titleRow}>
          <span className={styles.title}>{task.title}</span>
        </span>
        <span className={styles.meta}>
          <span className={styles.subject}>{task.subject}</span>
          {task.deadline && (
            <span className={styles.deadline}>
              · {formatDeadlineShort(task.deadline)}
            </span>
          )}
          {task.estimatedTime && (
            <span className={styles.time}>· ~{formatMinutes(task.estimatedTime)}</span>
          )}
        </span>
        <span className={styles.badges}>
          {done ? (
            <StatusBadge status="completed" />
          ) : (
            <>
              <PriorityBadge priority={task.priority} />
              {task.status === "in_progress" && (
                <StatusBadge status="in_progress" />
              )}
            </>
          )}
        </span>
      </span>
      <span className={styles.chevron} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}