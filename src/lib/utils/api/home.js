import { customAxios } from "@/lib/axios";

export const getHomeData = async () => {
  try {
    const res = await customAxios.get(`/v1/home`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
