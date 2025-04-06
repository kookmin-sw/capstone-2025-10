import React from 'react';
import styles from './index.module.scss';

const MessegeView = ({ 
  messageTitle, 
  messageContent, 
  messageType, 
  isButtonActive 
}) => {
  return (
    <div className={styles.messagePreviewCardWrapper}>
      <div className={styles.customCard}>
        <div className={styles.customCardHeader}>
          <h2 className={styles.customCardTitle}>메시지 미리보기</h2>
          <button 
            className={`${styles.previewSendButton} ${isButtonActive() ? styles.active : styles.inactive}`}
            disabled={!isButtonActive()}
          >
            전송
          </button>
        </div>
        <div className={styles.dividerContainer}>
          <div className={styles.customDivider}></div>
        </div>
        <div className={styles.previewSection}>
          {messageTitle && (
            <div className={styles.previewTitle}>{messageTitle}</div>
          )}
          <div className={styles.previewContent}>
            {messageContent || "메시지 내용이 여기에 표시됩니다."}
          </div>
          <div className={styles.previewType}>
            {messageType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessegeView;
