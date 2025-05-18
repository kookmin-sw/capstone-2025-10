/**
 * 메시지 전송 버튼의 활성화 여부를 확인하는 함수
 * @param {string} messageContent - 메시지 내용
 * @param {Array} recipientList - 수신자 목록
 * @param {string} messageCount - 메시지 잔여 건수 (콤마 포함 문자열)
 * @returns {boolean} - 전송 버튼 활성화 여부
 */
export const isButtonActive = (messageContent, recipientList, messageCount) => {
  if (!messageContent || recipientList.length === 0) {
    return false;
  }

  // 메시지 잔여 건수를 숫자로 변환 (콤마 제거 후 숫자로 변환)
  const availableCount = parseFloat(messageCount.replace(/,/g, ""));

  // 발송 대상 인원수가 메시지 잔여 건수보다 많으면 비활성화
  if (recipientList.length > availableCount) {
    return false;
  }

  return true;
};

/**
 * 메시지 발송 함수 (백엔드 연동 시 사용)
 * @param {Object} messageData - 메시지 데이터
 * @returns {Promise} - API 호출 결과
 */
export const sendMessage = async (messageData) => {
  // 실제 구현 시에는 API 호출 코드로 대체
  console.log("메시지 발송 요청:", messageData);

  // 임시 구현: 1초 후 성공 응답
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "메시지가 성공적으로 발송되었습니다.",
      });
    }, 1000);
  });
};

/**
 * 카카오톡 연동 메시지 발송 함수 (API 연동 시 사용)
 * @param {Object} messageData - 메시지 데이터
 * @returns {Promise} - API 호출 결과
 */
export const sendKakaoMessage = async (messageData) => {
  // 실제 구현 시에는 카카오 API 호출 코드로 대체
  console.log("카카오톡 메시지 발송 요청:", messageData);

  // 임시 구현: 1초 후 성공 응답
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "카카오톡 메시지가 성공적으로 발송되었습니다.",
      });
    }, 1000);
  });
};
