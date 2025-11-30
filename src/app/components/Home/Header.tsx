import styles from './header.module.css';

export default function Header() {
  return (
<section className={`u-container ${styles.intro}`}>
  <header>
    <h1 className={styles.h1}>Ziriguidum</h1>
    <p className={styles.p}><em>An essential Brazilian music mini-course, explained and felt.</em></p>
  </header>
</section>

  )
}
