"use client";
import React from "react";
import styles from "./index.module.scss";

/**
 * 재사용 가능한 카드 컨테이너 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 카드 상단에 표시될 제목
 * @param {React.ReactNode} props.headerActions - 제목 오른쪽에 표시될 액션 버튼들 (검색창, 버튼 등)
 * @param {React.ReactNode} props.children - 카드 내부에 표시될 콘텐츠
 * @param {boolean} props.showDivider - 구분선 표시 여부 (기본값: true)
 * @param {string} props.margin - 카드 컨테이너의 마진 설정 (기본값: '83px 123px')
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
