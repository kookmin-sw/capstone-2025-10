"use client";

import React, { useState } from 'react';
import NoticeLayout from '@/components/NoticeLayout';
import MessegeCount from '@/components/NoticeList/MessegeCount';
import NoticeChargePopup from '@/components/NoticePopup/NoticeChargePopup/index';
import NoticeSendConfirmPopup from '@/components/NoticePopup/NoticeSendConfirmPopup';
import NoticeSendCompletePopup from '@/components/NoticePopup/NoticeSendCompletePopup';
import NoticeCustomList from '@/components/NoticePopup/NoticeCoustomList';
import MessegeCustomer from '@/components/NoticeList/MessegeCustomer';
import MessegeSend from '@/components/NoticeList/MessegeSend';
import MessegeView from '@/components/NoticeList/MessegeView';
import useNoticeMessage from '@/hooks/useNoticeMessage';
import useNoticeRecipient from '@/hooks/useNoticeRecipient';
import { isButtonActive, sendMessage } from '@/utils/messageUtils';
import { sendSMS } from '@/app/api/sms';
// import styles from './page.module.scss'; - 레이아웃 컴포넌트로 이동되어 더 이상 필요하지 않음

export default function AlarmSendPage() {
  // 메시지 관련 상태 및 핸들러
  const {
    messageCount,
    messageInfo,
    showPopup,
    isLoading,
    messageTitle,
    setMessageTitle,
    messageContent,
    setMessageContent,
    messageType,
    handleRefresh,
    togglePopup,
    handleMessageTypeChange
  } = useNoticeMessage();

  // 수신자 관련 상태 및 핸들러
  const {
    phoneNumber,
    setPhoneNumber,
    recipientList,
    setRecipientList,
    showGroupPopup,
    toggleGroupPopup,
    dummyMemberGroups,
    handleSelectGroups
  } = useNoticeRecipient();

  // 전송 관련 상태
  const [messageSent, setMessageSent] = useState(false);
  const [showSendConfirmPopup, setShowSendConfirmPopup] = useState(false);
  const [showSendCompletePopup, setShowSendCompletePopup] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // 전송 버튼 활성화 여부 체크 함수
  const checkButtonActive = () => isButtonActive(messageContent, recipientList, messageCount);
  
  // 전송 버튼 클릭 핸들러
  const handleSendClick = () => {
    if (checkButtonActive()) {
      setShowSendConfirmPopup(true);
    }
  };
  
  // 전송 확인 팝업 닫기
  const handleCloseConfirmPopup = () => {
    setShowSendConfirmPopup(false);
  };
  
  // 전송 완료 팝업 닫기
  const handleCloseCompletePopup = () => {
    setShowSendCompletePopup(false);
  };
  
  // 전송 확인 핸들러
  const handleConfirmSend = async () => {
    try {
      setIsSending(true);
      
      // 팝업 닫기
      setShowSendConfirmPopup(false);
      
      // 디버깅용 - 실제 recipientList 구조 확인
      console.log('수신자 목록:', recipientList);
      
      // 수신자 전화번호 목록 추출
      let recipients = [];
      
      if (recipientList && recipientList.length > 0) {
        // 전화번호 추출 코드
        recipients = recipientList.map(item => {
          // 기본 형태가 전화번호인 경우
          if (typeof item === 'string') {
            return item;
          }
          // 객체 형태로 저장된 경우, 전화번호 필드 추출
          if (item && item.phone) {
            return item.phone;
          }
          // ID 필드가 전화번호인 경우
          if (item && item.id) {
            return item.id;
          }
          return null;
        }).filter(phone => phone !== null);
      }
      
      console.log('추출된 전화번호 목록:', recipients);
      
      // SENS API를 통한 메시지 발송
      const result = await sendSMS({
        recipients,
        content: messageContent,
        title: messageTitle,
        type: messageType
      });
      
      // 전송 완료 팝업 표시
      setShowSendCompletePopup(true);
      
      // 나머지 코드는 유지
      if (result.success) {
        setMessageSent(true);
        handleRefresh();
      } else {
        console.error('메시지 전송 실패:', result.error);
        alert('메시지 전송에 실패했습니다.');
      }
    } catch (error) {
      console.error('메시지 전송 중 오류:', error);
      alert('메시지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  // 메시지 전송 후 상태 업데이트
  const handleMessageSent = () => {
    setMessageSent(true);
    // 메시지 카운트 감소 (실제로는 API 호출로 최신 값을 가져와야 함)
    handleRefresh();
  };

  // 좌측 컨텐츠 영역 구성
  const leftContent = (
    <>

      
      {/* 메시지 발송 대상 카드 */}
      <MessegeCustomer
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        recipientList={recipientList}
        setRecipientList={setRecipientList}
        showGroupPopup={showGroupPopup}
        toggleGroupPopup={toggleGroupPopup}
      />

      {/* 메시지 발송 설정 카드 */}
      <MessegeSend 
        messageTitle={messageTitle}
        setMessageTitle={setMessageTitle}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        messageType={messageType}
        handleMessageTypeChange={handleMessageTypeChange}
      />
    </>
  );

  // 우측 컨텐츠 영역 구성
  const rightContent = (
    <div style={{ paddingRight: '40px' }}>
      <MessegeView 
        messageTitle={messageTitle}
        messageContent={messageContent}
        messageType={messageType}
        isButtonActive={checkButtonActive}
        onMessageSent={handleMessageSent}
        onSendClick={handleSendClick}
        isSending={isSending}
      />
    </div>
  );

  return (
    <>
      <NoticeLayout 
        title="알림 전송"
        leftContent={leftContent}
        rightContent={rightContent}
      />

      {/* 충전하기 팝업 */}
      {showPopup && <NoticeChargePopup onClose={togglePopup} />}
      
      {/* 그룹 선택 팝업 */}
      <NoticeCustomList 
        isOpen={showGroupPopup}
        onClose={toggleGroupPopup}
        memberGroups={dummyMemberGroups}
        onSelectGroups={handleSelectGroups}
      />
      
      {/* 전송 확인 팝업 */}
      {showSendConfirmPopup && (
        <NoticeSendConfirmPopup 
          onClose={handleCloseConfirmPopup}
          onConfirm={handleConfirmSend}
        />
      )}

      {/* 전송 완료 팝업 */}
      {showSendCompletePopup && (
        <NoticeSendCompletePopup 
          onClose={handleCloseCompletePopup}
        />
      )}
    </>
  );
}
