"use client";
import React from "react";
import styles from "./index.module.scss";

export default function Logo({ src = "/logo.svg", alt = "Logo" }) {
  return (
    <div className={styles.logoWrapper}>
      <img src={src} alt={alt} className={styles.logo} />
    </div>
  );
} 