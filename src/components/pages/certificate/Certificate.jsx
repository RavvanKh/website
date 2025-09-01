"use client";

import { useState, useEffect, useRef } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";

import GlobalDataWrapper from "@/components/shared/global-data-wrapper/GlobalDataWrapper";
import CertificateCard from "@/components/ui/certificate/certificate-card/CertificateCard";
import CertificateDetails from "@/components/ui/certificate/certificate-details/CertificateDetails";
import ShareCertificate from "@/components/ui/certificate/share-certificate/ShareCertificate";

import { getCertificateData } from "@/lib/utils/api/certificate";
import { convertPlatform } from "@/lib/utils/helpers/convertPlatform";
import { errorCodes } from "@/lib/constants/errorCodes";

import styles from "./certificate.module.css";

const Certificate = ({
  id,
  hasPreview,
  platform = "",
  defaultOrientation = "horizontal",
}) => {
  const [certificate, setCertificate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orientation, setOrientation] = useState(defaultOrientation);

  const certificateCardRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  const handleChangeOrientation = (newOrientation) => {
    const params = new URLSearchParams();

    params.append("orientation", newOrientation);
    if (platform) params.append("platform", platform);

    setOrientation(newOrientation);

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    getCertificateData(id, convertPlatform(platform))
      .then((data) => setCertificate(data))
      .finally(() => setLoading(false));
  }, [id, platform]);

  useEffect(() => {
    if (certificate === errorCodes.certificate.notFound) notFound();
    else if (certificate === errorCodes.certificate.maintenance) {
      setError(true);
    }
  }, [certificate]);

  return (
    <GlobalDataWrapper loading={loading} error={error}>
      <section className={styles.certificate}>
        <div ref={certificateCardRef} data-certificate-card>
          <CertificateCard
            certificate={certificate}
            orientation={orientation}
          />
        </div>
        {!hasPreview && (
          <>
            <ShareCertificate
              certificate={certificate}
              setOrientation={handleChangeOrientation}
              orientation={orientation}
            />
            <CertificateDetails certificate={certificate} />
          </>
        )}
      </section>
    </GlobalDataWrapper>
  );
};

export default Certificate;
