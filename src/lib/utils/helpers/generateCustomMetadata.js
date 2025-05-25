export const generateCustomMetadata = ({
  title = null,
  keywords,
  description,
  alternates = {}
}) => {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://ingress.academy",
    //   images: ["https://ingress.academy/images/logo/logo.webp"],
    },
    twitter: {
      title,
      card: "summary",
      site: "https://ingress.academy",
    //   images: ["https://ingress.academy/images/logo/logo.webp"],
    },
    alternates
  };
};
