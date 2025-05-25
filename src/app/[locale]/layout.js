import { I18nProviderClient } from "@/locales/client";

import { GlobalDataProvider } from "@/contexts/GlobalDataContext";

import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

import "./globals.css";

export const metadata = {
  title: "Ingress Academy",
  description: "Ingress Academy",
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
            {children}
            <Footer />
          </GlobalDataProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
