import React from "react";
import Certificate from "@/components/pages/certificate/Certificate";
import { certificateMockData, alternativeCertificateData } from "@/lib/constants/certificateMock";

export async function generateMetadata({ params }) {
  const { id, locale } = params;
  
  const certificateData = id === "alternative" ? alternativeCertificateData : certificateMockData;
  const { certificate, aboutCertificate } = certificateData;
  
  const certificateImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/images/certificate-preview.jpg`;
  
  return {
    title: `${certificate.name} - ${certificate.diploma} in ${certificate.course}`,
    description: aboutCertificate.description,
    openGraph: {
      title: `${certificate.name} - ${certificate.diploma} in ${certificate.course}`,
      description: aboutCertificate.description,
      type: 'profile',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/${locale}/certificate/${id}`,
      images: [
        {
          url: certificateImageUrl,
          width: 1200,
          height: 630,
          alt: `${certificate.name}'s ${certificate.diploma} in ${certificate.course}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${certificate.name} - ${certificate.diploma} in ${certificate.course}`,
      description: aboutCertificate.description,
      images: [certificateImageUrl],
      creator: '@IngressAcademy',
    },
  };
}

const CertificatePage = ({ params }) => {
  return <Certificate id={params.id} />;
};

export default CertificatePage;