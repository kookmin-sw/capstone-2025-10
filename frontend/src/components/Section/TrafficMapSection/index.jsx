"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import CardContainer from "@/components/CardContainer";
import RequireLogin from "@/components/Login/RequireLogin";
import ArrowCanvas from "@/components/Canvas/ArrowCanvas";
import DashboardTable from "@/components/Table/DashboardTable";
import Image from "next/image";

const gridCols = 10;
const cellSize = 480 / 10;

function generateArrowsFromTracking(
  trackingData,
  sections,
  imageWidth,
  imageHeight,
  gridCols,
  gridRows,
  originalImageWidth,
  originalImageHeight,
) {
  const scaleX = imageWidth / originalImageWidth;
  const scaleY = imageHeight / originalImageHeight;

  const normalized = trackingData.map((track) => ({
    x: track.x * scaleX,
    y: track.y * scaleY,
  }));

  const cellSizeX = imageWidth / gridCols;
  const cellSizeY = imageHeight / gridRows;

  const visited = [];

  for (const { x, y } of normalized) {
    const col = Math.floor(x / cellSizeX);
    const row = Math.floor(y / cellSizeY);
    const cellIndex = row * gridCols + col;

    const section = sections.find((s) => s.cells.includes(cellIndex));
    const last = visited[visited.length - 1];

    if (section && (!last || last.id !== section.id)) {
      const cellsXY = section.cells.map((idx) => [
        idx % gridCols,
        Math.floor(idx / gridCols),
      ]);
      visited.push({ id: section.id, cells: cellsXY });
    } else if (!section) {
      // 구역 없는 경우도 연결해주기 위해 직접 XY 추가
      visited.push({
        id: `untracked-${x},${y}`,
        cells: [[Math.floor(x / cellSizeX), Math.floor(y / cellSizeY)]],
      });
    }
  }

  const arrows = [];
  for (let i = 0; i < trackingData.length - 1; i++) {
    arrows.push({
      from: { x: trackingData[i].x * scaleX, y: trackingData[i].y * scaleY },
      to: {
        x: trackingData[i + 1].x * scaleX,
        y: trackingData[i + 1].y * scaleY,
      },
      userId: trackingData[i]?.userLabel || `user-${i}`,
    });
  }

  return arrows;
}

const TrafficMapSection = ({ sections, trafficPoints, image }) => {
  const canvasRef = useRef(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const allArrows = generateArrowsFromTracking(
    trafficPoints,
    sections,
    1280,
    720,
    10,
    10,
    1280,
    720, // 👈 원본 이미지 height
  );

  const [arrows, setArrows] = useState(allArrows);

  useEffect(() => {
    setArrows(
      allArrows.map((arrow) => {
        if (!selectedSectionId) return { ...arrow, isDimmed: true };
        return {
          ...arrow,
          isDimmed: arrow.userId === selectedSectionId,
        };
      }),
    );
  }, [selectedSectionId]);
  //if (Object.keys(sections).length === 0) {
  //  //router.push("/login");
  //  return <RequireLogin></RequireLogin>;
  //}

  return (
    <RequireLogin>
      <section className={styles.section}>
        <CardContainer showDivider={false} margin="40px">
          <div className={styles["image-grid-wrapper"]}>
            <Image
              src="/output_result.jpg"
              alt={"img"}
              width={1280}
              height={720}
            />
            {/*{image && <img src={"output_result.jpg"} alt="Uploaded Preview" />}*/}
            <div className={styles.canvas}>
              <ArrowCanvas
                canvasRef={canvasRef}
                sections={sections}
                arrows={arrows}
                gridCols={gridCols}
                cellSize={cellSize}
              />
            </div>
          </div>

          <DashboardTable
            trafficPoints={trafficPoints}
            onSectionSelect={setSelectedSectionId}
          />
        </CardContainer>
        {/*<CardContainer showDivider={false} margin="40px">*/}
        {/*  /!* User List *!/*/}
        {/*</CardContainer>*/}

        {/*<div className={styles["filter-wrapper"]}></div>*/}
      </section>
    </RequireLogin>
  );
};

export default TrafficMapSection;
