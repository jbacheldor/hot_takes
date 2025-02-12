import styles from './page.module.css';
import { redirect } from 'next/navigation'


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          {redirect(`/createhottake`)}
      </main>
    </div>
  );
}
