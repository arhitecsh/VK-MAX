import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { mockSchedule } from "../../data/mockSchedule"
import { dayShort } from "../../lib/format"
import { ScheduleCard } from "../../components/ScheduleCard/ScheduleCard"
import { TaskCard } from "../../components/TaskCard/TaskCard"
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { EmptyState } from "../../components/EmptyState/EmptyState"
import { Modal } from "../../components/Modal/Modal"
import type { ScheduleItem } from "../../types"
import styles from "./Week.module.css"

const DAYS = [0, 1, 2, 3, 4]
const TODAY_DAY = 2

export function Week() {
  const { tasks, openTask } = useApp()
  const [day, setDay] = useState<number>(TODAY_DAY)
  const [selectedLesson, setSelectedLesson] = useState<ScheduleItem | null>(null)

  const lessons = mockSchedule
    .filter((scheduleItem) => scheduleItem.day === day)
    .sort((a, b) => a.number - b.number)
  const dayTasks = tasks.filter((task) => task.day === day)
  const lessonTasks = selectedLesson
    ? tasks.filter(
        (task) =>
          task.day === selectedLesson.day &&
          task.subject.trim().toLocaleLowerCase() ===
            selectedLesson.subject.trim().toLocaleLowerCase(),
      )
    : []

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
            {lessons.map((lesson) => {
              const homeworkCount = tasks.filter(
                (task) =>
                  task.day === lesson.day &&
                  task.subject.trim().toLocaleLowerCase() ===
                    lesson.subject.trim().toLocaleLowerCase(),
              ).length

              return (
                <ScheduleCard
                  key={lesson.id}
                  item={lesson}
                  isToday={day === TODAY_DAY}
                  homeworkCount={homeworkCount}
                  onOpen={() => setSelectedLesson(lesson)}
                />
              )
            })}
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
            {dayTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onOpen={openTask}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        open={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        title={selectedLesson ? `${selectedLesson.subject} · Домашние задания` : undefined}
      >
        {selectedLesson && (
          <div className={styles.lessonModal}>
            <p className={styles.lessonHint}>
              Урок {selectedLesson.number} · {selectedLesson.time}
            </p>
            {lessonTasks.length === 0 ? (
              <EmptyState
                icon={<span aria-hidden>📚</span>}
                title="ДЗ не задано"
                subtitle="Для этого урока пока нет домашних заданий."
              />
            ) : (
              <div className={styles.cards}>
                {lessonTasks.map((task, index) => (
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
        )}
      </Modal>
    </div>
  )
}