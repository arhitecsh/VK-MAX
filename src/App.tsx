import { AppProvider, useApp } from "./context/AppContext"
import { BottomNavigation } from "./components/BottomNavigation/BottomNavigation"
import { Modal } from "./components/Modal/Modal"
import { TaskDetail } from "./components/TaskDetail/TaskDetail"
import { LostScreen } from "./components/LostScreen/LostScreen"
import { Home } from "./pages/Home/Home"
import { RadarPage } from "./pages/Radar/RadarPage"
import { Inbox } from "./pages/Inbox/Inbox"
import { Week } from "./pages/Week/Week"
import { Profile } from "./pages/Profile/Profile"

function Shell() {
  const { activeTab, selectedTaskId, lostOpen, closeTask, closeLost, tasks } =
    useApp()
  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  return (
    <div className="app-shell">
      <div className="app-frame">
        <main className="app-content" key={activeTab}>
          {activeTab === "home" && <Home />}
          {activeTab === "radar" && <RadarPage />}
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