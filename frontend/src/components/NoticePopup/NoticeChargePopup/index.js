import React from 'react';
import styles from './index.module.scss';

/**
 * 메시지 충전하기 팝업 컴포넌트
 * @param {Object} props
 * @param {Function} props.onClose - 팝업 닫기 함수
 */
const NoticeChargePopup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        <div className={styles.popupContent}>
          <h2 className={styles.title}>메시지 충전하기</h2>
          <p className={styles.description}>메시지 발송을 위한 충전 방법을 선택해주세요.</p>
          
          <div className={styles.chargeOptions}>
            <div className={styles.chargeOption}>
              <h3>기본 충전</h3>
              <p>1,000건 - 10,000원</p>
              <button className={styles.chargeButton}>선택</button>
            </div>
            <div className={styles.chargeOption}>
              <h3>대량 충전</h3>
              <p>10,000건 - 90,000원</p>
              <button className={styles.chargeButton}>선택</button>
            </div>
          </div>
          
          <button className={styles.closePopupButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeChargePopup; 