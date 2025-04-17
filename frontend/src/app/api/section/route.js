import { proxyFetch } from "@/lib/proxyFetch";

export async function POST(req) {
  return await proxyFetch({
    req,
    backendUrl: `http://localhost:8080/api/sections/create`,
    method: "POST",
  });
}
