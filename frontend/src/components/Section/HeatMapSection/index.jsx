"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import CardContainer from "@/components/CardContainer";
import RequireLogin from "@/components/Login/RequireLogin";
import HeatmapCanvas from "@/components/Canvas/HeatmapCanvas";
import Image from "next/image";
import ImageGrid from "@/components/ImageGrid";

const gridCols = 10;
const gridRows = 10;
const cellSize = 48; // 예시 (480px 이미지 기준)

const HeatmapSection = ({ sections, image, dashboardId }) => {
  const canvasRef = useRef(null);
  const [heatmapData, setHeatmapData] = useState({}); // ✅ 객체 형태 유지

  const fetchHeatmap = useCallback(async () => {
    try {
      const res = await fetch(
        `https://back.offflow.co.kr/api/heatmap/${dashboardId}`,
        {
          cache: "no-store",
          credentials: "include",
        },
      );
      const data = await res.json();
      const newHeatmapData = {};
      if (data.length === 0) {
        return;
      }

      const dataList = data[data.length - 1].gridList;

      // ✅ 필터 제거, 음수 좌표도 반영
      const gridList = JSON.parse(dataList).map(([x, y]) => [
        Math.round(x),
        Math.round(y),
      ]);

      console.log("✅ gridList (raw):", gridList);

      // ✅ 좌표별 value 누적
      gridList.forEach(([x, y]) => {
        const key = `${x},${y}`;
        newHeatmapData[key] = (newHeatmapData[key] || 0) + 1;
      });

      console.log("🔥 heatmapData (aggregated):", newHeatmapData);
      setHeatmapData(newHeatmapData);
    } catch (err) {
      console.error("❌ fetchHeatmap 실패", err);
    }
  }, [dashboardId]);

  useEffect(() => {
    const interval = setInterval(fetchHeatmap, 1500);
    fetchHeatmap(); // 초기 1회 호출
    return () => clearInterval(interval);
  }, [fetchHeatmap]);

  return (
    <RequireLogin>
      <section className={styles.section}>
        <div className={styles["header"]}>
          <p>실시간 HEATMAP</p>
        </div>
        <CardContainer showDivider={false} margin="40px">
          <div className={styles["image-grid-wrapper"]}>
            <Image
              src="/output_result.png"
              alt={"img"}
              width={1080}
              height={608}
            />
            <ImageGrid sections={sections} />
            <div className={styles.canvas}>
              <HeatmapCanvas
                canvasRef={canvasRef}
                heatmapData={heatmapData}
                originalWidth={1280}
                originalHeight={724}
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
