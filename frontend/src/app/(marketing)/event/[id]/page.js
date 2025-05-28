// app/dashboard/[id]/page.jsx
import styles from "./page.module.scss";
import { fetchWithSession } from "@/lib/fetchWithSession";
import EventSection from "@/components/Section/EventSection";

async function getVisitorData(id) {
  return await fetchWithSession(`https://back.offflow.co.kr/api/event/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
}

export default async function Event({ params }) {
  const { id } = await params;
  const visitors = await getVisitorData(id);
  console.log(visitors);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <EventSection events={visitors} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
