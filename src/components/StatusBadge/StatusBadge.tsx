import type { TaskStatus } from "../../types"
import styles from "./StatusBadge.module.css"

const LABELS: Record<TaskStatus, string> = {
  todo: "Не начато",
  in_progress: "В процессе",
  completed: "Выполнено",
}

interface Props {
  status: TaskStatus
  className?: string
}

export function StatusBadge({ status, className }: Props) {
  return (
    <span className={`${styles.badge} ${styles[status]} ${className ?? ""}`}>
      <span className={styles.icon} aria-hidden>
        {status === "completed" ? "✓" : status === "in_progress" ? "◔" : "○"}
      </span>
      {LABELS[status]}
    </span>
  )
}