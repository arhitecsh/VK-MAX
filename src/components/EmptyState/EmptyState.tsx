import type { ReactNode } from "react"
import styles from "./EmptyState.module.css"

interface Props {
  icon?: ReactNode
  title: string
  subtitle?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, subtitle, action }: Props) {
  return (
    <div className={styles.wrap}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title} style={{ color: '#ffffff' }}>{title}</h3>
      {subtitle && <p className={styles.subtitle} style={{ color: '#ffffff' }}>{subtitle}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}