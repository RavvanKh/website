import { customAxios } from "@/lib/axios";


export const getEvents = async () => {
  try {
    const res = await customAxios.get(`/v1/events`);
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message);
  }
};
