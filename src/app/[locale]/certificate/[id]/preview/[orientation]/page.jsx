import { notFound } from "next/navigation";

import Certificate from "@/components/pages/certificate/Certificate";

const CertificatePreviewPage = async ({ params, searchParams }) => {
  const { platform } = await searchParams;
  const { id, orientation } = await params;
  if (!["vertical", "horizontal"].includes(orientation)) notFound();

  return (
    <Certificate
      id={id}
      hasPreview={true}
      platform={platform}
      defaultOrientation={orientation}
    />
  );
};

export default CertificatePreviewPage;
