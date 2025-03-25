import CardSlider from "@/components/Slider";
import styles from "./index.module.scss";
import BlueprintCard from "@/components/Card/BlueprintCard";
import ProductCard from "@/components/Card/ProductCard";
import SectionCard from "@/components/Card/SectionCard";

const CampaignForm = () => {

    return (
        <form className={styles.form}>
            <CardSlider cards={[<SectionCard key="3" />, <BlueprintCard key="1"/>, <ProductCard key="2"/>]} />
        </form>
    );
};

export default CampaignForm;
