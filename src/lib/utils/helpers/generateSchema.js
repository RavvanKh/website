export const generateSchema = (type, data) => {
  switch (type) {
    case "course":
      return {
        "@context": "https://schema.org",
        "@type": "Course",
        name: data?.training?.name,
        image: data?.training?.icon,
        description: data?.training?.description,
        provider: {
          "@type": "Organization",
          name: data?.organization?.name,
          url: data?.organization?.url,
        },
      };
    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: data?.name,
        url: data?.url,
        logo: data?.logo,
        sameAs: Object.values(data?.socialLinks),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: data?.phoneNumbers[0],
          contactType: "Customer Support",
          areaServed: "AZ",
          availableLanguage: ["English", "Azerbaijani"],
        },
      };
    default:
      return null;
  }
};
