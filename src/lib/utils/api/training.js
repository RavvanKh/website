"use server";

import { customAxios } from "@/lib/axios";
import { errorCodes } from "@/lib/constants/errorCodes";

export const getTrainingData = async (id) => {
  try {
    const res = await customAxios.get(`/v1/courses/${id}`);
    return res.data;
  } catch (err) {
    if (err?.status === errorCodes.training.notFound) {
      return errorCodes.training.notFound;
    } else return errorCodes.training.maintenance;
  }
};
