import styles from './page.module.css';
import HotTakes from 'hottake/app/HotTakes';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HotTakes />
      </main>
    </div>
  );
}
