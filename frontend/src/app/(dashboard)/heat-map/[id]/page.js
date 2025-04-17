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
    `http://localhost:8080/api/dashboard/test1/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
}

function transformToHeatmapData(data) {
  const heatmapData = {};

  const gridList = JSON.parse(data[data.length - 1].gridList); // 문자열을 파싱

  gridList.forEach(([x, y]) => {
    const key = `${x},${y}`;
    heatmapData[key] = (heatmapData[key] || 0) + 1;
  });

  return heatmapData;
}

export default async function Heatmap({ params }) {
  const { id } = await params;
  const [campaign, heatmapData] = await Promise.all([
    getCampaign(id),
    getHeatmapData(id),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeatmapSection
          heatmapData={transformToHeatmapData(heatmapData)}
          sections={getSectionFromCampaign(campaign)}
        />
      </main>
    </div>
  );
}
