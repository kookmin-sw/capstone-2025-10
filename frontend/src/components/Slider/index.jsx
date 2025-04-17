"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

const CardSlider = ({ cards }) => {
  if (!cards.length) return null;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={styles["slider-wrapper"]}>
      {/* Indicator */}
      <div className={styles["indicator"]}>
        {cards.map((_, i) => (
          <span
            key={i}
            className={
              i === currentIndex ? styles["dot-active"] : styles["dot"]
            }
          />
        ))}
      </div>

      {/* 카드 슬라이드 */}
      <div className={styles["slider"]}>
        {cards.map((card, i) => {
          let className = styles["card"];
          if (i === currentIndex) className += ` ${styles["active"]}`;
          else if (i < currentIndex) className += ` ${styles["left"]}`;
          else if (i > currentIndex) className += ` ${styles["right"]}`;

          return (
            <div key={i} className={className}>
              {card}
            </div>
          );
        })}
      </div>

      {/* 버튼 */}
      <button
        className={styles["nav-button"]}
        onClick={(e) => {
          e.preventDefault();
          prev();
        }}
        disabled={currentIndex === 0}
        style={{ left: 40 }}
      >
        <Image src="/prev-icon.svg" width={24} height={48} alt="next icon" />
      </button>
      <button
        className={styles["nav-button"]}
        onClick={(e) => {
          e.preventDefault();
          next();
        }}
        disabled={currentIndex === cards.length - 1}
        style={{ right: 40 }}
      >
        <Image src="/next-icon.svg" width={24} height={48} alt="next icon" />
      </button>
    </div>
  );
};

export default CardSlider;
