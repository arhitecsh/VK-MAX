import { useMemo } from "react"
import { useApp } from "../../context/AppContext"
import { plural } from "../../lib/format"
import { PageHeader } from "../../components/PageHeader/PageHeader"
import styles from "./Profile.module.css"

export function Profile() {
  const { tasks, resetDemo } = useApp()

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "in_progress").length
    return { total, done, inProgress }
  }, [tasks])

  return (
    <div className={styles.page}>
      <PageHeader title="Профиль" />

      <div className={styles.card}>
        <div className={styles.avatar} aria-hidden>
          А
        </div>
        <div className={styles.name}>Артём</div>
        <div className={styles.grade}>10 «Б» класс</div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{stats.done}</span>
          <span className={styles.statLabel}>
            {plural(stats.done, "выполнено", "выполнено", "выполнено")}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{stats.inProgress}</span>
          <span className={styles.statLabel}>
            {plural(stats.inProgress, "в работе", "в работе", "в работе")}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNum}>{stats.total}</span>
          <span className={styles.statLabel}>
            {plural(stats.total, "задача", "задачи", "задач")}
          </span>
        </div>
      </div>

      <div className={styles.menu}>
        <button className={styles.menuItem}>
          <span className={styles.menuIcon} aria-hidden>🔔</span>
          <span className={styles.menuLabel}>Уведомления</span>
          <span className={styles.menuChevron}>›</span>
        </button>
        <button className={styles.menuItem}>
          <span className={styles.menuIcon} aria-hidden>🎯</span>
          <span className={styles.menuLabel}>Настройки приоритетов</span>
          <span className={styles.menuChevron}>›</span>
        </button>
        <button className={styles.menuItem}>
          <span className={styles.menuIcon} aria-hidden>ℹ️</span>
          <span className={styles.menuLabel}>О приложении</span>
          <span className={styles.menuChevron}>›</span>
        </button>
      </div>

      <button className={styles.reset} onClick={resetDemo}>
        ↺ Сбросить демо
      </button>

      <p className={styles.disclaimer}>
        Это прототип для хакатона. Все данные — тестовые.
      </p>
    </div>
  )
}