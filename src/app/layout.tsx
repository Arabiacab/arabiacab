import type { Metadata } from "next";
import { Syne, Inter, Bebas_Neue } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Footer } from '@/components/common/Footer';
import { CookieBanner } from '@/components/common/CookieBanner';
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
  },
  verification: {
    google: "765BaOkAsPB_RFzBcLjMojRk2GqmJKKzAcocLonbtRw",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = 'en';
  const messages = await getMessages({ locale });
  const dir = 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`
        ${syne.variable}
        ${inter.variable}
        ${bebasNeue.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col font-body" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            {children}
            <Footer />
          </div>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
