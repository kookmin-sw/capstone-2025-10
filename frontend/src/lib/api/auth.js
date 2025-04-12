import { fetchJson } from "@/lib/fetcher";

export const fetchSession = async () => {
  return await fetchJson("/api/auth/check");
};

export const login = async (userId, password) => {
  const response = await fetchJson("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, password }),
  });

  //const setCookie = response.headers.get("Set-Cookie");
  //if (setCookie) {
  //  const resHeaders = new Headers({
  //    "Content-Type": "application/json",
  //  });
  //
  //  resHeaders.set("Set-Cookie", setCookie);
  //}
  return response;
};

export const logout = async () => {
  return await fetchJson("/api/logout", {
    method: "POST",
  });
};
