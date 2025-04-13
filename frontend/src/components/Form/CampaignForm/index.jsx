"use client";

import CardSlider from "@/components/Slider";
import styles from "./index.module.scss";
import BlueprintCard from "@/components/Card/BlueprintCard";
import ProductCard from "@/components/Card/ProductCard";
import SectionCard from "@/components/Card/SectionCard";
import { useState } from "react";
import useImageUpload from "@/hooks/useImageUpload";
import { getSectionFromCampaign } from "@/utils/sectionUtils";
import RequireLogin from "@/components/Login/RequireLogin";
import { useRouter } from "next/navigation";

const CampaignForm = ({ campaign, dashboardId }) => {
  const router = useRouter();
  const [sections, setSections] = useState(getSectionFromCampaign(campaign));
  const upload = useImageUpload();
  console.log(campaign);

  if (Object.keys(campaign).length === 0) {
    //router.push("/login");
    return <RequireLogin></RequireLogin>;
  }

  return (
    <RequireLogin>
      <form className={styles.form}>
        <CardSlider
          cards={[
            <BlueprintCard
              key="1"
              sections={sections}
              setSections={setSections}
              upload={upload}
              dashboardId={dashboardId}
            />,
            <ProductCard key="2" dashboardId={dashboardId} />,
            <SectionCard
              key="2"
              sections={sections}
              setSections={setSections}
              image={upload.file}
              dashboardId={dashboardId}
            />,
          ]}
        />
      </form>
    </RequireLogin>
  );
};

export default CampaignForm;
