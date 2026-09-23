import type { ReactElement } from "react"
import type { Tab } from "../../types"
import { useApp } from "../../context/AppContext"
import styles from "./BottomNavigation.module.css"

interface Item {
  tab: Tab
  label: string
  icon: (active: boolean) => ReactElement
}

const ITEMS: Item[] = [
  {
    tab: "home",
    label: "Главная",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10.5 12 3l9 7.5"
          stroke="currentColor"
          strokeWidth={a ? 2.2 : 1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"
          stroke="currentColor"
          strokeWidth={a ? 2.2 : 1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    tab: "inbox",
    label: "Входящие",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 13v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
          stroke="currentColor"
          strokeWidth={a ? 2.2 : 1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 13h4l1.5 2h5L16 13h4M12 4v9"
          stroke="currentColor"
          strokeWidth={a ? 2.2 : 1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    tab: "week",
    label: "Неделя",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth={a ? 2.2 : 1.9} />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth={a ? 2.2 : 1.9} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tab: "profile",
    label: "Профиль",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth={a ? 2.2 : 1.9} />
        <path
          d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"
          stroke="currentColor"
          strokeWidth={a ? 2.2 : 1.9}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export function BottomNavigation() {
  const { activeTab, setTab } = useApp()
  return (
    <nav className={styles.nav}>
      {ITEMS.map((item) => {
        const active = activeTab === item.tab
        return (
          <button
            key={item.tab}
            className={`${styles.item} ${active ? styles.active : ""}`}
            onClick={() => setTab(item.tab)}
            aria-current={active ? "page" : undefined}
          >
            <span className={styles.icon}>{item.icon(active)}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}