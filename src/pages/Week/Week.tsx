import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { mockSchedule } from "../../data/mockSchedule"
import { dayShort } from "../../lib/format"
import { ScheduleCard } from "../../components/ScheduleCard/ScheduleCard"
import { TaskCard } from "../../components/TaskCard/TaskCard"
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { EmptyState } from "../../components/EmptyState/EmptyState"
import styles from "./Week.module.css"

const DAYS = [0, 1, 2, 3, 4]
const TODAY_DAY = 2

export function Week() {
  const { tasks, openTask } = useApp()
  const [day, setDay] = useState<number>(TODAY_DAY)

  const lessons = mockSchedule
    .filter((s) => s.day === day)
    .sort((a, b) => a.number - b.number)
  const dayTasks = tasks.filter((t) => t.day === day)

  return (
    <div className={styles.page}>
      <PageHeader title="Неделя" subtitle="Расписание, дедлайны и задачи" />

      <div className={styles.days}>
        {DAYS.map((d) => (
          <button
            key={d}
            className={`${styles.day} ${d === day ? styles.dayActive : ""} ${
              d === TODAY_DAY ? styles.dayToday : ""
            }`}
            onClick={() => setDay(d)}
          >
            <span className={styles.dayShort}>{dayShort(d)}</span>
            <span className={styles.dayDate}>{16 + d}</span>
          </button>
        ))}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Уроки
          {day === TODAY_DAY && <span className={styles.todayTag}>сегодня</span>}
        </h2>
        {lessons.length === 0 ? (
          <EmptyState
            icon={<span aria-hidden>🌤️</span>}
            title="Уроков нет"
            subtitle="В этот день занятий не запланировано."
          />
        ) : (
          <div className={styles.lessons}>
            {lessons.map((l) => (
              <ScheduleCard key={l.id} item={l} isToday={day === TODAY_DAY} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Дедлайны и задания</h2>
        {dayTasks.length === 0 ? (
          <EmptyState
            icon={<span aria-hidden>✅</span>}
            title="Без дедлайнов"
            subtitle="На этот день заданий не назначено."
          />
        ) : (
          <div className={styles.cards}>
            {dayTasks.map((t, i) => (
              <TaskCard key={t.id} task={t} onOpen={openTask} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}