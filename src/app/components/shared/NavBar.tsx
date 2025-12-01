import Link from "next/link";
import styles from "./navbar.module.css";
import SignUpRouteButton from "./SignUpRouteButton";

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
              <SignUpRouteButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}