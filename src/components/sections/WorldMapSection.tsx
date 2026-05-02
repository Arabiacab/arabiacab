'use client';

import { motion } from 'framer-motion';
import { WorldMap } from '@/components/ui/world-map';

// Routes shown on the map. Mix of Saudi intercity + international arrivals
// that feed passengers into Arabia Cab's intercity network.
const mapDots = [
  // Riyadh → Jeddah (primary intercity route)
  { start: { lat: 24.7136, lng: 46.6753 }, end: { lat: 21.3891, lng: 39.8579 } },
  // Jeddah → Medina (Umrah corridor)
  { start: { lat: 21.3891, lng: 39.8579 }, end: { lat: 24.5247, lng: 39.5692 } },
  // Riyadh → Dammam (Eastern Province)
  { start: { lat: 24.7136, lng: 46.6753 }, end: { lat: 26.3927, lng: 49.9777 } },
  // Abha → Riyadh (South to Capital)
  { start: { lat: 18.2164, lng: 42.5053 }, end: { lat: 24.7136, lng: 46.6753 } },
  // Cairo → Jeddah (Egyptian pilgrims & travelers arriving at KAIA)
  { start: { lat: 30.0444, lng: 31.2357 }, end: { lat: 21.3891, lng: 39.8579 } },
  // Mumbai → Riyadh (Indian expats & workers)
  { start: { lat: 19.076, lng: 72.8777 }, end: { lat: 24.7136, lng: 46.6753 } },
];

const animatedWord = 'Saudi Arabia';

export function WorldMapSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(204,255,0,0.08)',
              border: '1px solid rgba(204,255,0,0.25)',
              color: '#CCFF00',
              fontFamily: 'var(--font-syne), sans-serif',
            }}
          >
            15+ Cities Covered
          </div>

          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(26px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              color: '#FFFFFF',
            }}
          >
            Every major route across{' '}
            <span className="text-[#CCFF00]">
              {animatedWord.split('').map((char, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -8, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.04 }}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </span>
          </h2>

          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}
          >
            Riyadh to Jeddah. Jeddah to Medina. Riyadh to Dammam. Arabia Cab connects
            every major city in the Kingdom with verified drivers and fixed pricing — no
            surprises, door to door.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <WorldMap dots={mapDots} lineColor="#CCFF00" />
        </motion.div>

        {/* Stats row below map */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { value: '15+', label: 'Cities served' },
            { value: '50K+', label: 'Rides completed' },
            { value: '4.9 ★', label: 'Average rating' },
            { value: '24/7', label: 'Available daily' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-5 px-4 rounded-2xl"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <p
                className="font-bold mb-1"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '22px',
                  color: '#CCFF00',
                }}
              >
                {value}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>{label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
