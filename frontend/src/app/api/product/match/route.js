import { proxyFetch } from "@/lib/proxyFetch";

export async function PATCH(req) {
  const body = await req.json();
  return await proxyFetch({
    req,
    backendUrl: `http://localhost:8080/api/products/${body.productId}/assign-section/${body.sectionId}`,
    method: "PATCH",
    hasBody: false,
  });
}
