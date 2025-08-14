import React from "react";
import Certificate from "@/components/pages/certificate/Certificate";
import { certificateMockData, alternativeCertificateData } from "@/lib/constants/certificateMock";
import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  // Await params before destructuring
  params = await params;
  const { id, locale } = params;
  
  try {
    // For API we will replace this with => const certificate = await getCertificateData(id);
    const certificateData = id === "123" ? alternativeCertificateData : certificateMockData;
    const { organization } = await getHomeData();
    
    // Simulate API error handling
    // This would be replaced with actual API responses in production
    if (id === "not-found") {
      return {
        title: "Certificate not found",
        description: "The requested certificate could not be found.",
      };
    }
    
    if (id === "maintenance") {
      return {
        title: "Website Under Maintenance",
        description:
          "Our website is currently undergoing scheduled maintenance. We apologize for the inconvenience and appreciate your patience.",
        keywords: "maintenance, site down, temporary unavailable",
        robots: {
          index: false,
          follow: false,
        },
      };
    }
    
    const { certificate, aboutCertificate } = certificateData;
    const certificateImageUrl = `${process.env.NEXT_PUBLIC_DOMAIN || 'https://ingress.academy'}/images/certificate-preview.jpg`;
    
    return {
      title: `${certificate.name} - ${certificate.diploma} in ${certificate.course}`,
      description: aboutCertificate.description,
      keywords: ["certificate", "diploma", certificate.course, "verification"],
      openGraph: {
        title: `${certificate.name} - ${certificate.diploma} in ${certificate.course}`,
        description: aboutCertificate.description,
        type: 'profile',
        url: `${organization?.url || process.env.NEXT_PUBLIC_DOMAIN || 'https://ingress.academy'}/${locale}/certificate/${id}`,
        siteName: organization?.name || 'Ingress Academy',
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
        images: [
          {
            url: certificateImageUrl,
            width: 1200,
            height: 630,
            alt: `${certificate.name}'s ${certificate.diploma} in ${certificate.course}`,
          },
        ],
        creator: '@IngressAcademy',
      },
      alternates: {
        canonical: `${organization?.url || process.env.NEXT_PUBLIC_DOMAIN || 'https://ingress.academy'}/${locale}/certificate/${id}`,
        languages: {
          az: `${organization?.url || process.env.NEXT_PUBLIC_DOMAIN || 'https://ingress.academy'}/az/certificate/${id}`,
          en: `${organization?.url || process.env.NEXT_PUBLIC_DOMAIN || 'https://ingress.academy'}/en/certificate/${id}`,
        },
      },
    };
  } catch (err) {
    return {
      title: "Website Under Maintenance",
      description:
        "Our website is currently undergoing scheduled maintenance. We apologize for the inconvenience and appreciate your patience.",
      keywords: "maintenance, site down, temporary unavailable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

const CertificatePage = async ({ params }) => {
  // Await params before using
  params = await params;
  return <Certificate id={params.id} />;
};

export default CertificatePage;