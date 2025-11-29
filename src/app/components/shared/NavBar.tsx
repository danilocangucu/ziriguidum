import Link from "next/link";
import styles from "./navbar.module.css";

export function NavBar({ isSignUpPage }: { isSignUpPage: boolean }) {
  return (
    <header className={styles.navbar}>
      <nav className="u-container">
        <ul>
        <li className={styles['nav-logo']}>
          <Link className={styles.a} href="/">Ziriguidum</Link>
        </li>
        {!isSignUpPage && (
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
        )}
        </ul>
      </nav>
    </header>
  )
}