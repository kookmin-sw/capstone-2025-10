"use client";

import React, { useRef } from "react";
import styles from "./index.module.scss";
import ImageGrid from "@/components/ImageGrid";
import CardContainer from "@/components/CardContainer";
import RequireLogin from "@/components/Login/RequireLogin";
import ArrowCanvas from "@/components/Canvas/ArrowCanvas";

const gridCols = 10;
const cellSize = 480 / 10;

function generateArrowsFromTracking(
  trackingData,
  sections,
  imageWidth, // 예: 480
  imageHeight, // 예: 480
  gridCols,
  gridRows,
  originalImageWidth, // 예: 1080
  originalImageHeight, // 예: 720
) {
  const scaleX = imageWidth / originalImageWidth;
  const scaleY = imageHeight / originalImageHeight;

  const normalized = trackingData.map((track) => ({
    x: track.x * scaleX,
    y: track.y * scaleY,
  }));

  const cellSizeX = imageWidth / gridCols;
  const cellSizeY = imageHeight / gridRows;

  const visitedSectionIndices = [];

  for (const { x, y } of normalized) {
    const col = Math.floor(x / cellSizeX);
    const row = Math.floor(y / cellSizeY);
    const cellIndex = row * gridCols + col;

    console.log(
      `x=${x}, y=${y}, col=${col}, row=${row}, cellIndex=${cellIndex}`,
    );

    const sectionIdx = sections.findIndex((s) => s.cells.includes(cellIndex));
    console.log("sectionIdx", sectionIdx);

    if (
      sectionIdx !== -1 &&
      sectionIdx !== visitedSectionIndices[visitedSectionIndices.length - 1]
    ) {
      visitedSectionIndices.push(sectionIdx);
    }
  }

  const arrows = [];
  for (let i = 0; i < visitedSectionIndices.length - 1; i++) {
    arrows.push({
      from: visitedSectionIndices[i],
      to: visitedSectionIndices[i + 1],
    });
  }

  return arrows;
}

const TrafficMapSection = ({ sections, trafficPoints, image }) => {
  const canvasRef = useRef(null);

  //if (Object.keys(sections).length === 0) {
  //  //router.push("/login");
  //  return <RequireLogin></RequireLogin>;
  //}

  return (
    <RequireLogin>
      <section className={styles.section}>
        <CardContainer showDivider={false} margin="40px">
          <div className={styles["image-grid-wrapper"]}>
            {image && <img src={image} alt="Uploaded Preview" />}
            <ImageGrid sections={sections} />
            <div className={styles.canvas}>
              <ArrowCanvas
                canvasRef={canvasRef}
                sections={sections}
                arrows={generateArrowsFromTracking(
                  [
                    { x: 408, y: 120 }, // test1
                    { x: 456, y: 264 }, // test2
                  ],
                  sections,
                  480,
                  480,
                  10,
                  10,
                  480, // 👈 원본 이미지 width
                  480, // 👈 원본 이미지 height
                )}
                gridCols={gridCols}
                cellSize={cellSize}
              />
            </div>
          </div>
        </CardContainer>

        <CardContainer showDivider={false} margin="40px">
          {/* User List */}
        </CardContainer>

        <div className={styles["filter-wrapper"]}></div>
      </section>
    </RequireLogin>
  );
};

export default TrafficMapSection;
