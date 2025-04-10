import { cookies } from "next/headers";

export async function fetchWithSession(url, options = {}) {
  const cookieStore = cookies();
  const jsessionId = cookieStore.get("JSESSIONID")?.value;

  const headers = new Headers(options.headers || {});
  if (jsessionId) {
    headers.set("Cookie", `JSESSIONID=${jsessionId}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = `[fetchWithSession] ${response.status} ${response.statusText}`;
    console.error(message);
    throw new Error(message);
  }

  return await response.json();
}
