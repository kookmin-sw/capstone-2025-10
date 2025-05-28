import styles from "./page.module.scss";
import CampaignForm from "@/components/Form/CampaignForm";
import { fetchWithSession } from "@/lib/fetchWithSession";

async function getCampaign(id) {
  const response = await fetchWithSession(
    `https://back.offflow.co.kr/api/dashboard/test1/${id}`,
  );
  return response;
}

export default async function Campaign({ params }) {
  const { id } = await params;
  const campaign = await getCampaign(id);
  console.log(campaign);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CampaignForm campaign={campaign} dashboardId={id} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
