export async function proxyFetch({
  req,
  res,
  backendUrl,
  method = "POST",
  headers = {},
}) {
  const body = await req.json();
  const backendRes = await fetch(backendUrl, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include", // 세션 인증 필요 시
  });

  const responseBody = await backendRes.text(); // 나중에 JSON으로 파싱할 수도 있음

  const resHeaders = new Headers({
    "Content-Type": "application/json",
  });

  // Set-Cookie 헤더가 있는 경우 수동으로 설정
  const setCookie = backendRes.headers.get("Set-Cookie");
  if (setCookie) {
    resHeaders.set("set-cookie", setCookie);
  }

  return new Response(responseBody, {
    status: backendRes.status,
    headers: resHeaders,
  });
}
