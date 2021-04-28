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
              <p>Create notes about a new thing and pass them over.</p>
            </a>
          </Link>
          <Link href="/all">
            <a className={styles.card}>
              {' '}
              <h3>See all Things &rarr;</h3>
              <p>See all the things you have created.</p>
            </a>
          </Link>
          <Link href="/scan">
            <a className={styles.card}>
              {' '}
              <h3>Get the Thing &rarr;</h3>
              <p>Get the thing from someone else.</p>
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
