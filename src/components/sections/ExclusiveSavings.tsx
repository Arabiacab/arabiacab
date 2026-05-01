'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

const promos = [
  {
    id: 1,
    route: 'Riyadh ↔ Jeddah',
    discount: '30%',
    label: 'City to City Travel',
    desc: 'Book intercity rides and save big on long-distance routes',
    valid: 'Limited time offer',
    href: '/booking?from=riyadh&to=jeddah',
    gradient: 'from-[#0A0A0A] via-[#111]/60 to-[#1a2200]/80',
    accent: '#CCFF00',
  },
  {
    id: 2,
    route: 'Dammam ↔ Riyadh',
    discount: '25%',
    label: 'Eastern Province Special',
    desc: 'Exclusive savings on Dammam to Riyadh transfers',
    valid: 'Limited time offer',
    href: '/booking?from=dammam&to=riyadh',
    gradient: 'from-[#0A0A0A] via-[#0a0a1a]/60 to-[#001822]/80',
    accent: '#CCFF00',
  },
];

export function ExclusiveSavings() {
  return (
    <section className="py-20 md:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white font-bold"
            style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-1px' }}
          >
            Travel more, spend less
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#888] text-sm max-w-xs md:text-right"
          >
            Exclusive discounts on our most popular intercity routes across Saudi Arabia.
          </motion.p>
        </div>

        {/* Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {promos.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ height: '220px' }}
            >
              {/* Background — simulated road/journey aesthetic */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 70% 50%, rgba(204,255,0,0.07) 0%, transparent 60%),
                    linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 40%, #111 100%)`,
                }}
              />

              {/* Decorative lines suggesting a road */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[20, 40, 60, 80].map((y) => (
                  <div
                    key={y}
                    className="absolute h-px w-full"
                    style={{
                      top: `${y}%`,
                      background: 'linear-gradient(to right, transparent, rgba(204,255,0,0.4), transparent)',
                    }}
                  />
                ))}
              </div>

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient}`} />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-7">
                <div>
                  <span
                    className="inline-block text-[11px] font-semibold uppercase tracking-widest mb-3"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {promo.label}
                  </span>
                  <div
                    className="font-bold leading-none mb-2"
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: '64px',
                      color: '#CCFF00',
                      lineHeight: 1,
                    }}
                  >
                    {promo.discount}
                  </div>
                  <p className="text-white font-semibold text-[15px]">{promo.route}</p>
                </div>

                <div className="flex items-end justify-between">
                  <p className="text-[#888] text-[13px] max-w-[200px]">{promo.desc}</p>
                  <Link
                    href={promo.href as any}
                    className="shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_20px_rgba(204,255,0,0.3)]"
                    style={{ background: '#CCFF00', color: '#0A0A0A' }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(204,255,0,0.04), transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
