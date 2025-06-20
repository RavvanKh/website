import './globals.css'

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_KEY} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
