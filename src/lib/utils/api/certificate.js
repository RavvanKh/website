// "use server";
import { customAxios } from "@/lib/axios";

import { errorCodes } from "@/lib/constants/errorCodes";

export const getCertificateData = async (id, platform) => {
  try {
    const res = await customAxios.get(
      `/v1/certificates/${id}?platform=${platform}`
    );
    return res.data;
  } catch (err) {
    if (err?.status === errorCodes.certificate.notFound) {
      return errorCodes.certificate.notFound;
    } else {
      return errorCodes.certificate.maintenance;
    }
  }
};
