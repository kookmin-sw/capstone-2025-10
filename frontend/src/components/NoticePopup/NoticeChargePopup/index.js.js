import React from 'react';
import styles from './index.module.scss';

const NoticeChargePopup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
          </svg>
        </button>
        <div className={styles.popupContent}>
          <p className={styles.popupTitle}>관리자에게 문의 바랍니다.</p>
          <p className={styles.popupDesc}>메시지 건수 충전은 관리자에게 문의 후 충전이 가능합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default NoticeChargePopup; 