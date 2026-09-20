import type { ReactNode } from "react"
import styles from "./PageHeader.module.css"

interface Props {
  title: string
  subtitle?: string
  right?: ReactNode
}

export function PageHeader({ title, subtitle, right }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {right && <div className={styles.right}>{right}</div>}
    </header>
  )
}