import type { IncomingMessage } from "../../types"
import styles from "./IncomingCard.module.css"

interface Props {
  message: IncomingMessage
  onAdd: (id: string) => void
  index?: number
}

export function IncomingCard({ message, onAdd, index = 0 }: Props) {
  const added = message.addedToRadar
  return (
    <div
      className={`${styles.card} ${added ? styles.added : ""}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className={styles.top}>
        <span className={styles.avatar} aria-hidden>
          {message.subject.charAt(0)}
        </span>
        <div className={styles.head}>
          <span className={styles.subject}>{message.subject}</span>
          <span className={styles.time}>{message.receivedAt}</span>
        </div>
      </div>

      <p className={styles.text}>«{message.text}»</p>

      <div className={styles.footer}>
        {added ? (
          <span className={styles.addedTag}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            На радаре
          </span>
        ) : (
          <button className={styles.addBtn} onClick={() => onAdd(message.id)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            {message.actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}