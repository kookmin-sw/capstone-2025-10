import HeatmapSection from "@/components/Section/HeatMapSection";
import styles from "./page.module.scss";
import { fetchWithSession } from "@/lib/fetchWithSession";
import { getSectionFromCampaign } from "@/utils/sectionUtils";

async function getHeatmapData(id) {
  return await fetchWithSession(`http://localhost:8080/api/heatmap/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
}

async function getCampaign(id) {
  return await fetchWithSession(
    `https://back.offflow.co.kr/api/dashboard/test1/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
}

export default async function Heatmap({ params }) {
  const { id } = await params;
  const [campaign] = await Promise.all([getCampaign(id)]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeatmapSection
          dashboardId={id}
          sections={getSectionFromCampaign(campaign)}
        />
      </main>
    </div>
  );
}
