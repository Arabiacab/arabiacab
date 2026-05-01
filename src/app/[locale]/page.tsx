import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { FleetShowcase } from '@/components/sections/FleetShowcase';
import { ExclusiveSavings } from '@/components/sections/ExclusiveSavings';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { AvailableRoutes } from '@/components/sections/AvailableRoutes';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQSection } from '@/components/sections/FAQSection';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const titleEn = 'Arabia Cab | Premium City-to-City Rides in Saudi Arabia';
  const titleAr = 'أرابيا كاب | رحلات مميزة بين المدن في المملكة العربية السعودية';
  const descEn = 'Book professional intercity rides across Saudi Arabia. Verified drivers, transparent pricing. Riyadh, Jeddah, Mecca, Medina, Dammam and 15+ cities. Book instantly.';
  const descAr = 'احجز رحلات بين المدن في المملكة العربية السعودية. سائقون موثقون، أسعار شفافة. الرياض، جدة، مكة، المدينة، الدمام وأكثر من 15 مدينة. احجز فوراً.';

  return {
    title: isAr ? titleAr : titleEn,
    description: isAr ? descAr : descEn,
    keywords: [
      'taxi Saudi Arabia', 'intercity rides Saudi Arabia', 'Riyadh to Jeddah taxi',
      'book ride Saudi Arabia', 'premium taxi service', 'cab booking riyadh',
      'taxi jeddah mecca medina', 'verified drivers saudi arabia', 'arabiacab',
      'best taxi service riyadh to jeddah', 'intercity cab service saudi arabia',
      'hire driver mecca to medina', 'dammam to riyadh taxi price'
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
  '@type': 'LocalBusiness',
  name: 'Arabia Cab',
  description: 'Premium intercity ride service across Saudi Arabia — verified drivers, transparent pricing, 15+ cities.',
  url: 'https://arabiacab.com',
  telephone: '+966503667424',
  email: 'bookings@arabiacab.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SA',
    addressRegion: 'Riyadh',
  },
  openingHours: 'Mo-Su 00:00-24:00',
  priceRange: 'SAR 30 - SAR 500',
  areaServed: [
    'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar',
    'Tabuk', 'Abha', 'Taif', 'Jubail', 'Yanbu', 'Al-Ula',
    'Najran', 'Hail', 'Qassim', 'Jizan',
  ],
  serviceType: 'Taxi and Ride Service',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2000',
  },
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
      <Hero />
      <FleetShowcase />
      <ExclusiveSavings />
      <section id="booking-widget" className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center">
          <h2 className="text-white font-bold mb-3" style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-1px' }}>
            Book Your Ride
          </h2>
          <p className="text-[#888] text-sm">City rides and intercity transfers across Saudi Arabia</p>
        </div>
        <BookingWidget />
      </section>
      <FeaturesGrid />
      <AvailableRoutes />
      <Testimonials />
      <FAQSection />
    </main>
  );
}
