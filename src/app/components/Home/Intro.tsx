import styles from "./intro.module.css";

export default function Intro() {
  return (
    <section className={`u-container ${styles.intro}`}>
      <h1 className={styles.h1}>Ziriguidum</h1>
      <p className={styles.p}><em>An essential Brazilian music mini-course, explained and felt.</em></p>
    </section>
  );
}
