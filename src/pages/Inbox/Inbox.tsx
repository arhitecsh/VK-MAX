import { useApp } from "../../context/AppContext"
import { IncomingCard } from "../../components/IncomingCard/IncomingCard"
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { EmptyState } from "../../components/EmptyState/EmptyState"
import styles from "./Inbox.module.css"

export function Inbox() {
  const { messages, addTaskFromMessage } = useApp()

  const sorted = [...messages].sort((a, b) =>
    b.receivedAt.localeCompare(a.receivedAt),
  )

  return (
    <div className={styles.page}>
      <PageHeader
        title="Входящие"
        subtitle="Сообщения, которые могут стать задачами"
      />

      <div className={styles.aiNote}>
        <span className={styles.aiDot} aria-hidden />
        Система сама распознаёт предмет, задание и дедлайн. Осталось лишь
        подтвердить.
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={<span aria-hidden>📭</span>}
          title="Пока пусто"
          subtitle="Новые сообщения от учителей появятся здесь."
        />
      ) : (
        <div className={styles.list}>
          {sorted.map((m, i) => (
            <IncomingCard
              key={m.id}
              message={m}
              onAdd={addTaskFromMessage}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}