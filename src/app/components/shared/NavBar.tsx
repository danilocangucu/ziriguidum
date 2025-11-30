import Link from "next/link";
import styles from "./navbar.module.css";

export function NavBar({ isSignUpPage }: { isSignUpPage: boolean }) {
  return (
    <header className={styles.navbar}>
      <nav className="u-container">
        <ul className={styles.ul}>
          <li className={styles['nav-logo']}>
            <Link className={styles['text-decoration-none']} href="/">Ziriguidum</Link>
        </li>
        {!isSignUpPage && (
            <li className={styles['nav-signup']}>
              <Link href="/sign-up">Sign up</Link>
        </li>
        )}
        </ul>
      </nav>
    </header>
  )
}