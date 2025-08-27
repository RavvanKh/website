// "use server";
import { customAxios } from "@/lib/axios";
import { errorCodes } from "@/lib/constants/errorCodes";

export const getHomeData = async () => {
  try {
    const res = await customAxios.get(`/v1/home`);
    return res.data;
  } catch (err) {
    return errorCodes.home.maintenance;
  }
};
