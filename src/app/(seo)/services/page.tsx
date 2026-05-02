import type { Metadata } from 'next';

import { Navbar } from '@/components/common/Navbar';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Our Ride Services | Arabia Cab Saudi Arabia',
  description:
    'Standard Sedan, Premium SUV, Luxury, Economy, and Van intercity rides. Book city-to-city travel across Saudi Arabia with verified professional drivers.',
  keywords: [
    'intercity taxi saudi arabia',
    'sedan taxi saudi arabia',
    'SUV hire saudi arabia',
    'luxury car hire riyadh',
    'family van taxi saudi arabia',
    'arabiacab services',
  ],
  alternates: {
    canonical: 'https://www.arabiacab.com/en/services',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Arabia Cab Intercity Ride Services',
  provider: { '@type': 'Organization', name: 'Arabia Cab', telephone: '+966503667424' },
  areaServed: 'Saudi Arabia',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vehicle Types',
    itemListElement: [
      { '@type': 'Offer', name: 'Economy Sedan', price: '30', priceCurrency: 'SAR' },
      { '@type': 'Offer', name: 'Standard Sedan', price: '45', priceCurrency: 'SAR' },
      { '@type': 'Offer', name: 'Business SUV', price: '85', priceCurrency: 'SAR' },
      { '@type': 'Offer', name: 'Luxury Sedan', price: '120', priceCurrency: 'SAR' },
      { '@type': 'Offer', name: 'Family Van', price: '150', priceCurrency: 'SAR' },
    ],
  },
};

const services = [
  {
    badge: 'ECONOMY',
    name: 'Toyota Yaris',
    desc: 'The most affordable option for intercity travel. Ideal for solo travelers or couples looking for a reliable, budget-friendly city-to-city ride.',
    features: [
      'Seats up to 3 passengers',
      'Air conditioned',
      'Budget-friendly pricing',
      'Professional verified driver',
    ],
    price: 'SAR 30',
  },
  {
    badge: 'STANDARD',
    name: 'Toyota Camry',
    desc: 'Arabia Cab\'s most popular vehicle. The Toyota Camry offers a comfortable, spacious ride for intercity journeys across Saudi Arabia.',
    features: [
      'Seats up to 4 passengers',
      'Full air conditioning',
      'Ample boot space',
      '4.9★ rated drivers',
    ],
    price: 'SAR 45',
  },
  {
    badge: 'BUSINESS SUV',
    name: 'GMC Yukon',
    desc: 'The preferred choice for business travelers and families. The GMC Yukon delivers premium space and comfort for longer intercity routes.',
    features: [
      'Seats up to 6 passengers',
      'Extra luggage capacity',
      'Business class comfort',
      'Meet & greet available',
    ],
    price: 'SAR 85',
  },
  {
    badge: 'LUXURY',
    name: 'Lexus ES 350',
    desc: 'Travel in style between Saudi Arabia\'s major cities. The Lexus ES 350 is Arabia Cab\'s luxury sedan — perfect for business and VIP travel.',
    features: [
      'Premium leather interior',
      'Seats up to 4',
      'Highest-rated drivers only',
      'Wi-Fi available on request',
    ],
    price: 'SAR 120',
  },
  {
    badge: 'FAMILY VAN',
    name: 'Toyota HiAce',
    desc: 'Arabia Cab\'s largest vehicle, ideal for groups and families traveling intercity. The Toyota HiAce provides maximum space for passengers and luggage.',
    features: [
      'Seats up to 12 passengers',
      'Maximum luggage space',
      'Ideal for group travel',
      'Available across all cities',
    ],
    price: 'SAR 150',
  },
];

