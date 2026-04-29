'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from '@/i18n/routing';

// Pre-computed stable values — Math.random() at render time causes SSR/client hydration mismatch
const PARTICLES = [
  { w: 3.99, h: 4.87, top: 53.7,  left: 33.9,  opacity: 0.31 },
  { w: 2.58, h: 2.20, top: 75.7,  left: 67.9,  opacity: 0.26 },
  { w: 3.34, h: 2.02, top: 88.3,  left: 11.7,  opacity: 0.38 },
  { w: 2.10, h: 2.73, top: 34.8,  left: 37.6,  opacity: 0.34 },
  { w: 2.66, h: 3.20, top: 24.3,  left: 58.0,  opacity: 0.56 },
  { w: 2.77, h: 4.03, top: 75.1,  left: 72.1,  opacity: 0.24 },
  { w: 2.35, h: 3.55, top: 85.2,  left: 22.5,  opacity: 0.26 },
  { w: 1.56, h: 4.60, top: 11.2,  left: 65.7,  opacity: 0.31 },
  { w: 4.81, h: 3.67, top: 52.9,  left: 42.9,  opacity: 0.38 },
  { w: 1.83, h: 3.73, top: 68.6,  left: 45.3,  opacity: 0.40 },
  { w: 1.30, h: 4.61, top: 55.1,  left: 49.3,  opacity: 0.57 },
  { w: 3.55, h: 4.44, top: 30.0,  left: 62.7,  opacity: 0.26 },
  { w: 4.52, h: 3.48, top: 96.8,  left: 59.5,  opacity: 0.33 },
  { w: 2.15, h: 2.99, top: 21.1,  left: 62.6,  opacity: 0.45 },
  { w: 3.86, h: 3.94, top: 91.1,  left: 55.6,  opacity: 0.21 },
  { w: 2.26, h: 4.80, top: 35.2,  left: 42.1,  opacity: 0.45 },
  { w: 1.84, h: 2.53, top: 48.7,  left: 85.9,  opacity: 0.37 },
  { w: 2.68, h: 3.65, top: 96.9,  left: 40.3,  opacity: 0.27 },
  { w: 1.80, h: 4.29, top: 47.2,  left: 40.3,  opacity: 0.55 },
  { w: 2.31, h: 1.36, top: 6.3,   left: 93.4,  opacity: 0.55 },
];

export function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Fallback dark gradient with gold geometric pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0A0A0A] to-[#0A0A0A]"></div>
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C9A84C]"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-semibold tracking-widest uppercase"
        >
          ArabiaCab — Your Trusted Ride in Arabia
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl md:text-3xl font-display font-semibold text-[#C9A84C] mb-4"
        >
          Taxi Service in Saudi Arabia
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[700px] text-lg md:text-xl text-gray-300 mb-10"
        >
          {t('subtitle')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            href="/booking"
            className={buttonVariants({ size: "lg", className: "bg-[#C9A84C] hover:bg-[#F0D080] text-black font-semibold px-8 py-6 text-lg rounded-none transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_25px_rgba(201,168,76,0.6)]" })}
          >
            {t('bookNow')}
          </Link>
          <a 
            href="https://wa.me/966XXXXXXXXX" 
            target="_blank" 
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "lg", className: "border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 px-8 py-6 text-lg rounded-none transition-all duration-300 bg-transparent" })}
          >
            <FaWhatsapp className="mr-2 h-5 w-5" />
            {t('whatsappUs')}
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          {['24/7 Available', '5000+ Trips', 'Reliable Taxi Arabia', 'All Saudi Cities'].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[#C9A84C]">✓</span> {badge}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9A84C]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}
