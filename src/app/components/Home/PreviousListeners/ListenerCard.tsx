import Image from 'next/image';
import styles from './listenercard.module.css';

export default function ListenerCard({ quote, listenerName, courseNumber, imageSrc, imageAlt }: { quote: string; listenerName: string; courseNumber: string; imageSrc: string; imageAlt: string }) {
  return (
    <li className={styles["listener-card"]}>
        <div className={styles["listener-card-layout"]}>
            <article className={styles["listener-card-text"]}>
                <p className="margin-top-0 margin-bottom-0"><strong>“{quote}”</strong></p>
                <p className={`margin-bottom-0 ${styles["listener-name"]}`}><em>{listenerName},<br />from the {courseNumber} mini-course</em></p>
            </article>
            <Image className={`${styles["listener-card-image"]} ${courseNumber === "first" ? styles["listener-card-transform-1"] : styles["listener-card-transform-2"]}`} src={imageSrc} alt={imageAlt} width={120} height={120} />
        </div>
    </li>
  )
}