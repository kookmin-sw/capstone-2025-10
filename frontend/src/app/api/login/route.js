import { proxyFetch } from "@/lib/proxyFetch";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  return await proxyFetch({
    req,
    backendUrl: "https://back.offflow.co.kr/api/users/login",
    method: "POST",
    withCredentials: false,
  });
}
