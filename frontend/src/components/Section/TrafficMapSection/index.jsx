"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import MyCanvas, { drawSectionArrows } from "@/components/Canvas";
import ImageGrid from "@/components/ImageGrid";
import CardContainer from "@/components/CardContainer";

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 70%, 70%, 0.4)`; // pastel tone with transparency
};

const TrafficMapSection = () => {
  const canvasRef = useRef(null);
  const [sections, setSection] = useState([
    {
      name: "test1",
      cells: Array.from([1, 2, 3, 4]),
      color: generateRandomColor(),
    },
    {
      name: "test2",
      cells: Array.from([31, 32, 33, 34]),
      color: generateRandomColor(),
    },
    {
      name: "test3",
      cells: Array.from([97, 98, 99, 100]),
      color: generateRandomColor(),
    },
  ]);
  const [image, setImage] = useState("test.png");

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const gridCols = 10;
    const cellSize = 480 / 10;
    const arrows = [
      { from: 0, to: 1 }, // section index A → B
      { from: 1, to: 2 }, // section index B → C
    ];

    drawSectionArrows(ctx, sections, arrows, gridCols, cellSize);
  }, []);

  return (
    <section className={styles.section}>
      <CardContainer showDivider={false} margin="40px">
        <div className={styles["image-grid-wrapper"]}>
          {image && (
            //<img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
            <img src={image} alt="Uploaded Preview" />
          )}
          <ImageGrid sections={sections} />
          <div className={styles.canvas}>
            <MyCanvas canvasRef={canvasRef} />
          </div>
        </div>
      </CardContainer>
      <CardContainer showDivider={false} margin="40px">
        {/* User List */}
      </CardContainer>

      <div className={styles["filter-wrapper"]}></div>
    </section>
  );
};

export default TrafficMapSection;
