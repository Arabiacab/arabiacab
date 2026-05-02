import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CityLandingPage } from '@/components/seo/CityLandingPage';

export const metadata: Metadata = {
  title: 'Makkah Taxi Service & Umrah Transfers | ArabiaCab',
  description: 'Reliable Makkah taxi service for Umrah pilgrims and visitors. Book your ride from Jeddah airport to Makkah or travel within the holy city with ArabiaCab.',
  keywords: ['makkah taxi service', 'mecca taxi', 'jeddah to makkah taxi', 'umrah taxi saudi arabia', 'taxi in mecca'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/makkah-taxi-service',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ArabiaCab Makkah',
  description: 'Premium taxi service in Makkah, specializing in Umrah and airport transfers.',
  url: 'https://arabiacab.com/makkah-taxi-service',
  telephone: '+966503667424',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Makkah',
    addressCountry: 'SA',
  },
};

export default async function MakkahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityLandingPage
        city="Makkah"
        arabicName="مكة المكرمة"
        description="Providing safe, respectful, and reliable transportation in the holy city of Makkah. Whether you are arriving for Umrah, traveling from Jeddah Airport, or moving between hotels and the Haram, ArabiaCab offers dedicated services tailored to your spiritual journey."
        landmarks={[
          'Masjid al-Haram',
          'Abraj Al Bait (Clock Towers)',
          'Jabal al-Nour (Cave of Hira)',
          'Mina & Arafat',
          'Makkah High-Speed Railway Station'
        ]}
      />
    </>
  );
}
