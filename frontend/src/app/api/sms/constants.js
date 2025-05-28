// SENS SMS API 관련 상수 및 설정
export const SMS_API_CONFIG = {
  // 실제 값으로 변경 필요
  SERVICE_ID: process.env.NEXT_PUBLIC_NAVER_SMS_SERVICE_ID || 'ncp:sms:kr:351119368542:offflow_sms',
  ACCESS_KEY: process.env.NEXT_PUBLIC_NAVER_SMS_ACCESS_KEY || 'ncp_iam_BPAMKR5e0DwBTqIIOcag',
  SECRET_KEY: process.env.NEXT_PUBLIC_NAVER_SMS_SECRET_KEY || 'ncp_iam_BPKMKRN8wRxLIrQPZyOVmiOi2jYMa14OHM',
  SENDER_PHONE: process.env.NEXT_PUBLIC_NAVER_SMS_SENDER_PHONE || '01074941426',
    
  // API 엔드포인트
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