import { homeAxios } from "@/lib/axios";

export const getHomeData = async () => {
  try {
    const res = await homeAxios.get(`/courses/api/v1/home`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
