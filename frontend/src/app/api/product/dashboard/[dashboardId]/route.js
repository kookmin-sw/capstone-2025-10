import { proxyFetch } from "@/lib/proxyFetch";

export async function GET(req, context) {
  const { dashboardId } = context.params;

  return await proxyFetch({
    req,
    backendUrl: `http://localhost:8080/api/products/dashboard/${dashboardId}`,
    method: "GET",
  });
}
