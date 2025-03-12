import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>1inch Clone</title>
        <meta name="description" content="Decentralized Finance (DeFi) Platform" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>One-stop access</h1>
        <p className={styles.subtitle}>to decentralized finance</p>
        <div className={styles.buttons}>
          <button className={styles.launchButton} onClick={() => window.location.href = "/swap"}>Launch dApp</button>
          <div className={styles.storeButtons}>
            <button className={styles.storeButton}>Download on the App Store</button>
            <button className={styles.storeButton}>Get it on Google Play</button>
          </div>
        </div>
      </main>
    </div>
  );
}
