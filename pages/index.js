import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the app</h1>

        <p className={styles.description}>
          Take notes about a thing, or pass the thing to the next person
        </p>

        <div className={styles.grid}>
          <Link href="/new">
            <a className={styles.card}>
              {' '}
              <h3>New Thing &rarr;</h3>
              <p>Create notes about a new thing.</p>
            </a>
          </Link>
          <Link href="/scan">
            <a className={styles.card}>
              {' '}
              <h3>Pass the Thing &rarr;</h3>
              <p>Pass the thing to someone else.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
