import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CityLandingPage } from '@/components/seo/CityLandingPage';

export const metadata: Metadata = {
  title: 'Dammam Taxi Service & Airport Transfers | ArabiaCab',
  description: 'Book your ArabiaCab taxi in Dammam. Fast, reliable, and comfortable rides across the Eastern Province including airport transfers to King Fahd International Airport.',
  keywords: ['dammam taxi service', 'taxi in dammam', 'dammam airport taxi', 'khobar taxi', 'arabiacab dammam'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/dammam-taxi-service',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ArabiaCab Dammam',
  description: 'Premium taxi and intercity ride service in Dammam and Eastern Province.',
  url: 'https://arabiacab.com/dammam-taxi-service',
  telephone: '+966503667424',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dammam',
    addressCountry: 'SA',
  },
};

export default async function DammamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityLandingPage
        city="Dammam"
        arabicName="الدمام"
        description="Navigate Dammam and the wider Eastern Province with ease. ArabiaCab offers top-rated taxi services in Dammam, including prompt pickups from King Fahd International Airport (KFIA) and seamless intercity travel to Khobar and Riyadh."
        landmarks={[
          'King Fahd International Airport (KFIA)',
          'Dammam Corniche',
          'Half Moon Bay',
          'King Abdulaziz Center for World Culture (Ithra)',
          'Al-Khobar Waterfront (Nearby)'
        ]}
      />
    </>
  );
}
