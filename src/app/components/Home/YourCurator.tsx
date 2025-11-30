import Link from "next/link";
import Image from "next/image";
import styles from './yourcurator.module.css';

export default function YourCurator() {
  return (
    <section className="bg-color-secondary padding-bottom-s">
      <section className="u-container">
        <h2>Your Curator</h2>
        <div className={styles["curator-layout"]}>
            <article className={styles["curator-text"]}>
            <p className="margin-top-0">Hi! I’m <Link href="https://danilocangucu.net">Danilo Canguçu</Link>, and music has always been a big part of my life. I listen to a huge amount of it every day. It helps me focus when I’m working, relax and travel somewhere else in my mind, and stay connected to my mother tongue and Brazilian roots — among many other things.</p>
                <p>About ten years ago, I invited a small group of friends to my home in La Macarena, Bogotá, for our first informal music gathering. A few years later, I started a new group in another home in the same neighborhood, continuing these musical evenings. Together, we explored what I consider the essentials for anyone’s first encounter with Brazilian music.</p>
            <p className="margin-bottom-0">That wish to share Brazilian music in an open and welcoming way has never left me. I am offering this mini-course again and it would be a pleasure to have you with me!</p>
            </article>
            <Image className={styles["curator-image"]} src="/danilo-ziriguidum.png" alt="Danilo Canguçu" width={250} height={250} />
        </div>
      </section>
    </section>
  )
}
