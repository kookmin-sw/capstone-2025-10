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
      
      // 메시지 전송 API 호출
      const messageData = {
        title: messageTitle,
        content: messageContent,
        type: messageType,
        recipients: recipientList
      };
      
      const result = await sendMessage(messageData);
      
      // 전송 성공 시 상태 업데이트
      if (result.success) {
        setMessageSent(true);
        // 메시지 카운트 갱신
        handleRefresh();
      }
      
      // 전송 완료 팝업 표시
      setShowSendCompletePopup(true);
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
      {/* 메시지 잔여 건수 카드 */}
      <MessegeCount 
        messageCount={messageCount}
        messageInfo={messageInfo}
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        togglePopup={togglePopup}
      />
      
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
    <MessegeView 
      messageTitle={messageTitle}
      messageContent={messageContent}
      messageType={messageType}
      isButtonActive={checkButtonActive}
      onMessageSent={handleMessageSent}
      onSendClick={handleSendClick}
      isSending={isSending}
    />
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
