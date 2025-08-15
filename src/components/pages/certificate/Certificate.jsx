"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

import GlobalDataWrapper from "@/components/shared/global-data-wrapper/GlobalDataWrapper";
import CertificateCard from "@/components/ui/certificate/certificate-card/CertificateCard";
import CertificateDetails from "@/components/ui/certificate/certificate-details/CertificateDetails";
import ShareCertificate from "@/components/ui/certificate/share-certificate/ShareCertificate";

import { getCertificateData } from "@/lib/utils/api/certificate";
import { errorCodes } from "@/lib/constants/errorCodes";

import styles from "./certificate.module.css";

const Certificate = ({ id, hasPreview }) => {
  const [certificate, setCertificate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCertificateData(id)
      .then((data) => setCertificate(data))
      .finally(() => setLoading(false));
  }, [id]);


  useEffect(() =>{
    if(certificate === errorCodes.certificate.notFound) notFound()
    else if(certificate === errorCodes.certificate.maintenance){
  setError(true
    
  )}
  },[certificate])

  return (
    <GlobalDataWrapper loading={loading} error={error}>
      <section className={styles.certificate}>
        <CertificateCard certificate={certificate} />
        {!hasPreview && (
          <>
            <ShareCertificate id={id} />

            <CertificateDetails
            certificate={certificate}
            />
          </>
        )}
      </section>
    </GlobalDataWrapper>
  );
};

export default Certificate;
