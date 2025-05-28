import { proxyFetch } from "@/lib/proxyFetch";

export async function GET(req, context) {
  const { dashboardId } = context.params;

  return await proxyFetch({
    req,
    backendUrl: `https://back.offflow.co.kr/api/products/dashboard/${dashboardId}`,
    method: "GET",
  });
}
