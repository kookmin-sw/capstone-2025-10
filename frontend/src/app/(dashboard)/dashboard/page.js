"use client";

import styles from "./page.module.css";
import DashboardSection from "@/components/Section/DashboardSection";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DashboardSection />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
