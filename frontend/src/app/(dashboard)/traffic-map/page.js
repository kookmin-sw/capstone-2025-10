"use client";

import styles from "./page.module.css";
import TrafficMapSection from "@/components/Section/TrafficMapSection";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TrafficMapSection />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
