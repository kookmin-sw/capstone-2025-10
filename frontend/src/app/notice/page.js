"use client";

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
import CardContainer from '@/components/CardContainer';
import styles from './page.module.scss';

export default function AlarmSendPage() {
  // 메시지 잔여건수 상태
  const [messageCount, setMessageCount] = useState('17,44.5');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 메시지 정보
  const messageInfo = "메시지는 발송 수단별 차감 건수가 달라집니다.\n문자 전화 안내에 우선 정렬됨 및 차감발 내용";

  // 메시지 발송 설정 상태
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messageType2, setMessageType2] = useState('일반형 메시지');

  // 잔여 메시지 새로고침 핸들러
  const handleRefresh = () => {
    // 로딩 상태로 변경
    setIsLoading(true);
    
    // 1초 후에 로딩 상태 해제 및 데이터 갱신
    setTimeout(() => {
      setIsLoading(false);
      // 만약 실제 API 호출을 한다면, 아래 코드는 API 응답 후에 처리
      console.log('메시지 잔여 건수 새로고침 완료');
    }, 1000);
  };

  // 충전하기 팝업 토글
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SideNavigation />
        <div className={styles.mainContent}>
          <h1 className={styles.pageTitle}>알림 전송</h1>

          <div className={styles.cardSection}>
            {/* 메시지 잔여 건수 카드 */}
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
                        <span className={styles.loading}>새로고침침 중...</span>
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

            {/* 메시지 발송 설정 카드 */}
            <div className={styles.messageSendCardWrapper}>
              <div className={styles.customCard}>
                <div className={styles.customCardHeader}>
                  <h2 className={styles.customCardTitle}>메시지 발송 설정</h2>
                </div>
                <div className={styles.dividerContainer}>
                  <div className={styles.customDivider}></div>
                </div>
                <div className={styles.sendSettingsSection}>
                  <div className={styles.inputGroup}>
                    <label>메시지 제목</label>
                    <input 
                      type="text" 
                      value={messageTitle} 
                      onChange={(e) => setMessageTitle(e.target.value)}
                      placeholder="메시지 제목을 입력해주세요. 단문에서는 표시되지 않습니다."
                      className={styles.titleInput}
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>메시지 내용</label>
                    <textarea 
                      value={messageContent} 
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="메시지 내용을 입력해주세요."
                      className={styles.contentTextarea}
                    />
                    <button className={styles.previewButton}>메시지 미리보기</button>
                  </div>

                  <div className={styles.typeSelection}>
                    <h3>메시지 타입</h3>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input 
                          type="radio" 
                          name="messageType" 
                          checked={messageType2 === '일반형 메시지'} 
                          onChange={() => setMessageType2('일반형 메시지')}
                        />
                        <span className={styles.radioText}>일반형 메시지</span>
                      </label>
                      <label className={styles.radioLabel}>
                        <input 
                          type="radio" 
                          name="messageType" 
                          checked={messageType2 === '광고성 메시지'} 
                          onChange={() => setMessageType2('광고성 메시지')}
                        />
                        <span className={styles.radioText}>광고성 메시지</span>
                      </label>
                    </div>
                  </div>

                  <div className={styles.buttonGroup}>
                    <button className={styles.sendButton}>전송</button>
                    <button className={styles.cancelButton}>취소</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 충전하기 팝업 */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={togglePopup}>
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
      )}
    </div>
  );
}
