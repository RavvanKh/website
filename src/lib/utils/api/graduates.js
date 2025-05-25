import { customAxios } from "@/lib/axios";

export const getGraduates = async (id, page, size) => {
  try {
    const res = customAxios.get(
      `/v1/courses/${id}/graduates?page=${page}&size=${size}&sort=id`
    );
    return (await res).data;
  } catch (err) {
    throw new Error(err?.message);
  }
};
