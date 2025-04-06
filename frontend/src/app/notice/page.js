"use client";

import React, { useState } from 'react';
import SideNavigation from '@/components/SideNavigation';
import CardContainer from '@/components/CardContainer';
import MessegeCount from '@/components/NoticeList/MessegeCount';
import NoticeChargePopup from '@/components/NoticePopup/NoticeChargePopup/index.js';
import NoticeCustomList from '@/components/NoticePopup/NoticeCoustomList';
import MessegeCustomer from '@/components/NoticeList/MessegeCustomer';
import MessegeSend from '@/components/NoticeList/MessegeSend';
import MessegeView from '@/components/NoticeList/MessegeView';
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
  
  // 더미 회원 그룹 데이터
  const dummyMemberGroups = [
    { id: 1, name: "일반 회원", count: 120, date: "2025.01.15" },
    { id: 2, name: "VIP 회원", count: 45, date: "2025.01.20" },
    { id: 3, name: "신규 가입자", count: 78, date: "2025.02.05" },
    { id: 4, name: "휴면 계정", count: 32, date: "2025.02.10" },
    { id: 5, name: "임직원", count: 18, date: "2025.02.15" },
  ];
  
  // 그룹 체크박스 상태 관리
  const [checkedGroups, setCheckedGroups] = useState({});
  
  // 개별 그룹 체크박스 클릭 핸들러
  const handleGroupCheckboxClick = (id) => {
    setCheckedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // 선택한 그룹 추가 핸들러
  const handleAddSelectedGroups = () => {
    // 선택된 그룹 ID 배열
    const selectedGroupIds = Object.keys(checkedGroups)
      .filter(id => checkedGroups[id])
      .map(id => parseInt(id));
    
    // 선택된 그룹 정보 가져오기
    const selectedGroups = dummyMemberGroups.filter(group => 
      selectedGroupIds.includes(group.id)
    );
    
    // 선택된 그룹 처리 (예: 발송 대상에 추가)
    selectedGroups.forEach(group => {
      // 여기서는 간단하게 그룹 이름을 전화번호 목록에 추가하는 것으로 시뮬레이션
      // 실제로는 그룹에 속한 회원 전화번호를 모두 추가하는 로직이 필요
      if (!recipientList.includes(`그룹: ${group.name} (${group.count}명)`)) {
        setRecipientList([...recipientList, `그룹: ${group.name} (${group.count}명)`]);
      }
    });
    
    // 팝업 닫기
    toggleGroupPopup();
    
    // 체크박스 상태 초기화
    setCheckedGroups({});
  };

  // 메시지 타입 변경 핸들러
  const handleMessageTypeChange = (type) => {
    setMessageType2(type);
    
    // 타입이 광고성 메시지로 변경되면 "(광고)" 텍스트 추가
    if (type === '광고성 메시지') {
      // 이미 "(광고)"로 시작하지 않는 경우에만 추가
      if (!messageContent.startsWith('(광고)')) {
        setMessageContent(`(광고) ${messageContent}`);
      }
    } else {
      // 정보성 메시지로 변경 시 "(광고)" 텍스트 제거
      if (messageContent.startsWith('(광고) ')) {
        setMessageContent(messageContent.substring(5));
      }
    }
  };

  // 전송 버튼 활성화 여부 체크 함수
  const isButtonActive = () => {
    if (!messageContent || recipientList.length === 0) return false;
    
    // 메시지 잔여 건수를 숫자로 변환 (콤마 제거 후 숫자로 변환)
    const availableCount = parseFloat(messageCount.replace(/,/g, ''));
    
    // 발송 대상 인원수가 메시지 잔여 건수보다 많으면 비활성화
    if (recipientList.length > availableCount) return false;
    
    return true;
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
                
                {/* 메시지 발송 대상 카드 (컴포넌트화) */}
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
                  messageType={messageType2}
                  handleMessageTypeChange={handleMessageTypeChange}
                />
              </div>

              {/* 우측 컨테이너 - 메시지 미리보기 */}
              <div className={styles.rightContainer}>
                {/* 메시지 미리보기 카드 */}
                <MessegeView 
                  messageTitle={messageTitle}
                  messageContent={messageContent}
                  messageType={messageType2}
                  isButtonActive={isButtonActive}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 충전하기 팝업 */}
      {showPopup && <NoticeChargePopup onClose={togglePopup} />}
      
      {/* 그룹 선택 팝업 */}
      <NoticeCustomList 
        isOpen={showGroupPopup}
        onClose={toggleGroupPopup}
        memberGroups={dummyMemberGroups}
        onSelectGroups={(selectedGroups) => {
          // 선택된 그룹 처리
          selectedGroups.forEach(group => {
            if (!recipientList.includes(`그룹: ${group.name} (${group.count}명)`)) {
              setRecipientList([...recipientList, `그룹: ${group.name} (${group.count}명)`]);
            }
          });
        }}
      />
    </div>
  );
}
