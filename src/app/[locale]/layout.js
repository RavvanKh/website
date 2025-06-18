import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { I18nProviderClient } from "@/locales/client";

import AmplitudeProvider from "@/contexts/AmplitudeProvider";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";

import { getHomeData } from "@/lib/utils/api/home";

import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

import "./globals.css";


export const generateMetadata = async () => {
  const { organization } = await getHomeData();

  if (Object.keys(organization).length === 0) {
    return {};
  }

  return {
    title: organization?.metaTitle,
    description: organization?.metaDescription,
    keywords: organization?.metaKeywords,
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
      title: organization?.metaTitle,
      description: organization?.metaDescription,
      url: organization?.url,
      siteName: organization?.name,
      images: [
        {
          url: organization?.logo,
          width: 800,
          height: 600,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: organization?.metaTitle,
      description: organization?.metaDescription,
      images: [organization?.logo],
    },
    alternates: {
      canonical: organization?.url,
    },
  };
};

// export const metadata = {
//   title: "Ingress Academy",
//   description: "Ingress Academy",
// };

export default async function SubLayout({ params, children }) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <I18nProviderClient locale={locale}>
          <GlobalDataProvider>
            <Header />
            <AmplitudeProvider />
            {children}
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
            <SpeedInsights />
            <Analytics />
            <Footer />
          </GlobalDataProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
