//export const getProductBySectionId = async (sectionId) => {
//  var myHeaders = new Headers();
//  myHeaders.append("Cookie", "JSESSIONID=6E628C706E2056FA5F2101D1F577F0C2");
//
//  var requestOptions = {
//    method: "GET",
//    headers: myHeaders,
//    redirect: "follow",
//    credentials: "include",
//  };
//
//  return await fetch(
//    "http://localhost:8080/api/products/section/1",
//    requestOptions,
//  );
//};

import { fetchJson } from "@/lib/fetcher";

export const getProductBySectionId = async (sectionId) => {
  return JSON.parse(await fetchJson(`/api/product/section/${sectionId}`));
};

export const getProductByDashboardId = async (dashboardId) => {
  return JSON.parse(await fetchJson(`/api/product/dashboard/${dashboardId}`));
};

export const createProduct = async (dashboardId, data) => {
  console.log(dashboardId, data);
  return JSON.parse(
    await fetchJson(`/api/product`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        dashboardId,
      }),
    }),
  );
};

export const updateProduct = async (productId, data) => {
  return JSON.parse(
    await fetchJson(`/api/product`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  );
};

export const deleteProduct = async (productId) => {
  return await fetchJson(`/api/product/${productId}`, {
    method: "DELETE",
    body: JSON.stringify({}),
  });
};

export const matchProductWithSection = async (productId, sectionId) => {
  return JSON.parse(
    await fetchJson(`/api/product/match`, {
      method: "PATCH",
      body: JSON.stringify({ productId, sectionId }),
    }),
  );
};
