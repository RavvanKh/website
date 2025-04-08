import { I18nProviderClient } from "@/locales/client";

import Header from "@/components/ui/header/Header";

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
    <html lang="en">
      <body>
        <I18nProviderClient locale={locale}>
          <Header />
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
