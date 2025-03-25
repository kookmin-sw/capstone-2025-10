import styles from "./page.module.scss";
import { useModal } from "@/contexts/ModalContext";
import ProductDetailModal from "@/components/Modal/ProductDetailModal";
import CampaignForm from "@/components/Form/CampaignForm";

export default function Campaign() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <CampaignForm />
            </main>
            <footer className={styles.footer}>
            </footer>
        </div>
    );
}
