import { Cairo, Hind, Inter } from "next/font/google";
import "@/assets/css/icofont.min.css";
import "@/assets/css/popup.css";
import "@/assets/css/video-modal.css";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "./globals.css";
import FixedShadow from "@/components/shared/others/FixedShadow";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";
import AppProviders from "@/components/shared/providers/AppProviders";
import { cookies, headers } from "next/headers";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { getLocale } from "@/libs/i18n";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});
export const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind",
});
export const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata = {
  title: "Sir Academy | Leadership & Professional Development",
  description:
    "Sir Academy is a leadership and professional development academy offering programs, coaching, and qualifications for emerging leaders.",
};

export default function RootLayout({ children }) {
  const locale = getLocale({ cookieStore: cookies(), headerStore: headers() });
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${hind.variable} ${cairo.variable} ${
        isRtl ? "rtl" : "ltr"
      }`}
    >
      <body
        className={`relative leading-[1.8] bg-bodyBg dark:bg-bodyBg-dark z-0 ${
          isRtl ? cairo.className : inter.className
        }`}
      >
        <LocaleProvider locale={locale}>
          <AppProviders>
            <PreloaderPrimary />
            {children}

            {/* theme fixed shadow */}
            <div>
              <FixedShadow />
              <FixedShadow align={"right"} />
            </div>
          </AppProviders>
        </LocaleProvider>
      </body>
    </html>
  );
}
