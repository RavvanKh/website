import Certificate from "@/components/pages/certificate/Certificate";

const CertificatePreviewPage = async ({ params }) => {
  const { id } = await params;

  return <Certificate id={id} hasPreview={true} />;
};

export default CertificatePreviewPage;
