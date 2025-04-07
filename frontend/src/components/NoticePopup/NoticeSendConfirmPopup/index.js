import React from 'react';
import styles from './index.module.scss';

/**
 * 메시지 전송 확인 팝업 컴포넌트
 * @param {Object} props
 * @param {Function} props.onClose - 팝업 닫기 함수
 * @param {Function} props.onConfirm - 전송 확인 클릭 시 실행할 함수
 */
const NoticeSendConfirmPopup = ({ onClose, onConfirm }) => {
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
          <h2 className={styles.title}>전송하시겠습니까?</h2>
          <p className={styles.description}>문자 메시지는 전체 대상을 기준으로 합니다.</p>
          
          <button className={styles.sendButton} onClick={onConfirm}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeSendConfirmPopup; 