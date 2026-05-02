'use client';

import { Navbar } from '@/components/common/Navbar';
import { Hero } from '@/components/sections/Hero';
import { FAQSection } from '@/components/sections/FAQSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FleetShowcase } from '@/components/sections/FleetShowcase';
import { Link } from '@/i18n/routing';
import { MapPin, CheckCircle, ShieldCheck } from 'lucide-react';

interface CityLandingPageProps {
  city: string;
  arabicName: string;
  description: string;
  landmarks: string[];
}

export function CityLandingPage({ city, arabicName, description, landmarks }: CityLandingPageProps) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arabiacab.com' },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://arabiacab.com/cities' },
      { '@type': 'ListItem', position: 3, name: `${city} Taxi Service`, item: `https://arabiacab.com/${city.toLowerCase()}-taxi-service` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <div className="pt-24">
        {/* Optimized H1 Section */}
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto text-center">
          <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
            Premium Taxi Service in <span className="text-[#CCFF00]">{city}</span>
          </h1>
          <p className="text-[#888] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </section>

        {/* Hero Form injected */}
        <div className="mb-20">
          <Hero isMainPage={false} />
        </div>

        {/* SEO Content Section */}
        <section className="py-16 md:py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-white text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                Why Choose ArabiaCab in {city}?
              </h2>
              <div className="space-y-6">
                {[
                  { title: `Local ${city} Drivers`, desc: `Our drivers know ${city} inside out, from busy downtown streets to quiet suburbs.` },
                  { title: 'Airport Transfers', desc: `Reliable and punctual rides to and from the local airport.` },
                  { title: '24/7 Availability', desc: `Day or night, our fleet is ready to serve you in ${city}.` }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <ShieldCheck className="w-8 h-8 text-[#CCFF00] shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-[#888]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-10 rounded-2xl border border-white/10">
              <h3 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                Popular {city} Destinations
              </h3>
              <ul className="space-y-4">
                {landmarks.map((landmark, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#CCC]">
                    <MapPin className="w-5 h-5 text-[#CCFF00]" />
                    <span>{landmark}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href="/booking"
                  className="block w-full text-center py-4 rounded-xl font-bold text-[#0A0A0A] transition-all duration-200 hover:scale-105"
                  style={{ background: '#CCFF00' }}
                >
                  Book a Taxi in {city} Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FleetShowcase />
        <Testimonials />
        <FAQSection />

      </div>
    </main>
  );
}
