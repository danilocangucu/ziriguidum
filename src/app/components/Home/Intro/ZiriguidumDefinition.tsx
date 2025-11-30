import styles from './ziriguidumdefinition.module.css';

export default function ZiriguidumDefinition() {
  return (
    <>
    <article className={styles.article}>
      <header className={styles.header}>
        <p className={styles["header-p"]}><strong>zi-ri-gui-dum</strong></p>
        <p className={styles["header-p"]}>/ˌzi.ˈɾi.ɡwi.ˈdum/</p>
        <p className={styles["header-p"]}>noun</p>
        <p className={styles["header-p"]}>(Brazilian Portuguese, informal)</p>
      </header>

      <dl>
        <dt>1. Music</dt>
        <dd>
          A playful, onomatopoeic term used to represent lively rhythmic sounds
          in music, especially in samba and other Brazilian genres.
        </dd>

        <dt className="margin-top-xs">2. Figurative</dt>
        <dd>Used metaphorically to evoke energy, joy, and musical swing.</dd>
      </dl>

      <p>
        <em>Example: “The percussion didn’t shout, but its ziriguidum gave the song
        a heartbeat.”</em>
      </p>
    </article>
          <p>
        While a dictionary could define <em>ziriguidum</em> as above, its true
        essence is in the experience. In Brazil, we grow up immersed in music,
        feeling rhythms everywhere. <strong>Now, you can experience it yourself by
        joining my mini-course on Brazilian music!</strong>
      </p>
      </>
  );
}
