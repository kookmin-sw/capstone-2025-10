import React from 'react';
import styles from './index.module.scss';

const MessegeCount = ({ 
  messageCount, 
  messageInfo, 
  isLoading, 
  handleRefresh, 
  togglePopup 
}) => {
  return (
    <div className={styles.messageCountCardWrapper}>
      <div className={styles.customCard}>
        <div className={styles.customCardHeader}>
          <h2 className={styles.customCardTitle}>메시지 잔여 건수</h2>
        </div>
        <div className={styles.dividerContainer}>
          <div className={styles.customDivider}></div>
        </div>
        <div className={styles.messageCountSection}>
          <div className={styles.messageStatusBox}>
            <div className={styles.countDisplay}>
              {isLoading ? (
                <span className={styles.loading}>새로고침 중...</span>
              ) : (
                <>
                  <span className={styles.count}>{messageCount}</span>
                  <span className={styles.unit}>건</span>
                </>
              )}
            </div>
            <button 
              className={`${styles.refreshButton} ${isLoading ? styles.spinning : ''}`} 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <img src="/refresh.svg" alt="새로고침" />
            </button>
            <button className={styles.chargeButton} onClick={togglePopup}>
              충전하기
            </button>
          </div>
          <div className={styles.infoMessage}>
            <span className={styles.infoIcon}>i</span>
            <p>{messageInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessegeCount;
