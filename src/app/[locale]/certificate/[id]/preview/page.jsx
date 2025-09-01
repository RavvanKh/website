import Certificate from "@/components/pages/certificate/Certificate";

const CertificatePreviewPage = async ({ params, searchParams }) => {
  const { platform, orientation } = await searchParams;
  const { id } = await params;
  return <Certificate id={id} hasPreview={true} platform={platform} defaultOrientation={orientation}/>;
};

export default CertificatePreviewPage;
