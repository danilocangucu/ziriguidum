import { NewsletterForm } from "./NewsletterForm";
import styles from "./newslettersection.module.css";

export default function NewsletterSection() {
  return (
    <section className={styles["newsletter-section"]}>
      <p>Every Monday, I send a small newsletter with the week’s songs and some mini-course news. If you are interested, leave your email below. I’d love to share the music that inspires me and am honoured to make your week a little warmer!</p>
      <NewsletterForm />
    </section>
  )
}