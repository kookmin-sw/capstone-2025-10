export async function fetchJson(url, options = {}) {
  const defaultOptions = {
    credentials: "include", // 세션 인증용 기본 설정
  };

  const res = await fetch(url, { ...defaultOptions, ...options });

  let data;
  try {
    data = res.text();
  } catch (e) {
    // JSON 파싱 실패 시 기본 메시지
    throw new Error("서버 응답을 해석할 수 없습니다");
  }

  if (!res.ok) {
    // 에러 메시지가 명확하면 그대로, 아니면 기본 처리
    throw new Error(data?.message || "에러가 발생했습니다");
  }

  return data;
}
