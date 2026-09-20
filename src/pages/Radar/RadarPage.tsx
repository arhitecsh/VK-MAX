import { useMemo } from "react"
import { useApp } from "../../context/AppContext"
import { Radar } from "../../components/Radar/Radar"
import { TaskCard } from "../../components/TaskCard/TaskCard"
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { EmptyState } from "../../components/EmptyState/EmptyState"
import styles from "./RadarPage.module.css"

export function RadarPage() {
  const { tasks, openTask } = useApp()

  const upcoming = useMemo(
    () =>
      tasks
        .filter((t) => t.status !== "completed")
        .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? "")),
    [tasks],
  )

  return (
    <div className={styles.page}>
      <PageHeader
        title="Радар"
        subtitle="Учебная неделя на одном экране"
      />

      <div className={styles.radarCard}>
        <Radar tasks={tasks} onOpen={openTask} />
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ближайшие задачи</h2>
        {upcoming.length === 0 ? (
          <EmptyState
            icon={<span aria-hidden>🎉</span>}
            title="Всё под контролем"
            subtitle="Незавершённых задач нет. Отличная работа!"
          />
        ) : (
          <div className={styles.cards}>
            {upcoming.map((t, i) => (
              <TaskCard key={t.id} task={t} onOpen={openTask} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}