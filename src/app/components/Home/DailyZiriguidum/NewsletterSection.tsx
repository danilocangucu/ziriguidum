import { NewsletterForm } from "./NewsletterForm";
import styles from "./newslettersection.module.css";

export default function NewsletterSection() {
  return (
    <section className={styles["newsletter-section"]}>
      <p>A new track awaits you tomorrow! And <strong>every Monday, I’ll send a newsletter with the week’s songs and news about the mini-course</strong>. If you want to receive it, write your email and subscribe below. I’d love to be in your mailbox sharing the music I enjoy the most!</p>
      <NewsletterForm />
    </section>
  )
}