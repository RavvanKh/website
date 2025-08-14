"use server";
import { cache } from "react";

import { customAxios } from "@/lib/axios";
import { notFound } from "next/navigation";

export const errorCodes = {
  certificate: {
    notFound: "CERTIFICATE_NOT_FOUND",
    maintenance: "CERTIFICATE_MAINTENANCE"
  }
};

export const getCertificateData = cache(async (id) => {
  try {
    // For now, we'll use mock data until the API is available
    const res = await customAxios.get(`/v1/certificates/${id}`);
    return res.data;
  } catch (err) {
    // Check for specific error codes if the API provides them
    if (err?.response?.status === 404) {
      return errorCodes.certificate.notFound;
    } else if (err?.response?.status === 503) {
      return errorCodes.certificate.maintenance;
    }
    notFound();
  }
});