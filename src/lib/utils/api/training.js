// "use server";

import { customAxios } from "@/lib/axios";
import { errorCodes } from "@/lib/constants/errorCodes";

export const getTrainingData = async (id) => {
  try {
    const res = await customAxios.get(`/v1/courses/${id}`);
    return res.data;
  } catch (err) {
    return err?.status || errorCodes.certificate.maintenance;
  }
};
