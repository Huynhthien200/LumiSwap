import styles from '../styles/Header.module.css';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
        <span>1inch</span>
      </div>
      <nav className={styles.nav}>
        <a href="#">Products</a>
        <a href="#">Developers</a>
        <a href="#">About</a>
        <a href="#">Governance</a>
        <a href="#">Blog</a>
      </nav>
      <button className={styles.launchButton} onClick={() => router.push("/swap")}>
        Launch dApp
      </button>
    </header>
  );
}
