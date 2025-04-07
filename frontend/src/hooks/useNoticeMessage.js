import { useState } from 'react';

const useNoticeMessage = () => {
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
  const [messageType, setMessageType] = useState('정보성 메시지');

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

  // 메시지 타입 변경 핸들러
  const handleMessageTypeChange = (type) => {
    setMessageType(type);
    
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

  return {
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
  };
};

export default useNoticeMessage; 