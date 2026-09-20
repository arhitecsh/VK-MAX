import { useMemo } from "react"
import type { Task } from "../../types"
import { useApp } from "../../context/AppContext"
import { formatDeadlineShort, formatMinutes } from "../../lib/format"
import { PriorityBadge } from "../PriorityBadge/PriorityBadge"
import styles from "./LostScreen.module.css"

const PRIORITY_ORDER: Record<Task["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
}

const KIND_ICON: Record<Task["kind"], string> = {
  exam: "📝",
  lab: "🧪",
  homework: "📚",
  reading: "📖",
  event: "📌",
}

export function LostScreen() {
  const { tasks, openTask, closeLost } = useApp()

  const { total, top } = useMemo(() => {
    const open = tasks.filter((t) => t.status !== "completed")
    const sorted = [...open].sort((a, b) => {
      const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      if (p !== 0) return p
      return (a.deadline ?? "").localeCompare(b.deadline ?? "")
    })
    return { total: open.length, top: sorted.slice(0, 2) }
  }, [tasks])

  const startFirst = () => {
    if (top[0]) {
      closeLost()
      openTask(top[0].id)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.compass} aria-hidden>
        🧭
      </div>
      <h1 className={styles.title}>Спокойно, разберёмся.</h1>
      <p className={styles.subtitle}>
        Сейчас у тебя {total}{" "}
        {total === 1
          ? "незавершённое учебное дело"
          : total < 5
            ? "незавершённых учебных дела"
            : "незавершённых учебных дел"}
        . Но действительно важны только{" "}
        <b>{top.length}</b>.
      </p>

      <div className={styles.list}>
        {top.map((t, i) => (
          <button
            key={t.id}
            className={styles.item}
            onClick={() => {
              closeLost()
              openTask(t.id)
            }}
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className={styles.order}>{i + 1}</span>
            <span className={styles.icon}>{KIND_ICON[t.kind]}</span>
            <span className={styles.body}>
              <span className={styles.itemTitle}>{t.title}</span>
              <span className={styles.itemMeta}>
                {t.deadline && formatDeadlineShort(t.deadline)}
                {t.estimatedTime && (
                  <>
                    {" · "}~{formatMinutes(t.estimatedTime)}
                  </>
                )}
              </span>
            </span>
            <PriorityBadge priority={t.priority} />
          </button>
        ))}
      </div>

      <button className={styles.cta} onClick={startFirst}>
        Начать с первого
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button className={styles.dismiss} onClick={closeLost}>
        Пока не нужно
      </button>
    </div>
  )
}