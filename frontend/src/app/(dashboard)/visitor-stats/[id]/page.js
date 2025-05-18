import styles from "./page.module.scss";
import { fetchWithSession } from "@/lib/fetchWithSession";
import VisitorStatsSection from "@/components/Section/VisitorStatsSection";

async function getVisitorData(id) {
  return await fetchWithSession(`http://localhost:8080/api/gender/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
}

async function getTrackingData(id) {
  return await fetchWithSession(`http://localhost:8080/api/tracking/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
}

async function getDashboardSections(id) {
  const res = await fetchWithSession(
    `http://localhost:8080/api/dashboard/test1/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
  return res.sections || [];
}

async function getEventList(id) {
  return await fetchWithSession(`http://localhost:8080/api/event/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
}

export default async function VisitorStats({ params }) {
  const { id } = await params;
  const [visitors, trackingData, sections, events] = await Promise.all([
    getVisitorData(id),
    getTrackingData(id),
    getDashboardSections(id),
    getEventList(id),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <VisitorStatsSection
          visitors={visitors}
          trackingData={trackingData}
          sections={sections}
          events={events}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
