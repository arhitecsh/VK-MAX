import type { Task, TaskStatus } from "../../types"
import { useApp } from "../../context/AppContext"
import { formatDeadline, formatMinutes } from "../../lib/format"
import { PriorityBadge } from "../PriorityBadge/PriorityBadge"
import styles from "./TaskDetail.module.css"

const KIND_ICON: Record<Task["kind"], string> = {
  exam: "📝",
  lab: "🧪",
  homework: "📚",
  reading: "📖",
  event: "📌",
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "Не начинал" },
  { value: "in_progress", label: "В процессе" },
  { value: "completed", label: "Готово" },
]

interface Props {
  task: Task
}

export function TaskDetail({ task }: Props) {
  const { setTaskStatus, completeTask } = useApp()
  const done = task.status === "completed"

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.icon}>{KIND_ICON[task.kind]}</span>
        <div className={styles.headText}>
          <span className={styles.subject}>{task.subject}</span>
          <h2 className={styles.title}>{task.title}</h2>
        </div>
      </div>

      <div className={styles.row}>
        <PriorityBadge priority={task.priority} />
        {task.estimatedTime && (
          <span className={styles.eta}>~{formatMinutes(task.estimatedTime)}</span>
        )}
      </div>

      {task.deadline && (
        <div className={styles.deadline}>
          <span className={styles.label}>Дедлайн</span>
          <span className={styles.value}>{formatDeadline(task.deadline)}</span>
        </div>
      )}

      {task.description && <p className={styles.desc}>{task.description}</p>}

      {/* Откуда это? — прозрачность источника */}
      {task.sourceLabel && (
        <div className={styles.source}>
          <span className={styles.sourceTitle}>Откуда это?</span>
          <div className={styles.sourceBody}>
            <span className={styles.sourceIcon}>📩</span>
            <div>
              <div className={styles.sourceLabel}>{task.sourceLabel}</div>
              {task.sourceTime && (
                <div className={styles.sourceTime}>{task.sourceTime}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {task.attachment && (
        <button className={styles.file}>
          <span className={styles.fileIcon}>📎</span>
          <span className={styles.fileName}>{task.attachment}</span>
          <span className={styles.fileOpen}>Открыть</span>
        </button>
      )}

      {/* Статус */}
      <div className={styles.statusBlock}>
        <span className={styles.statusLabel}>Статус</span>
        <div className={styles.statusRow}>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`${styles.statusBtn} ${
                task.status === opt.value ? styles[task.status] : ""
              }`}
              onClick={() => setTaskStatus(task.id, opt.value)}
            >
              <span className={styles.radio} aria-hidden />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Действия */}
      <div className={styles.actions}>
        {done ? (
          <button
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={() => setTaskStatus(task.id, "in_progress")}
          >
            Вернуть в работу
          </button>
        ) : (
          <>
            <button
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={() => setTaskStatus(task.id, "in_progress")}
            >
              Начать
            </button>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => completeTask(task.id)}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Готово
            </button>
          </>
        )}
      </div>
    </div>
  )
}