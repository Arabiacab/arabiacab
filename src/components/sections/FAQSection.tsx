'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What cities does Arabia Cab serve?',
    a: 'We serve 15+ cities across Saudi Arabia including Riyadh, Jeddah, Mecca, Medina, Dammam, Khobar, Tabuk, Abha, and more. Our intercity transfer network covers all major routes in the Kingdom.',
  },
  {
    q: 'How do I book a city-to-city ride?',
    a: 'Enter your pickup city and destination in the booking form, select your vehicle type, choose date and time, then submit. We confirm your booking within minutes via WhatsApp.',
  },
  {
    q: 'What vehicle types are available?',
    a: 'We offer Standard Sedan, Premium SUV, Luxury Car, Economy Hatchback, Van/Minibus, and Intercity Sedan options to suit every need and budget.',
  },
  {
    q: 'Is payment required upfront?',
    a: 'No upfront payment needed. Pay cash to the driver upon arrival, or use our online payment option at the time of booking for added convenience.',
  },
  {
    q: 'Are your drivers verified?',
    a: 'Yes. Every Arabia Cab driver is police-checked, licensed, and trained for professional service. All vehicles are regularly inspected and maintained to the highest standards.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  return (
    <section className="py-20 md:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Heading + Email */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white font-bold mb-4"
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(26px, 3vw, 36px)',
                letterSpacing: '-0.5px',
              }}
            >
              Frequently Asked<br />Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#888] text-sm leading-relaxed mb-8 max-w-xs"
            >
              Welcome to our FAQ section, where we address common questions to help you make informed decisions about our service.
            </motion.p>

            {/* Email subscription */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-[#1A1A1A] text-white text-sm rounded-xl px-4 py-3 outline-none placeholder:text-[#444] transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#CCFF00'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
              <button
                className="w-full md:w-auto px-5 py-3 rounded-xl text-sm font-semibold shrink-0 transition-all hover:shadow-[0_4px_20px_rgba(204,255,0,0.3)] hover:scale-105"
                style={{ background: '#CCFF00', color: '#0A0A0A' }}
              >
                Submit →
              </button>
            </motion.div>
          </div>

          {/* Right — Accordion */}
          <div>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <button
                  onClick={() => setOpen(open === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-[14px] md:py-5 text-left gap-4 group"
                >
                  <span
                    className="text-[15px] font-medium transition-colors group-hover:text-white"
                    style={{ color: open === idx ? '#FFFFFF' : 'rgba(255,255,255,0.75)' }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      background: open === idx ? '#CCFF00' : 'rgba(255,255,255,0.08)',
                      border: open === idx ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {open === idx
                      ? <Minus className="w-3.5 h-3.5 text-[#0A0A0A]" />
                      : <Plus className="w-3.5 h-3.5 text-[#888]" />
                    }
                  </div>
                </button>

                <AnimatePresence>
                  {open === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#888] text-[14px] leading-relaxed pb-5">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
