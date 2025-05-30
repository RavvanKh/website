"use server";
import { customAxios } from "@/lib/axios";

import { cache } from "react";

export const getComments = cache(async () => {
  try {
    const res = await customAxios.get("/v1/google/map/reviews");
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
});
