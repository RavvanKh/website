"use server";
import { customAxios } from "@/lib/axios";

import { cache } from "react";

export const getHomeData = cache(async () => {
  try {
    const res = await customAxios.get(`/v1/home`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
});
