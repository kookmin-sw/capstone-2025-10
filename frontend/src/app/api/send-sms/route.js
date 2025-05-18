import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { SMS_API_CONFIG } from '../sms/constants';

export async function POST(request) {
  try {
    const { recipients, content, title, type } = await request.json();
    
    // API 설정값 로드 - constants.js의 기본값 사용
    const SERVICE_ID = process.env.NAVER_SMS_SERVICE_ID || SMS_API_CONFIG.SERVICE_ID;
    const ACCESS_KEY = process.env.NAVER_SMS_ACCESS_KEY || SMS_API_CONFIG.ACCESS_KEY;
    const SECRET_KEY = process.env.NAVER_SMS_SECRET_KEY || SMS_API_CONFIG.SECRET_KEY;
    const SENDER_PHONE = process.env.NAVER_SMS_SENDER_PHONE || SMS_API_CONFIG.SENDER_PHONE;
    const BASE_URL = SMS_API_CONFIG.BASE_URL;
    const SMS_URL = SMS_API_CONFIG.SMS_URL;
    
    // 환경 변수 확인 로그
    console.log('SMS API 설정 상태:', {
      serviceId: !!SERVICE_ID,
      accessKey: !!ACCESS_KEY,
      secretKey: !!SECRET_KEY,
      senderPhone: !!SENDER_PHONE
    });
    
    // 필수 설정값 확인
    if (!SERVICE_ID || !ACCESS_KEY || !SECRET_KEY || !SENDER_PHONE) {
      console.error('네이버 SENS SMS API 설정이 누락되었습니다.');
      return NextResponse.json({ 
        message: 'API 설정이 완료되지 않았습니다. 환경 변수를 확인하세요.',
        missingConfig: {
          serviceId: !SERVICE_ID,
          accessKey: !ACCESS_KEY,
          secretKey: !SECRET_KEY,
          senderPhone: !SENDER_PHONE
        }
      }, { status: 500 });
    }
    
    // 수신자 형식 변환
    const messages = recipients
      .filter(phone => phone && phone.toString().trim() !== '')
      .map(phone => ({
        to: phone.toString().trim().replace(/-/g, '')
      }));
      
    if (messages.length === 0) {
      return NextResponse.json({ 
        message: '유효한 수신자가 없습니다.'
      }, { status: 400 });
    }
    
    // 타임스탬프 및 시그니처 생성
    const timestamp = Date.now().toString();
    
    // URL 경로 설정 - 콜론이 인코딩되지 않도록 직접 문자열 연결
    const uri = `${SMS_URL}${SERVICE_ID}/messages`;
    
    // 서명 생성 시 원래 경로 사용
    const signature = generateSignature('POST', uri, timestamp, ACCESS_KEY, SECRET_KEY);
    
    // 요청 본문
    const body = {
      type,
      contentType: 'COMM',
      countryCode: '82',
      from: SENDER_PHONE,
      content,
      messages
    };
    
    // LMS, MMS인 경우 제목 추가
    if (type !== 'SMS' && title) {
      body.subject = title;
    }
    
    // 전체 URL 구성 - 콜론이 인코딩되지 않도록 직접 문자열로 처리
    // SERVICE_ID에 포함된 콜론(:)이 %3A로 인코딩되지 않도록 합니다
    const requestUrl = `${BASE_URL}${SMS_URL}${SERVICE_ID}/messages`;
    
    console.log('SENS API 요청:', {
      url: requestUrl,
      recipientsCount: messages.length
    });
    
    // 중요: URL에 콜론이 포함되어 있을 때 fetch는 자동으로 인코딩합니다
    // 이를 방지하기 위해 URL 객체를 직접 생성하고 toString()을 사용하지 않습니다
    
    // Node.js URL 생성 및 인코딩 방지
    const urlParts = new URL(requestUrl);
    // 인코딩된 부분을 다시 디코딩 - pathname에서 콜론이 자동 인코딩되는 현상 방지
    urlParts.pathname = urlParts.pathname.replace(/%3A/g, ':');
    
    // fetch에 전달할 최종 URL 문자열
    const finalUrl = urlParts.toString();
    
    console.log('최종 요청 URL:', finalUrl);
    
    // API 요청
    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': ACCESS_KEY,
        'x-ncp-apigw-signature-v2': signature
      },
      body: JSON.stringify(body)
    });
    
    // === 디버깅용 로그 ===
    console.log('API 요청 세부정보:', {
      url: finalUrl,
      method: 'POST',
      timestamp: timestamp,
      accessKey: ACCESS_KEY.substring(0, 5) + '...',  // 보안을 위해 일부만 표시
      signature: signature.substring(0, 10) + '...'   // 보안을 위해 일부만 표시
    });
    
    // 응답 확인
    if (!response.ok) {
      const errorText = await response.text();
      console.error('SENS API 오류:', response.status, errorText);
      return NextResponse.json({ 
        message: '네이버 SENS API 요청 실패',
        status: response.status,
        error: errorText
      }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('SENS API 응답 성공:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('SMS 발송 중 오류:', error);
    return NextResponse.json({ 
      message: '서버 오류가 발생했습니다.', 
      error: error.message 
    }, { status: 500 });
  }
}

// 시그니처 생성
function generateSignature(method, url, timestamp, accessKey, secretKey) {
  const space = ' ';
  const newLine = '\n';
  
  let message = [];
  message.push(method);
  message.push(space);
  message.push(url);
  message.push(newLine);
  message.push(timestamp);
  message.push(newLine);
  message.push(accessKey);
  
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message.join(''));
  
  return hmac.digest('base64');
}