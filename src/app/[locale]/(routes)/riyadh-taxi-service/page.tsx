import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CityLandingPage } from '@/components/seo/CityLandingPage';

export const metadata: Metadata = {
  title: 'Riyadh Taxi Service & Airport Transfers | ArabiaCab',
  description: 'Book a reliable Riyadh taxi service with ArabiaCab. Professional drivers, comfortable cars, and 24/7 availability for city rides and airport transfers.',
  keywords: ['riyadh taxi service', 'taxi in riyadh', 'riyadh airport taxi', 'book cab riyadh', 'arabiacab riyadh'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/riyadh-taxi-service',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ArabiaCab Riyadh',
  description: 'Premium taxi and intercity ride service in Riyadh, Saudi Arabia.',
  url: 'https://arabiacab.com/riyadh-taxi-service',
  telephone: '+966503667424',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
  },
};

export default async function RiyadhPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityLandingPage
        city="Riyadh"
        arabicName="الرياض"
        description="Experience the best taxi service in Riyadh. Whether you need a quick ride across the city, an airport transfer to King Khalid International Airport (RUH), or a luxury intercity journey, ArabiaCab ensures a safe, comfortable, and punctual ride with verified professional drivers."
        landmarks={[
          'King Khalid International Airport (RUH)',
          'Kingdom Centre Tower',
          'Al Faisaliyah Center',
          'Boulevard Riyadh City',
          'King Abdullah Financial District (KAFD)'
        ]}
      />
    </>
  );
}
