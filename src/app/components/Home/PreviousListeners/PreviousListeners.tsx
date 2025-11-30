import ListenerCard from "./ListenerCard";
import styles from './previouslisteners.module.css';

export default function PreviousListeners() {
  return (
    <section className="u-container">
      <h2>Previous Listeners</h2>
  <ul className={styles.ul}>
      <ListenerCard 
      quote="A lovely opportunity to discover Brazilian music."
      listenerName="Antonio Ochoa Flórez"
      courseNumber="first"
      imageSrc="/antonio-ziriguidum.png"
      imageAlt="Antonio Ochoa Flórez"
      />
      <ListenerCard
      quote="I loved how immersive the mini-course was. From the music to the anecdotes and the different playlists, every session made me feel connected to Brazil and its culture. Those playlists even became some of my favorites."
      listenerName="Juliana García Mutis"
      courseNumber="second"
      imageSrc="/juliana-ziriguidum.png"
      imageAlt="Juliana García Mutis"
      />
      </ul>
    </section>
  )
}
