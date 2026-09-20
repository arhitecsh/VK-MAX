import type { Priority } from "../../types"
import styles from "./PriorityBadge.module.css"

const LABELS: Record<Priority, string> = {
  high: "Срочно",
  medium: "Обратить внимание",
  low: "Можно позже",
}

interface Props {
  priority: Priority
  /** Показывать только точку (без текста). */
  dotOnly?: boolean
  className?: string
}

export function PriorityBadge({ priority, dotOnly = false, className }: Props) {
  if (dotOnly) {
    return (
      <span
        className={`${styles.dot} ${styles[priority]} ${className ?? ""}`}
        title={LABELS[priority]}
        aria-label={LABELS[priority]}
      />
    )
  }
  return (
    <span className={`${styles.badge} ${styles[priority]} ${className ?? ""}`}>
      <span className={styles.dot} />
      {LABELS[priority]}
    </span>
  )
}