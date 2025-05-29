// SENS SMS API 관련 상수 및 설정
export const SMS_API_CONFIG = {
  // 실제 값은 .env.local 파일에서 환경 변수를 통해 로드됩니다.
  SERVICE_ID: process.env.NAVER_SMS_SERVICE_ID, // 삭제된 하드코딩 값 대신 process.env 참조 (실제 사용은 route.js에서)
  ACCESS_KEY: process.env.NAVER_SMS_ACCESS_KEY, // 삭제된 하드코딩 값 대신 process.env 참조
  SECRET_KEY: process.env.NAVER_SMS_SECRET_KEY, // 삭제된 하드코딩 값 대신 process.env 참조
  SENDER_PHONE: process.env.NAVER_SMS_SENDER_PHONE, // 삭제된 하드코딩 값 대신 process.env 참조
    
  // API 엔드포인트 (이 값들은 유지)
  BASE_URL: 'https://sens.apigw.ntruss.com',
  SMS_URL: '/sms/v2/services/',
}
  
// SMS 메시지 유형
export const MESSAGE_TYPE = {
  SMS: 'SMS',  // 단문 메시지 (90bytes)
  LMS: 'LMS',  // 장문 메시지 (2000bytes)
  MMS: 'MMS'   // 멀티미디어 메시지
}
  
// 메시지 내용 유형
export const CONTENT_TYPE = {
  COMM: 'COMM',  // 일반 메시지
  AD: 'AD'       // 광고 메시지
}
  
// 기본 국가 코드
export const DEFAULT_COUNTRY_CODE = '82';  // 대한민국