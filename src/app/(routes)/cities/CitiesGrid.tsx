'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';

const cities = [
  { name: 'Riyadh', region: 'Central Region' },
  { name: 'Jeddah', region: 'Western Region' },
  { name: 'Mecca', region: 'Western Region' },
  { name: 'Medina', region: 'Western Region' },
  { name: 'Dammam', region: 'Eastern Region' },
  { name: 'Khobar', region: 'Eastern Region' },
  { name: 'Abha', region: 'Southern Region' },
  { name: 'Taif', region: 'Western Region' },
  { name: 'Tabuk', region: 'Northwest Region' },
  { name: 'Jubail', region: 'Eastern Region' },
  { name: 'Yanbu', region: 'Western Region' },
  { name: 'Al-Ula', region: 'Northwest Region' },
  { name: 'Najran', region: 'Southern Region' },
  { name: 'Hail', region: 'Northern Region' },
  { name: 'Qassim', region: 'Central Region' },
  { name: 'Jizan', region: 'Southern Region' },
];

export function CitiesGrid() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white font-bold"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-1px',
            }}
          >
            All Covered Cities
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city, idx) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(204,255,0,0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)' }}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                </div>
              </div>
              <h3
                className="text-white font-bold mb-1"
                style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '16px' }}
              >
                {city.name}
              </h3>
              <p className="text-[#888] text-xs mb-4">{city.region}</p>
              <Link
                href="/booking"
                className="text-xs font-semibold transition-colors duration-200 hover:text-white"
                style={{ color: '#CCFF00' }}
              >
                Book from here →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
