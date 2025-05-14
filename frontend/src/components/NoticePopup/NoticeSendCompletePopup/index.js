import React from 'react';
import styles from './index.module.scss';

/**
 * 메시지 전송 완료 팝업 컴포넌트
 * @param {Object} props
 * @param {Function} props.onClose - 팝업 닫기 함수
 */
const NoticeSendCompletePopup = ({ onClose }) => {
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
          <div className={styles.successIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#E8F3FF" />
              <path d="M34 18L21 31L14 24" stroke="#004BD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={styles.title}>전송이 완료되었습니다.</h2>
          
          <button className={styles.closePopupButton} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeSendCompletePopup; 