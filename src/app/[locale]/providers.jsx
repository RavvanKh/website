"use client";

import { usePathname } from "next/navigation";
import { I18nProviderClient } from "@/locales/client";
import AmplitudeProvider from "@/contexts/AmplitudeProvider";
import { GlobalDataProvider } from "@/contexts/GlobalDataContext";
import { ToastContainer } from "react-toastify";
import WhatsappIcon from "@/components/shared/whatsapp-icon/WhatsappIcon";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import { hideHeaderAndFooter } from "@/lib/utils/helpers/hideHeaderAndFooter";

import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children, locale }) {
  const pathname = usePathname();
  const isHide = hideHeaderAndFooter(pathname);

  return (
    <I18nProviderClient locale={locale}>
      <GlobalDataProvider>
        <AmplitudeProvider />
        {!isHide && <Header />}
        <main>{children}</main>
        {!isHide && <Footer />}
        <ToastContainer position="top-right" autoClose={3000} />
        {!isHide && <WhatsappIcon />}
      </GlobalDataProvider>
    </I18nProviderClient>
  );
}
