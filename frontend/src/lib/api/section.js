import { fetchJson } from "@/lib/fetcher";

export const createSection = async (data) => {
  return JSON.parse(
    await fetchJson(`/api/section/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  );
};

export const updateSection = async (sectionId, data) => {
  return JSON.parse(
    await fetchJson(`/api/section/${sectionId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  );
};

export const deleteSection = async (sectionId) => {
  return await fetchJson(`/api/section/${sectionId}`, {
    method: "DELETE",
    body: JSON.stringify({}),
  });
};
