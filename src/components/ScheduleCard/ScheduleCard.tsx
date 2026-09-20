import type { ScheduleItem } from "../../types"
import styles from "./ScheduleCard.module.css"

interface Props {
  item: ScheduleItem
  isToday?: boolean
}

export function ScheduleCard({ item, isToday = false }: Props) {
  return (
    <div className={`${styles.card} ${isToday ? styles.today : ""}`}>
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
    </div>
  )
}