function parseCookies(cookieString) {
  return Object.fromEntries(
    cookieString
      ?.split(";")
      .map((cookie) => cookie.trim().split("="))
      .filter(([k, v]) => k && v),
  );
}

export async function proxyFetch({
  req,
  backendUrl,
  method = "GET",
  headers = {},
  withCredentials = true,
  hasBody = true,
}) {
  let body;
  if (hasBody && method !== "GET" && method !== "HEAD") {
    body = await req.json();
  }

  const newHeaders = new Headers(headers);
  newHeaders.set("Content-Type", `application/json`);
  newHeaders.set("Cache-Control", `no-cache`);

  if (withCredentials) {
    const cookieHeader = req.headers.get("cookie");
    const cookies = parseCookies(cookieHeader);
    const jsessionId = cookies["JSESSIONID"];

    if (jsessionId) {
      newHeaders.set("Cookie", `JSESSIONID=${jsessionId}`);
    }
  }
  console.log(newHeaders);

  const backendRes = await fetch(backendUrl, {
    method,
    headers: newHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  const responseBody = await backendRes.text();

  const resHeaders = new Headers({ "Content-Type": "application/json" });
  const setCookie = backendRes.headers.get("Set-Cookie");
  if (setCookie) {
    resHeaders.set("Set-Cookie", setCookie);
  }

  return new Response(responseBody, {
    status: backendRes.status,
    headers: resHeaders,
  });
}
