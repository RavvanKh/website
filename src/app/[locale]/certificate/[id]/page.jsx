import Certificate from "@/components/pages/certificate/Certificate";

import { errorCodes } from "@/lib/constants/errorCodes";
import { getCertificateData } from "@/lib/utils/api/certificate";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  params = await params;
  const { id, locale } = params;

  try {
    const { organization } = await getHomeData();
    const certificate = await getCertificateData(id);

    if (certificate === errorCodes.certificate.notFound) {
      return {
        title: "Certificate not found",
        description: "The requested certificate could not be found.",
      };
    } else if (certificate === errorCodes.certificate.maintenance) {
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

    const certificateImageUrl = `${organization?.url}/${locale}/api/certificate/${id}`;
    return {
      title: `${certificate?.person?.firstName} ${certificate?.person?.lastName} - ${certificate.issuedFor}`,
      description: certificate.description,
      keywords: ["certificate", "diploma", certificate.issuedFor],
      openGraph: {
        title: `${certificate?.person?.firstName} ${certificate?.person?.lastName} - ${certificate.issuedFor}`,
        description: certificate.description,
        type: "profile",
        url: `${organization?.url}/${locale}/certificate/${id}`,
        siteName: organization?.name,
        images: [
          {
            url: certificateImageUrl,
            width: 1200,
            height: 630,
            alt: "Certificate img",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${certificate?.person?.firstName} ${certificate?.person?.lastName} - ${certificate.issuedFor}`,
        description: certificate.description,
        images: [
          {
            url: certificateImageUrl,
            width: 1200,
            height: 630,
            alt: "Certificate img",
          },
        ],
        creator: "@IngressAcademy",
      },
      alternates: {
        canonical: `${organization?.url}/${locale}/certificate/${id}`,
        languages: {
          az: `${organization?.url}/az/certificate/${id}`,
          en: `${organization?.url}/en/certificate/${id}`,
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
  const { id } = await params;

  return <Certificate id={id} hasPreview={false} />;
};

export default CertificatePage;
