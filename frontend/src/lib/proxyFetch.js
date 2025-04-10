export async function proxyFetch({
  req,
  backendUrl,
  method = "GET",
  headers = {},
}) {
  let body;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.json();
  }

  const backendRes = await fetch(backendUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
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
