'use client';

import { motion } from 'framer-motion';

const sections = [
  {
    h3: 'What is the best way to travel between Saudi cities?',
    p: 'The most comfortable and reliable way to travel between Saudi Arabian cities is by private taxi or intercity cab service. Arabia Cab provides door-to-door intercity transfers with professional drivers, fixed pricing, and no need to wait for connecting transport. For routes like Riyadh to Jeddah or Mecca to Medina, a private intercity cab is significantly more comfortable than shared transportation.',
  },
  {
    h3: 'Are intercity taxis safe in Saudi Arabia?',
    p: 'Yes. Arabia Cab maintains strict safety standards for all intercity rides. Every driver is police-verified by Saudi authorities, vehicles are regularly inspected, and all rides include insurance coverage. Passengers can track their ride in real time and share trip details with family members.',
  },
  {
    h3: 'How do I book an intercity taxi in Saudi Arabia?',
    p: 'Booking an intercity ride with Arabia Cab is simple. Visit arabiacab.com, enter your pickup city and destination, choose your vehicle type, provide your contact details, and confirm the fixed fare. You will receive immediate confirmation via WhatsApp at +966503667424.',
  },
];

export function GeoContent() {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white font-bold mb-10 text-center"
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(22px, 3vw, 30px)',
            letterSpacing: '-0.5px',
          }}
        >
          Intercity Travel in Saudi Arabia — Everything You Need to Know
        </motion.h2>
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3
                className="text-white font-semibold mb-3"
                style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '17px' }}
              >
                {section.h3}
              </h3>
              <p className="text-[#888] text-[15px] leading-relaxed">{section.p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
