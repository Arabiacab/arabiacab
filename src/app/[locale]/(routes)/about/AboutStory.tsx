'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '50,000+', label: 'Rides Completed' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '15+', label: 'Cities Covered' },
  { value: '100%', label: 'Verified Drivers' },
];

export function AboutStory() {
  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[#CCFF00] text-xs font-semibold uppercase tracking-widest mb-4"
            >
              OUR STORY
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white font-bold mb-6"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: '36px',
                letterSpacing: '-1px',
                lineHeight: 1.15,
              }}
            >
              Built for Saudi Travelers
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              <p className="text-[#888] text-[15px] leading-relaxed">
                Arabia Cab was founded with one mission: to make intercity travel across Saudi Arabia safe, reliable, and affordable. We connect travelers between Saudi Arabia&apos;s major cities — from Riyadh to Jeddah, Mecca to Medina, Dammam to Khobar, and everywhere in between.
              </p>
              <p className="text-[#888] text-[15px] leading-relaxed">
                Every Arabia Cab driver is police-verified, professionally trained, and rated by passengers after every ride. Our transparent pricing means you always know the exact cost before you book — no surge pricing, no hidden fees, no surprises.
              </p>
              <p className="text-[#888] text-[15px] leading-relaxed">
                Since launching, Arabia Cab has completed over 50,000 rides with a 4.9/5 average rating. We operate across 15+ cities in Saudi Arabia, available 24 hours a day, 7 days a week.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6"
                style={{
                  background: '#1A1A1A',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p
                  className="font-bold mb-1"
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: '36px',
                    color: '#CCFF00',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-[#888] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
