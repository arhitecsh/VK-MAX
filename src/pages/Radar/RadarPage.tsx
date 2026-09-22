import { useMemo, useState } from "react"
import { useApp } from "../../context/AppContext"
import { Radar } from "../../components/Radar/Radar"
import { TaskCard } from "../../components/TaskCard/TaskCard"
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { EmptyState } from "../../components/EmptyState/EmptyState"
import styles from "./RadarPage.module.css"

export function RadarPage() {
  const { tasks, openTask } = useApp()
  const [openGroups, setOpenGroups] = useState<Set<"high" | "medium" | "low">>(
    new Set(["high"]),
  )

  const upcoming = useMemo(
    () =>
      tasks
        .filter((t) => t.status !== "completed")
        .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? "")),
    [tasks],
  )

  const priorityGroups = [
    { priority: "high" as const, title: "Срочно" },
    { priority: "medium" as const, title: "Средний приоритет" },
    { priority: "low" as const, title: "Низкий приоритет" },
  ].map((group) => ({
    ...group,
    tasks: upcoming.filter((task) => task.priority === group.priority),
  }))

  const toggleGroup = (priority: "high" | "medium" | "low") => {
    setOpenGroups((current) => {
      const next = new Set(current)
      if (next.has(priority)) next.delete(priority)
      else next.add(priority)
      return next
    })
  }

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
        {upcoming.length === 0 ? (
          <EmptyState
            icon={<span aria-hidden>🎉</span>}
            title="Всё под контролем"
            subtitle="Незавершённых задач нет. Отличная работа!"
          />
        ) : (
          <div className={styles.groups}>
            {priorityGroups.map((group) => (
              <section className={styles.group} key={group.priority}>
                <button
                  className={`${styles.groupHeader} ${
                    openGroups.has(group.priority) ? styles.groupHeaderOpen : ""
                  }`}
                  onClick={() => toggleGroup(group.priority)}
                  aria-expanded={openGroups.has(group.priority)}
                  aria-controls={`priority-${group.priority}`}
                >
                  <h2 className={styles.sectionTitle}>{group.title}</h2>
                  <span className={styles.count}>{group.tasks.length}</span>
                  <span className={styles.chevron} aria-hidden>⌄</span>
                </button>
                <div
                  id={`priority-${group.priority}`}
                  className={`${styles.groupContent} ${
                    openGroups.has(group.priority) ? styles.groupContentOpen : ""
                  }`}
                  aria-hidden={!openGroups.has(group.priority)}
                >
                  {group.tasks.length === 0 ? (
                    <p className={styles.emptyGroup}>Нет задач</p>
                  ) : (
                    <div className={styles.cards}>
                      {group.tasks.map((task, index) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onOpen={openTask}
                          index={index}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}