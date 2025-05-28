import styles from "./page.module.scss";
import CampaignForm from "@/components/Form/CampaignForm";
import { fetchWithSession } from "@/lib/fetchWithSession";

async function getCampaign(id) {
  return await fetchWithSession(
    `https://back.offflow.co.kr/api/dashboard/test1/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );
}

export default async function Campaign({ params }) {
  const { id } = await params;
  const campaign = await getCampaign(id);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CampaignForm campaign={campaign} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
