"use client";

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
import CardContainer from '@/components/CardContainer';
import MessegeCount from '@/components/NoticeList/MessegeCount';
import styles from './page.module.scss';

export default function AlarmSendPage() {
  // 메시지 잔여건수 상태
  const [messageCount, setMessageCount] = useState('17,44.5');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 메시지 정보
  const messageInfo = "메시지는 발송 수단별 차감 건수가 달라집니다.\n문자 전화 안내에 우선 정렬됨 및 차감발 내용";

  // 메시지 발송 설정 상태
  const [messageTitle, setMessageTitle] = useState('테스트 메시지 제목');
  const [messageContent, setMessageContent] = useState(`안녕하세요, 이것은 메시지 내용이 많을 때의 테스트입니다.
  
여러 줄로 구성된 긴 메시지입니다.
이 메시지는 미리보기 카드의 높이 조절 기능을 테스트하기 위한 것입니다.

1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

메시지가 길어지면 미리보기 영역도 자동으로 확장되어야 합니다.
그리고 이제 좌우 레이아웃 구조로 인해 미리보기 영역이 오른쪽에 위치하게 됩니다.

추가 내용:
------------------------------------
- 첫 번째 추가 항목
- 두 번째 추가 항목
- 세 번째 추가 항목
- 네 번째 추가 항목
- 다섯 번째 추가 항목

이제 레이아웃이 좌우로 분할되어 좌측에는 메시지 잔여 건수와 발송 설정 카드가 있고,
우측에는 메시지 미리보기 카드가 배치됩니다.

추가 내용 더 많이:
------------------------------------
1. 추가 내용 1
2. 추가 내용 2
3. 추가 내용 3
4. 추가 내용 4
5. 추가 내용 5
6. 추가 내용 6
7. 추가 내용 7
8. 추가 내용 8
9. 추가 내용 9
10. 추가 내용 10

내용이 많아지면 스크롤이 생겨야 합니다.
스크롤이 정상적으로 생기는지 확인해주세요.`);
  const [messageType2, setMessageType2] = useState('정보성 메시지');
  
  // 메시지 발송 대상 상태
  const [phoneNumber, setPhoneNumber] = useState('');
  const [recipientList, setRecipientList] = useState([]);
  const [showGroupPopup, setShowGroupPopup] = useState(false);

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
  
  // 그룹 팝업 토글
  const toggleGroupPopup = () => {
    setShowGroupPopup(!showGroupPopup);
  };
  
  // 전화번호 추가 핸들러
  const handleAddPhoneNumber = () => {
    if (!phoneNumber) return;
    
    // 간단한 전화번호 유효성 검사 (숫자와 하이픈만 허용)
    const phoneRegex = /^[0-9-]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('유효한 전화번호를 입력해주세요.');
      return;
    }
    
    // 중복 검사
    if (recipientList.includes(phoneNumber)) {
      alert('이미 추가된 전화번호입니다.');
      return;
    }
    
    // 리스트에 추가
    setRecipientList([...recipientList, phoneNumber]);
    setPhoneNumber(''); // 입력 필드 초기화
  };
  
  // 전화번호 삭제 핸들러
  const handleRemovePhoneNumber = (indexToRemove) => {
    setRecipientList(recipientList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SideNavigation />
        <div className={styles.mainContent}>
          <h1 className={styles.pageTitle}>알림 전송</h1>

          <div className={styles.cardSection}>
            <div className={styles.layoutContainer}>
              {/* 좌측 컨테이너 - 메시지 잔여 건수와 발송 설정 */}
              <div className={styles.leftContainer}>
                {/* 메시지 잔여 건수 카드 */}
                <MessegeCount 
                  messageCount={messageCount}
                  messageInfo={messageInfo}
                  isLoading={isLoading}
                  handleRefresh={handleRefresh}
                  togglePopup={togglePopup}
                />
                
                {/* 메시지 발송 대상 카드 (NEW) */}
                <div className={styles.messageTargetCardWrapper}>
                  <div className={styles.customCard}>
                    <div className={styles.customCardHeader}>
                      <h2 className={styles.customCardTitle}>메시지 발송 대상</h2>
                    </div>
                    <div className={styles.dividerContainer}>
                      <div className={styles.customDivider}></div>
                    </div>
                    <div className={styles.targetSection}>
                      <div className={styles.inputGroup}>
                        <div className={styles.phoneInputContainer}>
                          <input 
                            type="text" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="휴대폰 번호를 입력해주세요."
                            className={styles.phoneInput}
                          />
                          <button 
                            className={styles.addButton}
                            onClick={handleAddPhoneNumber}
                          >
                            추가
                          </button>
                        </div>
                        <button 
                          className={styles.groupButton}
                          onClick={toggleGroupPopup}
                        >
                          그룹 선택
                        </button>
                      </div>
                      
                      <div className={styles.recipientListContainer}>
                        {recipientList.length > 0 ? (
                          <ul className={styles.recipientList}>
                            {recipientList.map((recipient, index) => (
                              <li key={index} className={styles.recipientItem}>
                                <span>{recipient}</span>
                                <button 
                                  className={styles.removeButton}
                                  onClick={() => handleRemovePhoneNumber(index)}
                                >
                                  ×
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className={styles.emptyList}>
                            발송 대상이 없습니다. 전화번호를 추가하거나 그룹을 선택해주세요.
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.totalRecipients}>
                        <strong>총 발송 대상:</strong> {recipientList.length}명
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
                      </div>

                      <div className={styles.typeSelection}>
                        <h3>메시지 타입</h3>
                        <div className={styles.radioGroup}>
                          <label className={styles.radioLabel}>
                            <input 
                              type="radio" 
                              name="messageType" 
                              checked={messageType2 === '정보성 메시지'} 
                              onChange={() => setMessageType2('정보성 메시지')}
                            />
                            <span className={styles.radioText}>정보성 메시지</span>
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

              {/* 우측 컨테이너 - 메시지 미리보기 */}
              <div className={styles.rightContainer}>
                {/* 메시지 미리보기 카드 */}
                <div className={styles.messagePreviewCardWrapper}>
                  <div className={styles.customCard}>
                    <div className={styles.customCardHeader}>
                      <h2 className={styles.customCardTitle}>메시지 미리보기</h2>
                      <button 
                        className={`${styles.previewSendButton} ${messageContent ? styles.active : ''}`}
                        disabled={!messageContent}
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
                        {messageType2}
                      </div>
                    </div>
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
      
      {/* 그룹 선택 팝업 */}
      {showGroupPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.groupPopup}>
            <button className={styles.closeButton} onClick={toggleGroupPopup}>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
              </svg>
            </button>
            <div className={styles.groupPopupContent}>
              <h3>회원 그룹 선택</h3>
              <div className={styles.groupList}>
                <p>회원 관리 페이지 내용이 여기에 표시됩니다.</p>
                <p>이 부분은 실제 회원 관리 데이터와 연동되어야 합니다.</p>
              </div>
              <div className={styles.groupPopupButtons}>
                <button className={styles.confirmButton} onClick={toggleGroupPopup}>확인</button>
                <button className={styles.cancelButton} onClick={toggleGroupPopup}>취소</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
