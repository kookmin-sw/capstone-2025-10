import { proxyFetch } from "@/lib/proxyFetch";

export async function GET(req, context) {
  const { sectionId } = context.params;

  return await proxyFetch({
    req,
    backendUrl: `https://back.offflow.co.kr/api/products/section/${sectionId}`,
    method: "GET",
  });
}