const geoFaqs = [
  {
    q: 'How much does it cost to hire a taxi from Riyadh to Jeddah?',
    a: 'A taxi from Riyadh to Jeddah with Arabia Cab starts from SAR 350 for a Toyota Camry Standard Sedan. For larger groups, a GMC Yukon SUV starts from SAR 650 on this route. All fares are fixed prices — Arabia Cab does not use surge pricing at any time.',
  },
  {
    q: 'What is the difference between Arabia Cab and Careem for intercity travel?',
    a: 'Arabia Cab is built exclusively for intercity travel between Saudi cities, while Careem focuses primarily on short within-city trips. Arabia Cab offers fixed transparent pricing for city-to-city routes, professional drivers trained for long-distance travel, and vehicles suited for 1-12 hour journeys.',
  },
  {
    q: 'How do I book a long-distance taxi in Saudi Arabia?',
    a: 'To book a long-distance taxi in Saudi Arabia with Arabia Cab: visit arabiacab.com, select your pickup city and destination, choose your vehicle type, enter your name and WhatsApp number, and confirm your fixed fare. You will receive instant WhatsApp confirmation from Arabia Cab at +966503667424.',
  },
  {
    q: 'Are Arabia Cab drivers verified in Saudi Arabia?',
    a: 'Yes. Every Arabia Cab driver passes a police verification check conducted by Saudi Arabian authorities before being approved to drive on the platform. Drivers are also professionally trained for intercity travel and rated by passengers after every completed ride.',
  },
];

export default async function ServicesPage() {

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
            {/* Pill */}
            <div
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest"
              style={{ background: '#CCFF00', color: '#0A0A0A' }}
            >
              INTERCITY RIDES ONLY
            </div>

            <h1
              className="text-white font-bold mb-6"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Our Ride Services
            </h1>

            <p className="text-[#888] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              City-to-city travel across Saudi Arabia. Choose the vehicle that suits your journey.
              Pick-up and drop-off between cities — no local hailing.
            </p>

            {/* Note badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
              style={{
                background: 'rgba(204,255,0,0.08)',
                border: '1px solid rgba(204,255,0,0.2)',
                color: '#CCFF00',
              }}
            >
              ⚡ All rides are intercity transfers — not local taxis
            </div>
          </div>
        </section>

        {/* SECTION 2 — SERVICE CARDS */}
        <section className="py-20" style={{ background: '#111111' }}>
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <h2
                className="text-white font-bold"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(28px, 3.5vw, 42px)',
                  letterSpacing: '-1px',
                }}
              >
                Choose Your Vehicle
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row gap-8 p-8 rounded-2xl"
                  style={{
                    background: '#1A1A1A',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Left */}
                  <div className="flex-1">
                    <span
                      className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-widest"
                      style={{ background: '#CCFF00', color: '#0A0A0A' }}
                    >
                      {service.badge}
                    </span>
                    <h3
                      className="text-white font-bold mb-3"
                      style={{
                        fontFamily: 'var(--font-syne), sans-serif',
                        fontSize: '26px',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      {service.name}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed mb-5">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#aaa]">
                          <span className="text-[#CCFF00] font-bold">✓</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-start md:items-end justify-between gap-6 md:min-w-[200px] shrink-0">
                    <div className="md:text-right">
                      <p
                        className="font-bold"
                        style={{
                          fontFamily: 'var(--font-syne), sans-serif',
                          fontSize: '36px',
                          color: '#CCFF00',
                          letterSpacing: '-1px',
                          lineHeight: 1.1,
                        }}
                      >
                        {service.price}
                      </p>
                      <p className="text-[#555] text-xs mt-1">starting from / trip</p>
                    </div>
                    <Link
                      href="/booking"
                      className="px-6 py-3 rounded-xl font-bold text-[#0A0A0A] transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_24px_rgba(204,255,0,0.3)] whitespace-nowrap"
                      style={{ background: '#CCFF00', fontSize: '14px' }}
                    >
                      Book This →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — GEO CONTENT */}
        <section className="py-16 bg-[#0A0A0A]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <h2
              className="text-white font-bold mb-10 text-center"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(24px, 3vw, 34px)',
                letterSpacing: '-0.5px',
              }}
            >
              Intercity Rides Across Saudi Arabia — Common Questions
            </h2>

            <div className="space-y-10">
              {geoFaqs.map((item, idx) => (
                <div key={idx}>
                  <h3
                    className="text-white font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px' }}
                  >
                    {item.q}
                  </h3>
                  <p className="text-[#888] text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — CTA */}
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
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(204,255,0,0.08) 0%, transparent 70%)',
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
                  Ready to Book Your Intercity Ride?
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
                    href="/pricing"
                    className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', fontSize: '15px' }}
                  >
                    See Pricing →
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
