import type { Metadata } from 'next';

import { Navbar } from '@/components/common/Navbar';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Transparent Pricing | Arabia Cab Saudi Arabia',
  description:
    'Clear, upfront pricing for all Arabia Cab rides. Economy from SAR 30, Standard from SAR 45, SUV from SAR 85, Luxury from SAR 120. No hidden fees. City-to-city fare guide included.',
  keywords: [
    'arabiacab pricing',
    'taxi price saudi arabia',
    'riyadh jeddah taxi fare',
    'intercity taxi fare calculator saudi arabia',
    'how much taxi saudi arabia',
  ],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/pricing',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PriceSpecification',
  name: 'Arabia Cab Pricing',
  description: 'Transparent fixed pricing for intercity taxi rides across Saudi Arabia',
  priceCurrency: 'SAR',
  eligibleRegion: { '@type': 'Country', name: 'Saudi Arabia' },
};

const vehicleCards = [
  {
    badge: 'ECONOMY',
    badgeColor: '#FF6B35',
    badgeTextColor: '#fff',
    name: 'Toyota Yaris',
    price: 'SAR 30',
    features: ['Solo & couple trips', 'Short to medium routes', 'Budget-friendly'],
  },
  {
    badge: 'STANDARD',
    badgeColor: '#CCFF00',
    badgeTextColor: '#0A0A0A',
    name: 'Toyota Camry',
    price: 'SAR 45',
    features: ['Most popular choice', 'Up to 4 passengers', 'All route lengths'],
  },
  {
    badge: 'BUSINESS SUV',
    badgeColor: '#0066FF',
    badgeTextColor: '#fff',
    name: 'GMC Yukon',
    price: 'SAR 85',
    features: ['Families & groups', 'Extra luggage space', 'Up to 6 passengers'],
  },
  {
    badge: 'LUXURY',
    badgeColor: '#9B59B6',
    badgeTextColor: '#fff',
    name: 'Lexus ES 350',
    price: 'SAR 120',
    features: ['VIP & business', 'Premium interior', 'Top-rated drivers'],
  },
  {
    badge: 'FAMILY VAN',
    badgeColor: '#CCFF00',
    badgeTextColor: '#0A0A0A',
    name: 'Toyota HiAce',
    price: 'SAR 150',
    features: ['Groups up to 12', 'Maximum luggage', 'Best for large groups'],
  },
];

const routeRows = [
  { route: 'Riyadh → Jeddah', distance: '900km', duration: '~9hrs', economy: 'SAR 280', standard: 'SAR 350', suv: 'SAR 650' },
  { route: 'Riyadh → Dammam', distance: '400km', duration: '~4hrs', economy: 'SAR 130', standard: 'SAR 180', suv: 'SAR 320' },
  { route: 'Jeddah → Mecca', distance: '80km', duration: '~1hr', economy: 'SAR 55', standard: 'SAR 80', suv: 'SAR 150' },
  { route: 'Mecca → Medina', distance: '450km', duration: '~4.5hr', economy: 'SAR 140', standard: 'SAR 200', suv: 'SAR 380' },
  { route: 'Riyadh → Abha', distance: '900km', duration: '~9hrs', economy: 'SAR 280', standard: 'SAR 380', suv: 'SAR 700' },
  { route: 'Dammam → Jubail', distance: '100km', duration: '~1hr', economy: 'SAR 65', standard: 'SAR 90', suv: 'SAR 170' },
  { route: 'Jeddah → Taif', distance: '100km', duration: '~1.5hr', economy: 'SAR 70', standard: 'SAR 100', suv: 'SAR 190' },
  { route: 'Riyadh → Tabuk', distance: '1200km', duration: '~12hrs', economy: 'SAR 380', standard: 'SAR 500', suv: 'SAR 950' },
  { route: 'Dammam → Khobar', distance: '30km', duration: '~30min', economy: 'SAR 35', standard: 'SAR 50', suv: 'SAR 95' },
];

const faqs = [
  {
    q: 'Does Arabia Cab use surge pricing?',
    a: 'No. Arabia Cab does not use surge pricing under any circumstances. Whether you book during peak hours, weekends, or public holidays, the price you see when you confirm your booking is the exact price you pay. This is one of the key differences between Arabia Cab and ride-hailing apps.',
  },
  {
    q: 'What is included in the Arabia Cab fare?',
    a: 'The Arabia Cab fare includes the driver, fuel costs, all road tolls, and vehicle air conditioning. There are no additional charges for luggage, late-night travel, or booking in advance. The price confirmed at booking is the total amount you pay.',
  },
  {
    q: 'How do I pay for my Arabia Cab ride?',
    a: 'Arabia Cab currently accepts cash payment to the driver at the end of your journey. Online card payment via Mada or credit card is available on selected routes. Payment method is confirmed when you book via WhatsApp at +966503667424.',
  },
  {
    q: 'Are there discounts for return journeys?',
    a: 'Yes. Arabia Cab offers discounts on return journeys booked at the same time. Contact Arabia Cab via WhatsApp at +966503667424 to arrange a return journey discount. Group bookings of 3 or more vehicles also qualify for special pricing.',
  },
  {
    q: 'What is the cheapest intercity taxi in Saudi Arabia?',
    a: "Arabia Cab's Toyota Yaris Economy option offers the most affordable intercity taxi prices in Saudi Arabia. Starting from SAR 30 for shorter routes and SAR 280 for longer routes like Riyadh to Jeddah, it is among the most competitive intercity taxi pricing available.",
  },
];

