import Certificate from "@/components/pages/certificate/Certificate";

import { errorCodes } from "@/lib/constants/errorCodes";
import { getCertificateData } from "@/lib/utils/api/certificate";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params, searchParams }) {
  const { id, locale } = await params;

  let { platform, orientation } = await searchParams;

  orientation = orientation || "horizontal";

  const platformQuery = platform ? `?platform=${platform}` : "";

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

    return {
      title: `${certificate?.person?.firstName} ${certificate?.person?.lastName} - ${certificate.issuedFor}`,
      description: certificate.description,
      keywords: ["certificate", "diploma", certificate.issuedFor],
      openGraph: {
        title: `${certificate?.person?.firstName} ${certificate?.person?.lastName} - ${certificate.issuedFor}`,
        description: certificate.description,
        type: "profile",
        url: `${organization?.url}/${locale}/certificate/${id}${platformQuery}`,
        siteName: organization?.name,
        images: [
          {
            url: certificate?.previewUrls?.[orientation],
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
            url: certificate?.previewUrls?.[orientation],
            width: 1200,
            height: 630,
            alt: "Certificate img",
          },
        ],
        creator: "@IngressAcademy",
      },
      alternates: {
        canonical: `${organization?.url}/${locale}/certificate/${id}${platformQuery}`,
        languages: {
          az: `${organization?.url}/az/certificate/${id}${platformQuery}`,
          en: `${organization?.url}/en/certificate/${id}${platformQuery}`,
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

const CertificatePage = async ({ params, searchParams }) => {
  const { platform, orientation } = await searchParams;
  const { id } = await params;

  return (
    <Certificate
      id={id}
      hasPreview={false}
      platform={platform}
      defaultOrientation={orientation}
    />
  );
};

export default CertificatePage;
