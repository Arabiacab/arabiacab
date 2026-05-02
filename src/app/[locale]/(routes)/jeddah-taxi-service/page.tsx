import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CityLandingPage } from '@/components/seo/CityLandingPage';

export const metadata: Metadata = {
  title: 'Jeddah Taxi Service & Airport Transfers | ArabiaCab',
  description: 'Looking for a taxi in Jeddah? ArabiaCab offers premium rides, airport transfers to KAIA, and intercity trips to Mecca and Medina with verified drivers.',
  keywords: ['jeddah taxi service', 'taxi in jeddah', 'jeddah airport taxi', 'book cab jeddah', 'jeddah to mecca taxi'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/jeddah-taxi-service',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ArabiaCab Jeddah',
  description: 'Premium taxi and intercity ride service in Jeddah, Saudi Arabia.',
  url: 'https://arabiacab.com/jeddah-taxi-service',
  telephone: '+966503667424',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jeddah',
    addressCountry: 'SA',
  },
};

export default async function JeddahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityLandingPage
        city="Jeddah"
        arabicName="جدة"
        description="Book the most reliable taxi service in Jeddah. From King Abdulaziz International Airport (KAIA) pickups to trips along the Jeddah Corniche or seamless transfers to Mecca, ArabiaCab delivers a superior travel experience with unmatched comfort and 24/7 availability."
        landmarks={[
          'King Abdulaziz International Airport (KAIA)',
          'Jeddah Corniche & Waterfront',
          'Al-Balad (Historical Jeddah)',
          'Red Sea Mall',
          'King Fahd\'s Fountain'
        ]}
      />
    </>
  );
}
