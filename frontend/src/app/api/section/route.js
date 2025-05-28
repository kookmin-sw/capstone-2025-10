import { proxyFetch } from "@/lib/proxyFetch";

export async function POST(req) {
  return await proxyFetch({
    req,
    backendUrl: `https://back.offflow.co.kr/api/sections`,
    method: "POST",
  });
}
