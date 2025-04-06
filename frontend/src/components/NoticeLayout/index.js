import React from 'react';
import SideNavigation from '@/components/SideNavigation';
import styles from './index.module.scss';

/**
 * 알림 전송 페이지의 레이아웃 컴포넌트
 * 상단 타이틀과 좌우 컨테이너 구조를 제공
 */
const NoticeLayout = ({ title, leftContent, rightContent }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SideNavigation />
        <div className={styles.mainContent}>
          <h1 className={styles.pageTitle}>{title}</h1>

          <div className={styles.cardSection}>
            <div className={styles.layoutContainer}>
              {/* 좌측 컨테이너 */}
              <div className={styles.leftContainer}>
                {leftContent}
              </div>

              {/* 우측 컨테이너 */}
              <div className={styles.rightContainer}>
                {rightContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeLayout; 