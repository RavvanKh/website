import { notFound } from "next/navigation";

import Certificate from "@/components/pages/certificate/Certificate";

import { errorCodes, errorResponses } from "@/lib/constants/errorCodes";
import { getCertificateData } from "@/lib/utils/api/certificate";

import { getHomeData } from "@/lib/utils/api/home";
import { convertPlatform } from "@/lib/utils/helpers/convertPlatform";
import { isValidOrientation } from "@/lib/utils/helpers/isValidOrientation";

export async function generateMetadata({ params, searchParams }) {
  const { id, locale } = await params;

  let { platform, orientation } = await searchParams;

  if (!isValidOrientation(orientation))
    errorResponses[errorCodes.certificate.notFound];

  platform = convertPlatform(platform);

  const platformQuery = platform ? `?platform=${platform}` : "";

  try {
    const { organization } = await getHomeData();
    const certificate = await getCertificateData(id);

    if (errorResponses[certificate]) {
      return errorResponses[certificate];
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
    return errorResponses[errorCodes.certificate.maintenance];
  }
}

const CertificatePage = async ({ params, searchParams }) => {
  const { id } = await params;
  const { platform } = await searchParams;

  const certificate = await getCertificateData(id, convertPlatform(platform));

  if (certificate === errorCodes.certificate.notFound) notFound();

  return <Certificate hasPreview={false} />;
};

export default CertificatePage;
