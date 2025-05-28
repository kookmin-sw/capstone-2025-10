export async function POST(req) {
  try {
    const data = await req.json();

    // 여기에 실제 백엔드 API 호출이나 데이터베이스 로직이 들어갈 예정
    console.log('서버 측에서 받은 설문조사 데이터:', data);

    // 성공 응답
    return new Response(
      JSON.stringify({ message: '설문조사가 성공적으로 제출되었습니다.' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('설문조사 처리 중 오류 발생:', error);
    
    // 오류 응답
    return new Response(
      JSON.stringify({ message: '설문조사 처리 중 오류가 발생했습니다.' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 