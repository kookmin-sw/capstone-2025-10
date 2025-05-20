import TrafficMapSection from "@/components/Section/TrafficMapSection";
import styles from "./page.module.scss";
import { getSectionFromCampaign } from "@/utils/sectionUtils";
import { fetchWithSession } from "@/lib/fetchWithSession";

async function getCampaign(id) {
  return await fetchWithSession(
    `http://localhost:8080/api/dashboard/test1/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
}

async function getTrafficPointData(id) {
  function transformTrackingData(raw) {
    console.log(raw);
    const imageWidth = 480;
    const imageHeight = 480;
    const gridWidth = 20;
    const gridHeight = 20;
    return raw.map((item) => {
      const [gridX, gridY] = JSON.parse(item.gridList)[0].map(Number);

      return {
        id: item.id,
        dashboardId: item.dashboardId,
        createdAt: item.detectedTime,
        x: gridX,
        y: gridY,
        userLabel: item.visitorLabel,
      };
    });
  }

  return transformTrackingData(
    await fetchWithSession(`http://localhost:8080/api/tracking/${id}`, {
      cache: "no-store",
      credentials: "include",
    }),
  );
}

export default async function TrafficMapPage({ params }) {
  const { id } = await params;

  const [campaign, trafficPoints] = await Promise.all([
    getCampaign(id),
    getTrafficPointData(id),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TrafficMapSection
          sections={getSectionFromCampaign(campaign)}
          dashboardId={id}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
