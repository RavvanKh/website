import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { I18nProviderClient } from "@/locales/client";

import { GlobalDataProvider } from "@/contexts/GlobalDataContext";

import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

import "./globals.css";
import AmplitudeProvider from "@/contexts/AmplitudeProvider";

export const metadata = {
  title: "Ingress Academy",
  description: "Ingress Academy",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.svg" }],
    apple: [{ url: "/apple-icon.svg" }],
  },
};

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
