"use client";

import CardSlider from "@/components/Slider";
import styles from "./index.module.scss";
import BlueprintCard from "@/components/Card/BlueprintCard";
import ProductCard from "@/components/Card/ProductCard";
import SectionCard from "@/components/Card/SectionCard";
import { useState } from "react";
import useImageUpload from "@/hooks/useImageUpload";
import { getSectionFromCampaign } from "@/utils/sectionUtils";

const CampaignForm = ({ campaign }) => {
  const [sections, setSections] = useState(getSectionFromCampaign(campaign));
  const [products, setProducts] = useState([]);
  const upload = useImageUpload();
  console.log(sections);

  return (
    <form className={styles.form}>
      <CardSlider
        cards={[
          <BlueprintCard
            key="1"
            sections={sections}
            setSections={setSections}
            upload={upload}
          />,
          <ProductCard products={products} setProducts={setProducts} key="2" />,
          <SectionCard
            key="2"
            sections={sections}
            setSections={setSections}
            image={upload.file}
          />,
        ]}
      />
    </form>
  );
};

export default CampaignForm;
