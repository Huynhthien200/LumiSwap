import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/globals.css';

export default function Home() {
  const router = useRouter();

  const handleLaunchDapp = () => {
    router.push('/swap'); // Điều hướng đến trang swap
  };

  return (
    <div className="container">
      <Head>
        <title>1inch Clone - Next.js</title>
        <meta name="description" content="One-stop access to decentralized finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span>1inch</span>
        </div>
        <nav className="nav">
          <a href="#">Products</a>
          <a href="#">Developers</a>
          <a href="#">About</a>
          <a href="#">Governance</a>
          <a href="#">Blog</a>
        </nav>
        <button className="launchButton" onClick={handleLaunchDapp}>
          Launch dApp
        </button>
      </header>

      {/* Main Content */}
      <main className="main">
        <h1 className="title">One-stop access</h1>
        <p className="subtitle">to decentralized finance</p>
        
        <div className="buttons">
          <button className="launchButton" onClick={handleLaunchDapp}>Launch dApp</button>
          <div className="storeButtons">
            <button className="storeButton">Download on the App Store</button>
            <button className="storeButton">Get in on Google Play</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 1inch Clone - Built with Next.js</p>
      </footer>
    </div>
  );
}
