import type { ScheduleItem } from "../../types"
import styles from "./ScheduleCard.module.css"

interface Props {
  item: ScheduleItem
  isToday?: boolean
  /** Количество ДЗ, заданных на этот урок. */
  homeworkCount?: number
  /** Вызывается при тапе на урок. */
  onOpen?: () => void
}

export function ScheduleCard({
  item,
  isToday = false,
  homeworkCount = 0,
  onOpen,
}: Props) {
  const clickable = !!onOpen
  const classes = [
    styles.card,
    isToday ? styles.today : "",
    clickable ? styles.clickable : "",
  ]
    .filter(Boolean)
    .join(" ")

  const content = (
    <>
      <div className={styles.time}>
        <span className={styles.num}>{item.number}</span>
        <span className={styles.clock}>{item.time}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.subject}>{item.subject}</span>
        <span className={styles.detail}>
          {item.room && <span>каб. {item.room}</span>}
          {item.teacher && <span>· {item.teacher}</span>}
        </span>
      </div>
      {homeworkCount > 0 && (
        <span className={styles.hwBadge} aria-hidden>
          {homeworkCount}
        </span>
      )}
      {clickable && (
        <span className={styles.chevron} aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  )

  if (!clickable) {
    return <div className={classes}>{content}</div>
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onOpen}
      aria-label={`Урок ${item.number}: ${item.subject}. Открыть домашние задания`}
    >
      {content}
    </button>
  )
}