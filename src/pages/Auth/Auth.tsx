import { useState } from "react"
import { useApp } from "../../context/AppContext"
import styles from "./Auth.module.css"

export function Auth() {
  const { signIn } = useApp()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    await signIn()
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.brand}><img className={styles.logo} src="/logo.png" alt="" /><span className={styles.brandName}>Мой портфель</span></div>
        <div className={styles.illustrationWrap}>
          <div className={`${styles.orbit} ${styles.orbitOne}`} />
          <div className={`${styles.orbit} ${styles.orbitTwo}`} />
          <img className={styles.illustration} src="/content.png" alt="Яркий портфель" />
          <div className={`${styles.sparkle} ${styles.sparkleOne}`}>✦</div>
          <div className={`${styles.sparkle} ${styles.sparkleTwo}`}>✦</div>
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Твой учебный день — под контролем</p>
          <h1>Всё важное<br /><span>в одном месте</span></h1>
          <p className={styles.description}>Задания, расписание и сообщения от учителей — спокойно, понятно и без лишнего шума.</p>
        </div>
        <button className={styles.loginButton} onClick={handleSignIn} disabled={loading}>
          <span className={styles.sferumIcon}>S</span><span>{loading ? "Подключаем Сферум…" : "Войти через Сферум"}</span>
          {!loading && <span className={styles.arrow}>→</span>}{loading && <span className={styles.loader} />}
        </button>
        <div className={styles.secure}><span className={styles.check}>✓</span><span>Безопасный вход через твой аккаунт Сферум</span></div>
        <div className={styles.features}><span><b>01</b> Следи за задачами</span><span><b>02</b> Не теряй важное</span><span><b>03</b> Успевай больше</span></div>
      </section>
    </main>
  )
}