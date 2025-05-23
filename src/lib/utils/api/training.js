import { customAxios } from "@/lib/axios";

export const getTrainingData = async (id) => {
  try {
    const res = await customAxios.get(`/v1/courses/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
