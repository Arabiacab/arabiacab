import type { Metadata } from 'next';

import { Navbar } from '@/components/common/Navbar';
import { Link } from '@/i18n/routing';
import { CitiesHero } from './CitiesHero';
import { CitiesGrid } from './CitiesGrid';
import { PopularRoutes } from './PopularRoutes';
import { GeoContent } from './GeoContent';

export const metadata: Metadata = {
  title: 'Cities We Serve | Arabia Cab Saudi Arabia',
  description: 'Arabia Cab operates in Riyadh, Jeddah, Mecca, Medina, Dammam, Khobar and 15+ Saudi cities. Book your intercity ride between any two cities instantly.',
  keywords: ['cities arabia cab', 'riyadh taxi service', 'jeddah taxi service', 'mecca to medina taxi', 'intercity rides saudi arabia cities'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/cities',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Cities Arabia Cab Serves',
  description: 'Arabia Cab intercity taxi service operates in 15+ Saudi Arabian cities',
  url: 'https://arabiacab.com/cities',
  mentions: [
    { '@type': 'City', name: 'Riyadh', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } },
    { '@type': 'City', name: 'Jeddah', containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } },
    { '@type': 'City', name: 'Mecca' },
    { '@type': 'City', name: 'Medina' },
    { '@type': 'City', name: 'Dammam' },
    { '@type': 'City', name: 'Khobar' },
  ],
};

export default async function CitiesPage() {

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="pt-16 md:pt-28">

        <CitiesHero />
        <CitiesGrid />
        <PopularRoutes />
        <GeoContent />

        <section className="py-16 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div
              className="rounded-2xl p-12 text-center relative overflow-hidden"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 80px rgba(204,255,0,0.06)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(204,255,0,0.08) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <h2
                  className="text-white font-bold mb-4"
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Ready to Experience the Difference?
                </h2>
                <p className="text-[#888] text-base mb-8 max-w-xl mx-auto">
                  Join thousands of Saudi travelers who choose Arabia Cab for safe, transparent intercity rides.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/booking"
                    className="px-8 py-4 rounded-xl font-bold text-[#0A0A0A] transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_24px_rgba(204,255,0,0.3)]"
                    style={{ background: '#CCFF00', fontSize: '15px' }}
                  >
                    Book Your Ride →
                  </Link>
                  <Link
                    href="/cities"
                    className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', fontSize: '15px' }}
                  >
                    See All Cities →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
