"use server";
import { certificateAxios } from "@/lib/axios";

import { errorCodes } from "@/lib/constants/errorCodes";

export const getCertificateData = async (id, platform) => {
  try {
    const platformQuery = platform ? `?platform=${platform}` : "";

    const res = await certificateAxios.get(
      `/v1/certificates/${id}${platform}`
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
