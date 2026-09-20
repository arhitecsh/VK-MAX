import { useMemo } from "react"
import { useApp } from "../../context/AppContext"
import { mockSchedule } from "../../data/mockSchedule"
import {
  TODAY,
  daysFromToday,
  formatFullDate,
  getGreeting,
  plural,
} from "../../lib/format"
import { TaskCard } from "../../components/TaskCard/TaskCard"
import { PriorityBadge } from "../../components/PriorityBadge/PriorityBadge"
import styles from "./Home.module.css"

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const
const TODAY_DAY = 2

export function Home() {
  const { tasks, messages, openTask, openLost, addTaskFromMessage, setTab } =
    useApp()

  const stats = useMemo(() => {
    const lessonsToday = mockSchedule.filter((s) => s.day === TODAY_DAY).length
    const important = tasks.filter(
      (t) => t.status !== "completed" && t.priority !== "low",
    ).length
    const upcoming = tasks.filter((t) => {
      if (t.status === "completed" || !t.deadline) return false
      const d = daysFromToday(new Date(t.deadline))
      return d >= 0 && d <= 1
    }).length
    return { lessonsToday, important, upcoming }
  }, [tasks])

  const importantNow = useMemo(
    () =>
      tasks
        .filter((t) => t.status !== "completed")
        .sort((a, b) => {
          const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
          if (p !== 0) return p
          return (a.deadline ?? "").localeCompare(b.deadline ?? "")
        })
        .slice(0, 3),
    [tasks],
  )

  const freshMessage = useMemo(
    () => messages.find((m) => !m.addedToRadar),
    [messages],
  )

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <h1 className={styles.greeting}>
            {getGreeting()}, Артём <span aria-hidden>👋</span>
          </h1>
          <p className={styles.date}>{formatFullDate(TODAY)}</p>
        </div>
        <button className={styles.lost} onClick={openLost}>
          <span aria-hidden>🧭</span> Я потерялся
        </button>
      </header>

      {/* Сегодня */}
      <section className={styles.today}>
        <span className={styles.todayTitle}>Сегодня</span>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{stats.lessonsToday}</span>
            <span className={styles.statLabel}>
              {plural(stats.lessonsToday, "урок", "урока", "уроков")}
            </span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={`${styles.statNum} ${styles.statAccent}`}>
              {stats.important}
            </span>
            <span className={styles.statLabel}>
              {plural(stats.important, "важное дело", "важных дела", "важных дел")}
            </span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{stats.upcoming}</span>
            <span className={styles.statLabel}>
              {plural(
                stats.upcoming,
                "дедлайн близко",
                "дедлайна близко",
                "дедлайнов близко",
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Важно сейчас */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Важно сейчас</h2>
          <span className={styles.hint}>то, что действительно важно</span>
        </div>
        <div className={styles.cards}>
          {importantNow.map((t, i) => (
            <TaskCard key={t.id} task={t} onOpen={openTask} index={i} />
          ))}
        </div>
      </section>

      {/* Новое */}
      {freshMessage && (
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Новое</h2>
          </div>
          <div className={styles.fresh}>
            <div className={styles.freshTop}>
              <span className={styles.freshIcon} aria-hidden>
                📩
              </span>
              <div className={styles.freshText}>
                <p className={styles.freshMsg}>
                  Учитель {freshMessage.subject.toLowerCase()} отправил новое
                  задание
                </p>
                <p className={styles.freshQuote}>«{freshMessage.text}»</p>
                <span className={styles.freshMeta}>
                  {freshMessage.subject} · {freshMessage.receivedAt}
                </span>
              </div>
            </div>
            <div className={styles.freshActions}>
              <button
                className={styles.freshPrimary}
                onClick={() => addTaskFromMessage(freshMessage.id)}
              >
                Добавить на радар
              </button>
              <button className={styles.freshGhost} onClick={() => setTab("inbox")}>
                Подробнее
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Подсказка про приоритеты */}
      <div className={styles.footNote}>
        <PriorityBadge priority="high" dotOnly /> срочно ·{" "}
        <PriorityBadge priority="medium" dotOnly /> внимание ·{" "}
        <PriorityBadge priority="low" dotOnly /> можно позже
      </div>
    </div>
  )
}