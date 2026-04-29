import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { StatsSection } from '@/components/sections/StatsSection';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FleetShowcase } from '@/components/sections/FleetShowcase';
import { FixedPricing } from '@/components/sections/FixedPricing';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CitiesWeServe } from '@/components/sections/CitiesWeServe';
import { Testimonials } from '@/components/sections/Testimonials';
import { Navbar } from '@/components/common/Navbar';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const titleEn = 'ArabiaCab | Taxi Service in Saudi Arabia — Riyadh, Jeddah, Makkah';
  const titleAr = 'أرابيا كاب | خدمة تاكسي في المملكة العربية السعودية — الرياض، جدة، مكة';
  const descEn = 'ArabiaCab — reliable taxi service saudi arabia. Cab booking Riyadh, airport taxi Jeddah, airport transfer Makkah & Madinah. Book a cab in Saudi Arabia 24/7. Reliable cab Arabia with fixed prices, professional drivers, and instant WhatsApp confirmation.';
  const descAr = 'أرابيا كاب — خدمة تاكسي موثوقة في المملكة العربية السعودية. حجز سيارة أجرة الرياض، تاكسي المطار جدة، نقل المطار مكة والمدينة. احجز تاكسي في السعودية 24/7.';

  return {
    title: isAr ? titleAr : titleEn,
    description: isAr ? descAr : descEn,
    keywords: [
      'taxi service saudi arabia', 'cab booking riyadh', 'airport taxi jeddah',
      'airport transfer makkah', 'makkah to madinah cab', 'reliable cab arabia',
      'arabiacab', 'taxi riyadh', 'taxi jeddah', 'taxi makkah', 'taxi madinah', 'taxi dammam',
      'cab booking saudi arabia', 'airport taxi riyadh', 'airport transfer jeddah'
    ],
    alternates: {
      canonical: `https://www.arabiacab.com/${locale}`,
      languages: {
        'en-SA': 'https://www.arabiacab.com/en',
        'ar-SA': 'https://www.arabiacab.com/ar'
      }
    },
    openGraph: {
      title: isAr ? titleAr : titleEn,
      description: isAr ? descAr : descEn,
      url: `https://www.arabiacab.com/${locale}`,
      siteName: 'ArabiaCab',
      locale: isAr ? 'ar_SA' : 'en_SA',
      type: 'website'
    }
  };
}

const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'ArabiaCab',
      description: 'Reliable taxi service in Saudi Arabia — cab booking Riyadh, airport taxi Jeddah, Makkah to Madinah cab, and more.',
      url: 'https://www.arabiacab.com',
      telephone: '+966XXXXXXXXX',
      email: 'bookings@arabiacab.com',
      openingHours: 'Mo-Su 00:00-24:00',
      priceRange: 'SAR 30 - SAR 1100',
      areaServed: [
        { '@type': 'City', name: 'Riyadh', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } },
        { '@type': 'City', name: 'Jeddah', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } },
        { '@type': 'City', name: 'Makkah', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } },
        { '@type': 'City', name: 'Madinah', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } },
        { '@type': 'City', name: 'Dammam', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } }
      ],
      serviceType: 'Taxi Service',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500'
      }
    }
  ]
};

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      <Navbar />
      <Hero />
      <BookingWidget className="-mt-24 md:-mt-32" />
      <StatsSection />
      <FleetShowcase />
      <FixedPricing />
      <HowItWorks />
      <ServicesSection locale={locale} />
      <CitiesWeServe locale={locale} />
      <Testimonials />
    </main>
  );
}
