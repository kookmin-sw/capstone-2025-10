"use client";

import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import Button from "@/components/Button";
import { useModal } from "@/contexts/ModalContext";
import MyCanvas from "@/components/Canvas";
import ImageGrid from "@/components/ImageGrid";

const SectionCard = ({ sections, setSections, image }) => {
  const { openModal, closeModal } = useModal();
  const [focusIndex, setFocusIndex] = useState(null);
  const canvasRef = useRef(null);

  const handleAddSection = (e) => {
    e.preventDefault();
  };

  const handleSave = (name) => {};

  const handleUpdate = (e) => {};

  const handleDeleteSection = (index) => {};

  return (
    <div className={styles["upload-card"]}>
      <div className={styles["image-grid-wrapper"]}>
        {image && (
          <img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
        )}
        <ImageGrid sections={sections} />
        <div className={styles.canvas}>
          <MyCanvas canvasRef={canvasRef} />
        </div>
      </div>
      <div
        className={styles["right-wrapper"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["button-wrapper"]}>
          {focusIndex === null ? (
            <Button onClick={handleAddSection}>Add Section</Button>
          ) : (
            <Button onClick={handleUpdate}>Save</Button>
          )}
        </div>
        <div className={styles["list-wrapper"]}>
          {sections.map((section, idx) => {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: section.color,
                  border: idx === focusIndex ? "1px solid #000" : "",
                }}
              >
                <input
                  value={section.name}
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  disabled={idx !== focusIndex}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteSection(idx);
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
