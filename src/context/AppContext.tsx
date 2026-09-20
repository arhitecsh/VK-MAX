import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { IncomingMessage, Tab, Task, TaskStatus } from "../types"
import { mockTasks } from "../data/mockTasks"
import { mockMessages } from "../data/mockMessages"

// ============================================================
// Глобальное состояние приложения (React state).
// Позже эти действия будут вызывать реальные API-вызовы,
// а пока они оперируют mock-данными.
// ============================================================

interface AppState {
  tasks: Task[]
  messages: IncomingMessage[]
  activeTab: Tab
  selectedTaskId: string | null
  lostOpen: boolean

  setTab: (tab: Tab) => void
  openTask: (id: string) => void
  closeTask: () => void
  openLost: () => void
  closeLost: () => void
  addTaskFromMessage: (messageId: string) => void
  setTaskStatus: (taskId: string, status: TaskStatus) => void
  completeTask: (taskId: string) => void
  resetDemo: () => void
}

const AppContext = createContext<AppState | null>(null)

let idCounter = 0
function genId(prefix = "t"): string {
  idCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [messages, setMessages] = useState<IncomingMessage[]>(mockMessages)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [lostOpen, setLostOpen] = useState(false)

  const setTab = useCallback((tab: Tab) => setActiveTab(tab), [])
  const openTask = useCallback((id: string) => setSelectedTaskId(id), [])
  const closeTask = useCallback(() => setSelectedTaskId(null), [])
  const openLost = useCallback(() => setLostOpen(true), [])
  const closeLost = useCallback(() => setLostOpen(false), [])

  const setTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    )
  }, [])

  const completeTask = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t)),
    )
  }, [])

  /** Создаёт задачу из входящего сообщения (mock "ИИ-классификации"). */
  const addTaskFromMessage = useCallback((messageId: string) => {
    setMessages((prevMsgs) => {
      const msg = prevMsgs.find((m) => m.id === messageId)
      if (!msg || msg.addedToRadar || !msg.suggestedTask) return prevMsgs

      const newTask: Task = {
        ...msg.suggestedTask,
        id: genId(),
        status: "todo",
      }
      setTasks((prevTasks) => [newTask, ...prevTasks])

      return prevMsgs.map((m) =>
        m.id === messageId ? { ...m, addedToRadar: true, taskId: newTask.id } : m,
      )
    })
  }, [])

  const resetDemo = useCallback(() => {
    setTasks(mockTasks)
    setMessages(mockMessages)
    setActiveTab("home")
    setSelectedTaskId(null)
    setLostOpen(false)
  }, [])

  const value = useMemo<AppState>(
    () => ({
      tasks,
      messages,
      activeTab,
      selectedTaskId,
      lostOpen,
      setTab,
      openTask,
      closeTask,
      openLost,
      closeLost,
      addTaskFromMessage,
      setTaskStatus,
      completeTask,
      resetDemo,
    }),
    [
      tasks,
      messages,
      activeTab,
      selectedTaskId,
      lostOpen,
      setTab,
      openTask,
      closeTask,
      openLost,
      closeLost,
      addTaskFromMessage,
      setTaskStatus,
      completeTask,
      resetDemo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}