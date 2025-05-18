// app/dashboard/[id]/page.jsx
import styles from "./page.module.scss";
import { fetchWithSession } from "@/lib/fetchWithSession";
import VisitorStatsSection from "@/components/Section/VisitorStatsSection";

async function getVisitorData(id) {
  return await fetchWithSession(`http://localhost:8080/api/gender/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
}

export default async function VisitorStats({ params }) {
  const { id } = await params;
  const visitors = await getVisitorData(id);
  console.log(visitors);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <VisitorStatsSection visitors={visitors} dashboardId={id} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
