function parseCookies(cookieString) {
  return Object.fromEntries(
    cookieString
      ?.split(";")
      .map((cookie) => cookie.trim().split("="))
      .filter(([k, v]) => k && v),
  );
}

export async function GET(req, context) {
  //const cookieHeader = req.headers.get("cookie");
  //const cookies = parseCookies(cookieHeader);
  //const jsessionId = cookies["JSESSIONID"];
  //
  //const headers = new Headers();
  //if (jsessionId) {
  //  headers.set("Cookie", `JSESSIONID=${jsessionId}`);
  //}
  const myHeaders = new Headers();
  myHeaders.append("Cookie", "JSESSIONID=3F71AC12D8157FF9858AAA9B26EFA320");
  const test = await fetch("http://localhost:8080/api/products/section/1");
  return new Response(await test.text(), {
    status: test.status,
  });
}
