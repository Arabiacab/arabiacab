import type { Metadata } from 'next';

import { CityLandingPage } from '@/components/seo/CityLandingPage';

export const metadata: Metadata = {
  title: 'Madinah Taxi Service & Airport Transfers | ArabiaCab',
  description: 'Book a taxi in Madinah with ArabiaCab. We provide comfortable and reliable rides for visitors and pilgrims, including airport transfers and intercity travel.',
  keywords: ['madinah taxi service', 'taxi in medina', 'madinah airport taxi', 'makkah to madinah taxi', 'arabiacab madinah'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/madinah-taxi-service',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ArabiaCab Madinah',
  description: 'Premium taxi service in Madinah, serving pilgrims and city visitors.',
  url: 'https://arabiacab.com/madinah-taxi-service',
  telephone: '+966503667424',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madinah',
    addressCountry: 'SA',
  },
};

export default async function CityTaxiPage() {

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CityLandingPage
        city="Madinah"
        arabicName="المدينة المنورة"
        description="Experience serene and comfortable transportation in the city of the Prophet. ArabiaCab provides exceptional taxi services in Madinah, ensuring smooth transfers from Prince Mohammad Bin Abdulaziz Airport and reliable transport to the Prophet's Mosque."
        landmarks={[
          'Al-Masjid an-Nabawi (The Prophet\'s Mosque)',
          'Prince Mohammad Bin Abdulaziz Airport (MED)',
          'Quba Mosque',
          'Mount Uhud',
          'Madinah Haramain High-Speed Railway Station'
        ]}
      />
    </>
  );
}
