import type { Metadata } from 'next';

import { Navbar } from '@/components/common/Navbar';
import { Link } from '@/i18n/routing';
import { Shield, Tag, Clock } from 'lucide-react';
import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';

export const metadata: Metadata = {
  title: 'About Arabia Cab | Trusted Ride Service Across Saudi Arabia',
  description: "Arabia Cab is Saudi Arabia's trusted intercity ride service. Police-verified drivers, transparent pricing, 15+ cities covered. Learn our story and mission.",
  keywords: ['about arabiacab', 'trusted taxi saudi arabia', 'verified drivers saudi arabia', 'intercity ride service saudi arabia'],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/about',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Arabia Cab',
  description: "Arabia Cab is Saudi Arabia's trusted intercity ride service with police-verified drivers and transparent pricing.",
  url: 'https://arabiacab.com/about',
  mainEntity: {
    '@type': 'Organization',
    name: 'Arabia Cab',
    foundingDate: '2022',
    areaServed: 'Saudi Arabia',
    telephone: '+966503667424',
  },
};

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    body: 'Every driver is background-checked by Saudi authorities before they join Arabia Cab. Every ride is fully insured for your peace of mind.',
  },
  {
    icon: Tag,
    title: 'Transparent Pricing',
    body: 'Fixed fares are displayed before you confirm your booking. Arabia Cab never uses surge pricing — the price you see is the price you pay.',
  },
  {
    icon: Clock,
    title: 'Always Available',
    body: 'Arabia Cab operates 24 hours a day, 7 days a week across all 15+ cities we serve. Book any time, travel any time.',
  },
];

const faqs = [
  {
    q: 'Is Arabia Cab safer than regular taxis in Saudi Arabia?',
    a: 'Yes. Every Arabia Cab driver undergoes a police verification check and background screening before being approved on our platform. All vehicles are inspected for safety standards. Arabia Cab also maintains insurance coverage for every ride.',
  },
  {
    q: 'How is Arabia Cab different from Uber and Careem in Saudi Arabia?',
    a: "Arabia Cab specialises exclusively in intercity travel between Saudi Arabia's major cities. Unlike Uber and Careem which focus primarily on short city trips, Arabia Cab is built for longer city-to-city journeys — Riyadh to Jeddah, Mecca to Medina, Dammam to Khobar. We offer fixed transparent pricing with no surge pricing at any time.",
  },
  {
    q: 'What cities does Arabia Cab cover in Saudi Arabia?',
    a: 'Arabia Cab currently operates in 15+ Saudi cities including Riyadh, Jeddah, Mecca, Medina, Dammam, Khobar, Abha, Taif, Tabuk, Jubail, Yanbu, Al-Ula, Najran, Hail, and Qassim. We are continuously expanding to new cities across the Kingdom.',
  },
  {
    q: 'Can I book Arabia Cab for long distance intercity travel?',
    a: 'Yes, intercity travel is Arabia Cab\'s core service. You can book rides between any two cities we cover. Simply enter your pickup city and destination city, choose your vehicle type, and confirm the fixed price — all before your ride begins.',
  },
  {
    q: 'How much does Arabia Cab cost compared to Careem or Uber?',
    a: 'Arabia Cab offers competitive fixed pricing for intercity travel. A standard sedan from Riyadh to Jeddah starts from SAR 350, compared to variable pricing on other platforms that can exceed SAR 500 during peak times. Arabia Cab never uses surge pricing.',
  },
];

export default async function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="pt-20 md:pt-28">

        <AboutHero />
        <AboutStory />

        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <h2
                className="text-white font-bold"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  letterSpacing: '-1px',
                }}
              >
                What We Stand For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl p-8"
                    style={{
                      background: '#1A1A1A',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                      style={{ background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)' }}
                    >
                      <Icon className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <h3
                      className="text-white font-bold mb-3"
                      style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '20px' }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed">{value.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#111111]">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2
                className="text-white font-bold"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  letterSpacing: '-0.5px',
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <div>
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <summary
                    className="text-white font-medium text-[15px] cursor-pointer py-3 list-none flex items-center justify-between"
                    style={{ userSelect: 'none' }}
                  >
                    {faq.q}
                    <span className="text-[#CCFF00] text-lg ml-4 shrink-0">+</span>
                  </summary>
                  <p className="text-[#888] text-sm leading-relaxed mt-2 pr-8">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

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
