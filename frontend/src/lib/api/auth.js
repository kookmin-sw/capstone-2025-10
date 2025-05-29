import { fetchJson } from "@/lib/fetcher";

export const fetchSession = async () => {
  return await fetchJson("/api/auth/check");
};

export const login = async (userId, password) => {
  const response = await fetchJson("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, password }),
    cache: "no-store",
    credentials: "include",
  });
  return response;
};

export const logout = async () => {
  return await fetchJson("/api/logout", {
    method: "POST",
  });
};
