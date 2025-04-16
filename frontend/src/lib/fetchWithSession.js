// import { cookies } from "next/headers";

// export async function fetchWithSession(url, options = {}) {
//   const cookieStore = cookies();
//   const jsessionId = cookieStore.get("JSESSIONID")?.value;

//   const headers = new Headers(options.headers || {});
//   if (jsessionId) {
//     headers.set("Cookie", `JSESSIONID=${jsessionId}`);
//   }

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const message = `[fetchWithSession] ${response.status} ${response.statusText}`;
//     return {};
//   }

//   return await response.json();
// }
/**
 * 세션 정보를 포함하여 API 요청을 보내는 유틸리티 함수
 * @param {string} url - API 요청 URL
 * @param {Object} options - fetch 옵션
 * @returns {Promise<any>} - API 응답 데이터
 */
export async function fetchWithSession(url, options = {}) {
  // 기본 옵션에 credentials include 추가
  const defaultOptions = {
    credentials: 'include',
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    // 응답이 성공적이지 않을 경우 오류 처리
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }
    
    // JSON 응답이 있을 경우 파싱
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    // 그 외의 경우 응답 객체 반환
    return response;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error;
  }
}