export default async function PricingPage() {

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="pt-16 md:pt-28">

        {/* SECTION 1 — HERO */}
        <section
          className="relative flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 100%)',
          }}
        >
          {/* Radial lime glow at bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '800px',
              height: '400px',
              background: 'radial-gradient(ellipse at 50% 100%, rgba(204,255,0,0.12) 0%, transparent 70%)',
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-20 text-center">
            <h1
              className="text-white font-bold mb-6"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Transparent Pricing
            </h1>

            <p className="text-[#888] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Fixed fares for every intercity ride. No surge pricing. No hidden fees. The price you
              see is the price you pay.
            </p>

            {/* Green badges row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['✓ No hidden fees', '✓ No surge pricing', '✓ Fixed fares'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: 'rgba(204,255,0,0.1)',
                    border: '1px solid rgba(204,255,0,0.25)',
                    color: '#CCFF00',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — VEHICLE PRICING CARDS */}
        <section className="py-20" style={{ background: '#111111' }}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-4">
              <h2
                className="text-white font-bold"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  letterSpacing: '-1px',
                }}
              >
                Vehicle Type Pricing
              </h2>
            </div>
            <p className="text-center text-[#888] text-sm mb-12">
              Base starting prices per trip. Final fare depends on route distance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {vehicleCards.map((card, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-6 flex flex-col"
                  style={{
                    background: '#1A1A1A',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest self-start"
                    style={{
                      background: card.badgeColor,
                      color: card.badgeTextColor,
                    }}
                  >
                    {card.badge}
                  </span>

                  <p
                    className="text-white font-bold mb-4"
                    style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '16px' }}
                  >
                    {card.name}
                  </p>

                  <p
                    className="font-bold mb-0.5"
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: '40px',
                      color: '#CCFF00',
                      letterSpacing: '-1.5px',
                      lineHeight: 1,
                    }}
                  >
                    {card.price}
                  </p>
                  <p className="text-[#555] text-xs mb-5">/per trip</p>

                  <div
                    className="mb-5"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}
                  />

                  <ul className="space-y-2 mt-auto">
                    {card.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#888] text-sm">
                        <span className="text-[#CCFF00] font-bold text-xs">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — INTERCITY ROUTE FARE TABLE */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2
                className="text-white font-bold"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  letterSpacing: '-1px',
                }}
              >
                Intercity Route Fares
              </h2>
            </div>

            {/* GEO paragraph */}
            <div className="max-w-3xl mx-auto mb-10">
              <h3
                className="text-white font-semibold mb-3"
                style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px' }}
              >
                How much does it cost to travel between Saudi cities by taxi?
              </h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Arabia Cab offers fixed pricing for all intercity routes across Saudi Arabia. The
                fare depends on the distance between cities and the vehicle type chosen. Below are
                standard sedan fares for the most popular routes. SUV and luxury fares are typically
                1.5x to 2.5x the sedan price.
              </p>
            </div>

            {/* Pricing grid table */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Header */}
              <div
                className="grid grid-cols-6 gap-0 px-5 py-4"
                style={{ background: '#1A1A1A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                {['Route', 'Distance', 'Duration', 'Economy (Yaris)', 'Standard (Camry)', 'SUV (Yukon)'].map(
                  (col) => (
                    <span
                      key={col}
                      className="text-xs font-bold uppercase tracking-wider text-[#888]"
                    >
                      {col}
                    </span>
                  )
                )}
              </div>

              {/* Rows */}
              {routeRows.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-6 gap-0 px-5 py-4 items-center"
                  style={{
                    background: idx % 2 === 0 ? '#111111' : '#1A1A1A',
                    borderBottom:
                      idx < routeRows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span className="text-white text-sm font-medium">{row.route}</span>
                  <span className="text-[#888] text-sm">{row.distance}</span>
                  <span className="text-[#888] text-sm">{row.duration}</span>
                  <span className="text-[#CCFF00] text-sm font-semibold">{row.economy}</span>
                  <span className="text-[#CCFF00] text-sm font-semibold">{row.standard}</span>
                  <span className="text-[#CCFF00] text-sm font-semibold">{row.suv}</span>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-[#555] text-xs mt-4 text-center leading-relaxed">
              * Prices shown are estimates. Final confirmed price is given at booking. Prices include
              driver, fuel, and all tolls. No additional charges.
            </p>
          </div>
        </section>

        {/* SECTION 4 — FAQ */}
        <section className="py-16" style={{ background: '#111111' }}>
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
                Pricing FAQ
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

        {/* SECTION 5 — CTA */}
        <section className="py-16 bg-[#0A0A0A]">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
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
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(204,255,0,0.08) 0%, transparent 70%)',
                }}
              />
              <div className="relative">
                <h2
                  className="text-white font-bold mb-4"
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Book with Transparent Pricing
                </h2>
                <p className="text-[#888] text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  Fixed prices. Verified drivers. Door-to-door intercity service across Saudi Arabia.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/booking"
                    className="px-8 py-4 rounded-xl font-bold text-[#0A0A0A] transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_24px_rgba(204,255,0,0.3)]"
                    style={{ background: '#CCFF00', fontSize: '15px' }}
                  >
                    Book Now →
                  </Link>
                  <Link
                    href="/services"
                    className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', fontSize: '15px' }}
                  >
                    See All Services →
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
