"use client";

import { useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import html2canvas from "html2canvas";

import GlobalDataWrapper from "@/components/shared/global-data-wrapper/GlobalDataWrapper";
import CertificateCard from "@/components/ui/certificate/certificate-card/CertificateCard";
import CertificateDetails from "@/components/ui/certificate/certificate-details/CertificateDetails";
import ShareCertificate from "@/components/ui/certificate/share-certificate/ShareCertificate";

import { getCertificateData, updateCertificate } from "@/lib/utils/api/certificate";
import { errorCodes } from "@/lib/constants/errorCodes";

import styles from "./certificate.module.css";

const Certificate = ({ id, hasPreview }) => {
  const [certificate, setCertificate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingPreview, setGeneratingPreview] = useState(false);
  
  const certificateCardRef = useRef(null);

  useEffect(() => {
    getCertificateData(id)
      .then((data) => setCertificate(data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if(certificate === errorCodes.certificate.notFound) notFound()
    else if(certificate === errorCodes.certificate.maintenance){
      setError(true)
    }
  }, [certificate])

  const generatePreviewFromDOM = async () => {
    if (!certificate.credentialId || certificate.previewUrl || !certificateCardRef.current) return;
    
    setGeneratingPreview(true);
    
    try {
      const canvas = await html2canvas(certificateCardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2, 
        backgroundColor: '#ffffff',
        width: certificateCardRef.current.offsetWidth,
        height: certificateCardRef.current.offsetHeight,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-certificate-card]');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.boxShadow = 'none';
          }
        }
      });

      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error('Canvas to blob conversion failed');
        const formData = new FormData();
        formData.append('file', blob, `certificate-${certificate.credentialId}-preview.png`);

        const response = await updateCertificate(certificate.credentialId, formData)
        // if (response.ok) {
        //   const { previewUrl } = await response.json();
        //   setCertificate(prev => ({
        //     ...prev,
        //     previewUrl: previewUrl
        //   }));
        // } else {
        //   throw new Error('Failed to upload preview');
        // }
      }, 'image/png', 0.9);

    } catch (error) {
      console.error('Error generating preview from DOM:', error);
    } finally {
      setGeneratingPreview(false);
    }
  };

  // useEffect(() => {
  //   if (certificate.credentialId && !certificate.previewUrl && !hasPreview && !loading) {
  //     setTimeout(() => {
  //       generatePreviewFromDOM();
  //     }, 1000);
  //   }
  // }, [certificate.credentialId, certificate.previewUrl, hasPreview, loading]);

  return (
    <GlobalDataWrapper loading={loading} error={error}>
      <section className={styles.certificate}>
        {/* Certificate Card'ı ref ile işaretle */}
        <div ref={certificateCardRef} data-certificate-card>
          <CertificateCard certificate={certificate} />
        </div>
        
        {!hasPreview && (
          <>
            <ShareCertificate certificate ={certificate} />
            <CertificateDetails certificate={certificate} />
          </>
        )}
      </section>
    </GlobalDataWrapper>
  );
};

export default Certificate;