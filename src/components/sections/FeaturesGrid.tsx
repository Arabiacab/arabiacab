'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { MapPin, Shield, ArrowRight } from 'lucide-react';

const cities = ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Abha'];

export function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ gridTemplateRows: 'auto auto' }}>

          {/* Large Left Card — Book Your Ride Today */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:row-span-2 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.06)',
              minHeight: '340px',
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }}
            />

            <div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)' }}
              >
                <ArrowRight className="w-5 h-5 text-[#CCFF00]" />
              </div>
              <h3
                className="text-white font-bold mb-4 leading-tight"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  letterSpacing: '-0.5px',
                }}
              >
                Reserve Your<br />Luxurious Journey<br />Today!
              </h3>
              <p className="text-[#888] text-sm leading-relaxed max-w-[280px]">
                Embark on a stylish and comfortable ride with our exclusive fleet of professional drivers.
              </p>
            </div>

            <Link
              href="/booking"
              className="mt-8 inline-flex items-center gap-2 self-start px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_24px_rgba(204,255,0,0.3)]"
              style={{ background: '#CCFF00', color: '#0A0A0A' }}
            >
              Booking Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Top Right — City Routes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(204,255,0,0.1)', border: '1px solid rgba(204,255,0,0.15)' }}
              >
                <MapPin className="w-4 h-4 text-[#CCFF00]" />
              </div>
              <h3
                className="text-white font-bold mb-1"
                style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px' }}
              >
                City to City Routes
              </h3>
              <p className="text-[#666] text-xs">Intercity transfers across Saudi Arabia</p>
            </div>

            {/* Route dots */}
            <div className="flex flex-wrap gap-2">
              {cities.map((city, i) => (
                <span
                  key={city}
                  className="text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5"
                  style={{
                    background: i === 0 ? 'rgba(204,255,0,0.12)' : 'rgba(255,255,255,0.05)',
                    color: i === 0 ? '#CCFF00' : '#888',
                    border: i === 0 ? '1px solid rgba(204,255,0,0.2)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {i > 0 && <span className="text-[#444]">→</span>}
                  {city}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bottom Right — Professional Drivers */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(204,255,0,0.1)', border: '1px solid rgba(204,255,0,0.15)' }}
            >
              <Shield className="w-4 h-4 text-[#CCFF00]" />
            </div>
            <h3
              className="text-white font-bold mb-1"
              style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px' }}
            >
              Experienced Chauffeurs<br />for a Seamless Ride
            </h3>
            <p className="text-[#666] text-xs mt-2 mb-5">
              Verified, trained, and background-checked for your peace of mind.
            </p>

            {/* Driver stats */}
            <div className="flex gap-4">
              {[
                { label: 'Drivers', value: '200+' },
                { label: 'Trips', value: '5K+' },
                { label: 'Rating', value: '4.9★' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-white font-bold"
                    style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '20px' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#555] text-[11px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
