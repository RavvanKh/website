import Providers from "./providers";

import { getHomeData } from "@/lib/utils/api/home";

import { errorCodes, errorResponses } from "@/lib/constants/errorCodes";

import "../globals.css";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  try {
    const { organization } = await getHomeData();

    if (!organization || Object.keys(organization).length === 0) {
      return errorResponses[errorCodes.home.maintenance];
    }
    return {
      title: organization?.metaTitle,
      description: organization?.metaDescription,
      keywords: organization?.metaKeywords,
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
        title: organization?.metaTitle,
        description: organization?.metaDescription,
        url: `${organization?.url}/${locale}`,
        siteName: organization?.name,
        images: [
          {
            url: organization?.logo,
            width: 1200,
            height: 630,
            alt: organization?.name,
          },
        ],
        locale,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: organization?.metaTitle,
        description: organization?.metaDescription,
        images: [organization?.logo],
      },
      alternates: {
        canonical: `${organization?.url}/${locale}`,
        languages: {
          az: `${organization?.url}/az`,
          en: `${organization?.url}/en`,
        },
      },
      other: {
        "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_KEY,
        "Content-Security-Policy": "default-src 'self'",
      },
    };
  } catch (_) {
    return errorResponses[errorCodes.home.maintenance];
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
