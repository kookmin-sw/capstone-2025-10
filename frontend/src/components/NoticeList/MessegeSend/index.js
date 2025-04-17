import React from 'react';
import styles from './index.module.scss';

const MessegeSend = ({ 
  messageTitle, 
  setMessageTitle, 
  messageContent, 
  setMessageContent, 
  messageType, 
  handleMessageTypeChange 
}) => {
  return (
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
          </div>

          <div className={styles.typeSelection}>
            <h3>메시지 타입</h3>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="messageType" 
                  checked={messageType === '정보성 메시지'} 
                  onChange={() => handleMessageTypeChange('정보성 메시지')}
                />
                <span className={styles.radioText}>정보성 메시지</span>
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="messageType" 
                  checked={messageType === '광고성 메시지'} 
                  onChange={() => handleMessageTypeChange('광고성 메시지')}
                />
                <span className={styles.radioText}>광고성 메시지</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessegeSend;
