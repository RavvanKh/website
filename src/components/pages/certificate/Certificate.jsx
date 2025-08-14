"use client";

import React, { useState, useEffect } from "react";
import {
  certificateMockData,
  alternativeCertificateData,
} from "../../../lib/constants/certificateMock";
import CertificateCard from "@/components/ui/certificate/CertificateCard";
import CertificateDetails from "@/components/ui/certificate/CertificateDetails";
import ShareCertificate from "@/components/ui/certificate/ShareCertificate";

const Certificate = ({ id }) => {
  const [certificateData, setCertificateData] = useState(certificateMockData);

  useEffect(() => {
    if (id === "123" || id === "alternative") {
      setCertificateData(alternativeCertificateData);
    } else {
      setCertificateData(certificateMockData);
    }
  }, [id]);

  const { certificate, certificateDetails, aboutCertificate, share } =
    certificateData;

  return (
    <>
      <CertificateCard certificate={certificate} />
      <CertificateDetails
        certificateDetails={certificateDetails}
        aboutCertificate={aboutCertificate}
      />
      <ShareCertificate share={share} />
    </>
  );
};

export default Certificate;
