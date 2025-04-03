"use client";
import React from "react";
import styles from "./index.module.scss";

export default function LoadingIndicator() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
} 