"use server";
import { cache } from "react";

import { customAxios } from "@/lib/axios";

export const getTrainingData = cache(async (id) => {
  try {
    const res = await customAxios.get(`/v1/courses/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
});
