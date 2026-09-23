import { useEffect } from "react"
import { AppProvider, useApp } from "./context/AppContext"
import { BottomNavigation } from "./components/BottomNavigation/BottomNavigation"
import { Modal } from "./components/Modal/Modal"
import { TaskDetail } from "./components/TaskDetail/TaskDetail"
import { LostScreen } from "./components/LostScreen/LostScreen"
import { Home } from "./pages/Home/Home"
import { Inbox } from "./pages/Inbox/Inbox"
import { Week } from "./pages/Week/Week"
import { Profile } from "./pages/Profile/Profile"
import { Auth } from "./pages/Auth/Auth"

function Shell() {
  const {
    authenticated,
    activeTab,
    selectedTaskId,
    lostOpen,
    closeTask,
    closeLost,
    tasks,
    theme,
  } = useApp()
  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    !authenticated ? <Auth /> :
    <div className="app-shell">
      <div className="app-frame">
        <main className="app-content" key={activeTab}>
          {activeTab === "home" && <Home />}
          {activeTab === "inbox" && <Inbox />}
          {activeTab === "week" && <Week />}
          {activeTab === "profile" && <Profile />}
        </main>

        <BottomNavigation />

        {/* Карточка задания */}
        <Modal open={!!selectedTask} onClose={closeTask}>
          {selectedTask && <TaskDetail task={selectedTask} />}
        </Modal>

        {/* «Я потерялся» */}
        <Modal open={lostOpen} onClose={closeLost}>
          <LostScreen />
        </Modal>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}