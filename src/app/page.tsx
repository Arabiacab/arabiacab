import type { Metadata } from 'next';

import { Hero } from '@/components/sections/Hero';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { FleetShowcase } from '@/components/sections/FleetShowcase';
import { ExclusiveSavings } from '@/components/sections/ExclusiveSavings';
import { FeaturesGrid } from '@/components/sections/FeaturesGrid';
import { AvailableRoutes } from '@/components/sections/AvailableRoutes';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQSection } from '@/components/sections/FAQSection';

export async function generateMetadata(): Promise<Metadata> {
  const titleEn = 'Arabia Cab | Premium City-to-City Rides in Saudi Arabia';
  const descEn = 'Book professional intercity rides across Saudi Arabia. Verified drivers, transparent pricing. Riyadh, Jeddah, Mecca, Medina, Dammam and 15+ cities. Book instantly.';
  
  return {
    title: titleEn,
    description: descEn,
    keywords: [
      'taxi Saudi Arabia', 'intercity rides Saudi Arabia', 'Riyadh to Jeddah taxi',
      'book ride Saudi Arabia', 'premium taxi service', 'cab booking riyadh',
      'taxi jeddah mecca medina', 'verified drivers saudi arabia', 'arabiacab',
      'best taxi service riyadh to jeddah', 'intercity cab service saudi arabia',
      'hire driver mecca to medina', 'dammam to riyadh taxi price'
    ],
    alternates: {
      canonical: 'https://www.arabiacab.com',
    },
    openGraph: {
      title: titleEn,
      description: descEn,
      url: 'https://www.arabiacab.com',
      siteName: 'ArabiaCab',
      locale: 'en_SA',
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What cities does Arabia Cab serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve 15+ cities across Saudi Arabia including Riyadh, Jeddah, Mecca, Medina, Dammam, Khobar, Tabuk, Abha, and more. Our intercity transfer network covers all major routes in the Kingdom.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a city-to-city ride?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your pickup city and destination in the booking form, select your vehicle type, choose date and time, then submit. We confirm your booking within minutes via WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'What vehicle types are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer Standard Sedan, Premium SUV, Luxury Car, Economy Hatchback, Van/Minibus, and Intercity Sedan options to suit every need and budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is payment required upfront?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No upfront payment needed. Pay cash to the driver upon arrival, or use our online payment option at the time of booking for added convenience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your drivers verified?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every Arabia Cab driver is police-checked, licensed, and trained for professional service. All vehicles are regularly inspected and maintained to the highest standards.',
      },
    },
  ],
};

import { Navbar } from '@/components/common/Navbar';

export default async function HomePage() {
  const locale = 'en';

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...homepageJsonLd, '@type': 'TaxiService' }) }} />
      <div className="md:hidden">
        <Navbar />
      </div>
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
