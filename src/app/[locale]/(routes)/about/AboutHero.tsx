'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '40vh',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(204,255,0,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span
            className="inline-block text-[#CCFF00] text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5"
            style={{ background: 'rgba(204,255,0,0.1)', border: '1px solid rgba(204,255,0,0.2)' }}
          >
            OUR STORY
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-bold mb-4"
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            letterSpacing: '-2px',
            lineHeight: 1.08,
          }}
        >
          About Arabia Cab
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#888] text-lg mb-8"
        >
          Saudi Arabia&apos;s most trusted intercity ride service
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {['15+ Cities', '4.9★ Rating'].map((stat) => (
            <span
              key={stat}
              className="inline-block font-semibold text-sm px-4 py-2 rounded-full"
              style={{
                color: '#CCFF00',
                background: 'rgba(204,255,0,0.1)',
                border: '1px solid rgba(204,255,0,0.25)',
                fontFamily: 'var(--font-syne), sans-serif',
              }}
            >
              {stat}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
