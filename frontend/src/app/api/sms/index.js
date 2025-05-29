import { MESSAGE_TYPE } from "./constants";

/**
 * SMS 메시지 발송
 * @param {object} params 메시지 발송 파라미터
 * @param {array} params.recipients 수신자 목록 - 전화번호 문자열 배열
 * @param {string} params.content 메시지 내용
 * @param {string} params.title 메시지 제목 (LMS, MMS에서만 사용)
 * @param {string} params.type 메시지 유형 (SMS, LMS, MMS)
 * @returns {Promise} 메시지 발송 결과
 */
export async function sendSMS({
  recipients,
  content,
  title = "",
  type = MESSAGE_TYPE.SMS,
}) {
  try {
    console.log("SMS 발송 요청 시작:", {
      recipientsCount: recipients.length,
      type,
    });

    // 내부 API 라우트 호출
    const response = await fetch("/api/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients,
        content,
        title,
        type,
      }),
    });

    if (!response.ok) {
      console.error("API 요청 실패:", response.status, response.statusText);
      try {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            status: response.status,
            ...errorData,
          },
        };
      } catch (e) {
        return {
          success: false,
          error: {
            status: response.status,
            message: response.statusText,
          },
        };
      }
    }

    const data = await response.json();
    console.log("SMS 발송 API 응답:", data);

    return {
      success: data.statusCode === "202",
      data,
    };
  } catch (error) {
    console.error("SMS 발송 중 오류 발생:", error);
    return {
      success: false,
      error: { message: error.message },
    };
  }
}
