import { proxyFetch } from "@/lib/proxyFetch";

export async function PATCH(req) {
  return await proxyFetch({
    req,
    backendUrl: `https://back.offflow.co.kr/api/products`,
    method: "PATCH",
  });
}

export async function DELETE(req, context) {
  const { id } = context.params;
  return await proxyFetch({
    req,
    backendUrl: `https://back.offflow.co.kr/api/products/${id}`,
    method: "DELETE",
  });
}
