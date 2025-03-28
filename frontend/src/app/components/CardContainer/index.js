"use client";
import React from "react";
import styles from "./index.module.scss";

/**
 * 재사용 가능한 카드 컨테이너 컴포넌트
 */
export default function CardContainer({ 
  title, 
  headerActions, 
  children, 
  showDivider = true, 
  margin = '83px 123px' 
}) {
  const cardStyle = {
    margin: margin
  };
  
  return (
    <div className={styles.card} style={cardStyle}>
      <div className={styles.contentHeader}>
        <h2 className={styles.pageTitle}>{title}</h2>
        
        {headerActions && (
          <div className={styles.contentActions}>
            {headerActions}
          </div>
        )}
      </div>

      {/* 구분선 */}
      {showDivider && <div className={styles.divider}></div>}

      {/* 카드 내용 */}
      {children}
    </div>
  );
}