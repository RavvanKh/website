import { I18nProviderClient } from "@/locales/client";

import AmplitudeProvider from "@/contexts/AmplitudeProvider";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { hideHeaderAndFooter } from "@/lib/utils/helpers/hideHeaderAndFooter";

import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import WhatsappIcon from "@/components/shared/whatsapp-icon/WhatsappIcon";

import { getHomeData } from "@/lib/utils/api/home";

import "../globals.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  try {
    const { organization } = await getHomeData();

    if (!organization || Object.keys(organization).length === 0) {
      return {
        title: "Website Under Maintenance",
        description:
          "Our website is currently undergoing scheduled maintenance. We apologize for the inconvenience and appreciate your patience.",
        keywords: "maintenance, site down, temporary unavailable",
      };
    }
    return {
      title: organization.metaTitle,
      description: organization.metaDescription,
      keywords: organization.metaKeywords,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      icons: {
        icon: [{ url: "en/favicon.ico" }, { url: "/icon.svg" }],
        apple: [{ url: "en/apple-icon.svg" }],
      },
      openGraph: {
        title: organization.metaTitle,
        description: organization.metaDescription,
        url: `${organization.url}/${locale}`,
        siteName: organization.name,
        images: [
          {
            url: organization.logo,
            width: 1200,
            height: 630,
            alt: organization.name,
          },
        ],
        locale,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: organization.metaTitle,
        description: organization.metaDescription,
        images: [organization.logo],
      },
      alternates: {
        canonical: `${organization.url}/${locale}`,
        languages: {
          az: `${organization.url}/az`,
          en: `${organization.url}/en`,
        },
      },
      other: {
        "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_KEY,
        "Content-Security-Policy": "default-src 'self'",
      },
    };
  } catch (_) {
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

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  const headerList = headers();
  const pathname = (await headerList).get("x-pathname") || "";

  const isHide = hideHeaderAndFooter(pathname);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProviderClient locale={locale}>
          <GlobalDataProvider>
            {!isHide && <Header />}
            <AmplitudeProvider />
            <main>
              {children}
              <ToastContainer position="top-right" autoClose={3000} />
            </main>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
            <SpeedInsights />
            <Analytics />
            {!isHide && <WhatsappIcon />}
            {!isHide && <Footer />}
          </GlobalDataProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
