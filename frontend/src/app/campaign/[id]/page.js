import styles from "./page.module.scss";
import CampaignForm from "@/components/Form/CampaignForm";
import { fetchWithSession } from "@/lib/fetchWithSession";

async function getCampaign(id) {
  return await fetchWithSession(
    `http://localhost:8080/api/dashboard/test1/${id}`,
  );
}

export default async function Campaign({ params }) {
  const { id } = await params;
  const campaign = await getCampaign(id);
  console.log(campaign);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CampaignForm campaign={campaign} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
