import { I18nProviderClient } from "@/locales/client";

import AmplitudeProvider from "@/contexts/AmplitudeProvider";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";

import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  const { organization } = await getHomeData();

  if (!organization || Object.keys(organization).length === 0) {
    return {};
  }

  return {
    title: organization.metaTitle,
    description: organization.metaDescription,
    keywords: organization.metaKeywords,
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.svg" }],
      apple: [{ url: "/apple-icon.svg" }],
    },
    openGraph: {
      title: organization.metaTitle,
      description: organization.metaDescription,
      url: organization.url,
      siteName: organization.name,
      images: [
        {
          url: organization.logo,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: organization.metaTitle,
      description: organization.metaDescription,
      images: [organization.logo],
    },
    alternates: {
      canonical: organization.url,
    },
  };
}

export default function LocaleLayout({ children, params }) {
  const { locale } = params;

  return (
    <I18nProviderClient locale={locale}>
      <GlobalDataProvider>
        <Header />
        <AmplitudeProvider />
        <main>{children}</main>
        <Footer />
      </GlobalDataProvider>
    </I18nProviderClient>
  );
}
