'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

const routes = [
  {
    id: 1,
    from: 'Riyadh',
    to: 'Jeddah',
    distance: '900 km',
    duration: '~9 hrs',
    price: 'From SAR 350',
    cityPage: '/riyadh',
  },
  {
    id: 2,
    from: 'Riyadh',
    to: 'Dammam',
    distance: '400 km',
    duration: '~4 hrs',
    price: 'From SAR 180',
    cityPage: '/riyadh',
  },
  {
    id: 3,
    from: 'Jeddah',
    to: 'Makkah',
    distance: '80 km',
    duration: '~1 hr',
    price: 'From SAR 80',
    cityPage: '/jeddah',
  },
  {
    id: 4,
    from: 'Makkah',
    to: 'Madinah',
    distance: '450 km',
    duration: '~4 hrs',
    price: 'From SAR 200',
    cityPage: '/mecca',
  },
  {
    id: 5,
    from: 'Riyadh',
    to: 'Abha',
    distance: '900 km',
    duration: '~9 hrs',
    price: 'From SAR 380',
    cityPage: '/riyadh',
  },
  {
    id: 6,
    from: 'Dammam',
    to: 'Jubail',
    distance: '100 km',
    duration: '~1 hr',
    price: 'From SAR 90',
    cityPage: '/dammam',
  },
];

function handleBookRoute(from: string, to: string) {
  window.dispatchEvent(new CustomEvent('arabiacab:selectRoute', {
    detail: { type: 'intercity', from, to },
  }));
  setTimeout(() => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

export function AvailableRoutes() {
  return (
    <section className="py-20 md:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white font-bold mb-2"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(26px, 3vw, 40px)',
                letterSpacing: '-1px',
              }}
            >
              Available Routes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#888] text-sm"
            >
              Book city-to-city rides across Saudi Arabia — pick-up and drop-off transfers only
            </motion.p>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route, idx) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(204,255,0,0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Route */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <div className="w-px h-8 bg-[rgba(204,255,0,0.2)]" />
                  <MapPin className="w-3 h-3 text-[#888]" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-white font-semibold text-[15px]">{route.from}</span>
                  <span className="text-[#888] text-sm">{route.to}</span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5 text-[#666] text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{route.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#666] text-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{route.distance}</span>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-syne), sans-serif', color: '#CCFF00', fontSize: '14px' }}
                >
                  {route.price}
                </span>
                <button
                  onClick={() => handleBookRoute(route.from, route.to)}
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_16px_rgba(204,255,0,0.3)]"
                  style={{ background: '#CCFF00', color: '#0A0A0A' }}
                >
                  Book This Route
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
