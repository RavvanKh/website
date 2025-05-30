"use server";
import { customAxios } from "@/lib/axios";

import { cache } from "react";

export const getGraduates = cache(async (id, page, size) => {
  try {
    const res = customAxios.get(
      `/v1/courses/${id}/graduates?page=${page}&size=${size}&sort=id`
    );
    return (await res).data;
  } catch (err) {
    throw new Error(err?.message);
  }
});
