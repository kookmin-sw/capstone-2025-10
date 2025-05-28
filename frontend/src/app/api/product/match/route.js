import { proxyFetch } from "@/lib/proxyFetch";

export async function PATCH(req) {
  const body = await req.json();
  return await proxyFetch({
    req,
    backendUrl: `https://back.offflow.co.kr/api/products/${body.productId}/assign-section/${body.sectionId}`,
    method: "PATCH",
    hasBody: false,
  });
}
