import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cairo, Noto_Sans_Arabic, Bebas_Neue } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Footer } from '@/components/common/Footer';
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp';
import { CookieBanner } from '@/components/common/CookieBanner';
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ArabiaCab | Taxi Service in Saudi Arabia",
    template: "%s | ArabiaCab"
  },
  description: "ArabiaCab — reliable taxi service saudi arabia. Cab booking Riyadh, airport taxi Jeddah, airport transfer Makkah. Book a cab in Saudi Arabia 24/7. Reliable cab Arabia.",
  metadataBase: new URL("https://www.arabiacab.com"),
  openGraph: {
    siteName: "ArabiaCab",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`
        ${playfair.variable} 
        ${dmSans.variable} 
        ${cairo.variable} 
        ${notoArabic.variable} 
        ${bebasNeue.variable} 
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col font-body">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
          <FloatingWhatsApp />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
