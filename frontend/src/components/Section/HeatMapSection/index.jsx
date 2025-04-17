"use client";

import React, { useRef } from "react";
import styles from "./index.module.scss";
import ImageGrid from "@/components/ImageGrid";
import CardContainer from "@/components/CardContainer";
import RequireLogin from "@/components/Login/RequireLogin";
import HeatmapCanvas from "@/components/Canvas/HeatmapCanvas";

const gridCols = 10;
const gridRows = 10;
const cellSize = 48; // 예시 (480px 이미지 기준)

const HeatmapSection = ({ heatmapData, sections, image }) => {
  const canvasRef = useRef(null);

  if (!heatmapData || heatmapData.length === 0) {
    return <RequireLogin />;
  }

  return (
    <RequireLogin>
      <section className={styles.section}>
        <CardContainer showDivider={false} margin="40px">
          <div className={styles["image-grid-wrapper"]}>
            {image && <img src={image} alt="Uploaded Preview" />}
            <ImageGrid sections={sections} />
            <div className={styles.canvas}>
              <HeatmapCanvas
                canvasRef={canvasRef}
                gridCols={gridCols}
                gridRows={gridRows}
                cellSize={cellSize}
                heatmapData={heatmapData}
              />
            </div>
          </div>
        </CardContainer>
        <div className={styles["filter-wrapper"]}></div>
      </section>
    </RequireLogin>
  );
};

export default HeatmapSection;
