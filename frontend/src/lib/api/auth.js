import { fetchJson } from "@/lib/fetcher";

export const fetchSession = async () => {
  return await fetchJson("/api/session");
};

export const login = async (userId, password) => {
  return await fetchJson("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, password }),
  });
};

export const logout = async () => {
  return await fetchJson("/api/logout", {
    method: "POST",
  });
};
