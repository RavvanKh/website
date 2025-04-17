import { applicationAxios } from "@/lib/axios";

export const createCourseApplication = async (data) => {
  try {
    const res = await applicationAxios.post("/v1/applications", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
