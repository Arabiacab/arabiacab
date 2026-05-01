'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';

const routes = [
  { from: 'Riyadh', to: 'Jeddah', distance: '900km', time: '~9hrs', price: 'From SAR 350' },
  { from: 'Riyadh', to: 'Dammam', distance: '400km', time: '~4hrs', price: 'From SAR 180' },
  { from: 'Jeddah', to: 'Mecca', distance: '80km', time: '~1hr', price: 'From SAR 80' },
  { from: 'Mecca', to: 'Medina', distance: '450km', time: '~4.5hrs', price: 'From SAR 200' },
  { from: 'Riyadh', to: 'Abha', distance: '900km', time: '~9hrs', price: 'From SAR 380' },
  { from: 'Dammam', to: 'Jubail', distance: '100km', time: '~1hr', price: 'From SAR 90' },
  { from: 'Jeddah', to: 'Taif', distance: '100km', time: '~1.5hrs', price: 'From SAR 100' },
  { from: 'Riyadh', to: 'Tabuk', distance: '1200km', time: '~12hrs', price: 'From SAR 500' },
  { from: 'Dammam', to: 'Khobar', distance: '30km', time: '~30min', price: 'From SAR 50' },
];

export function PopularRoutes() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white font-bold mb-4"
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-1px',
          }}
        >
          Most Popular Intercity Routes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <h3
            className="text-white font-semibold mb-3"
            style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px' }}
          >
            How much does it cost to travel from Riyadh to Jeddah?
          </h3>
          <p className="text-[#888] text-[15px] leading-relaxed max-w-3xl">
            A taxi from Riyadh to Jeddah with Arabia Cab starts from SAR 350 for a Standard Sedan (Toyota Camry). The journey covers approximately 900km and takes around 9 hours. Premium SUV options (GMC Yukon) are available from SAR 650. All prices are fixed with no hidden fees or surge pricing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route, idx) => (
            <motion.div
              key={idx}
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
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5 text-[#666] text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{route.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#666] text-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{route.distance}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-syne), sans-serif', color: '#CCFF00', fontSize: '14px' }}
                >
                  {route.price}
                </span>
                <Link
                  href="/booking"
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_16px_rgba(204,255,0,0.3)]"
                  style={{ background: '#CCFF00', color: '#0A0A0A' }}
                >
                  Book This Route
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
