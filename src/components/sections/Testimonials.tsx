'use client';

import { motion } from 'framer-motion';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';
import type { Testimonial } from '@/components/ui/testimonials-columns-1';

const testimonials: Testimonial[] = [
  {
    text: 'Booked a sedan from Riyadh to Jeddah and the driver was at my door 10 minutes early. Smooth ride the whole way, fixed price, no surprises. Will use Arabia Cab every time.',
    name: 'Mohammed Al-Qahtani',
    city: 'Riyadh',
    initials: 'MQ',
    color: '#0066FF',
  },
  {
    text: 'Airport transfer from King Khalid was flawless. Driver was holding a sign, helped with luggage, and got me to my hotel with time to spare. Genuinely professional service.',
    name: 'Fatima Al-Dosari',
    city: 'Jeddah',
    initials: 'FD',
    color: '#CCFF00',
  },
  {
    text: 'Traveled with my whole family to Mecca for Umrah. The minivan was spotless, the driver was respectful and patient with our children. Exactly what we needed for a blessed journey.',
    name: 'Abdullah Al-Ghamdi',
    city: 'Mecca',
    initials: 'AG',
    color: '#FF6B35',
  },
  {
    text: 'I use Arabia Cab for all my client meetings across Riyadh. The premium SUV is always on time and the drivers dress professionally. It reflects well on my business.',
    name: 'Sarah Al-Rashid',
    city: 'Riyadh',
    initials: 'SR',
    color: '#9B59B6',
  },
  {
    text: 'Took my parents from Madinah to Jeddah. The car was comfortable, the route was smooth, and the driver stopped for breaks when needed. Arabia Cab understood what family travel means.',
    name: 'Omar Al-Maliki',
    city: 'Medina',
    initials: 'OM',
    color: '#2ECC71',
  },
  {
    text: 'Luxury car for a wedding event in Jeddah. The interior was immaculate and the driver was punctual to the minute. Everyone asked who arranged the transport. Arabia Cab.',
    name: 'Nour Al-Saud',
    city: 'Jeddah',
    initials: 'NS',
    color: '#E74C3C',
  },
  {
    text: 'Best intercity taxi service I have used in Saudi Arabia. Booking took 60 seconds, the price was confirmed upfront, and the driver called me the night before to confirm. Excellent.',
    name: 'Khalid Al-Zahrani',
    city: 'Dammam',
    initials: 'KZ',
    color: '#1ABC9C',
  },
  {
    text: 'I was nervous about a long trip to Abha but the driver made it easy. Comfortable, safe, and arrived right on schedule. I would not travel intercity any other way now.',
    name: 'Reem Al-Shehri',
    city: 'Khobar',
    initials: 'RS',
    color: '#F39C12',
  },
  {
    text: 'Arabia Cab is simply the most reliable option for traveling between Saudi cities. Fixed pricing, verified drivers, and door-to-door service — everything you need, nothing you do not.',
    name: 'Tariq Al-Otaibi',
    city: 'Abha',
    initials: 'TO',
    color: '#8E44AD',
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14"
        >
          {/* Badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(204,255,0,0.08)',
              border: '1px solid rgba(204,255,0,0.25)',
              color: '#CCFF00',
            }}
          >
            Rider Reviews
          </div>

          <h2
            className="text-white font-bold mb-4"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(26px, 4vw, 44px)',
              letterSpacing: '-1px',
              lineHeight: 1.15,
            }}
          >
            What our riders say
          </h2>
          <p className="text-[#666] text-base max-w-md leading-relaxed">
            Thousands of travelers across Saudi Arabia trust Arabia Cab for intercity rides,
            airport transfers, and daily travel.
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-4"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            maxHeight: '680px',
            overflow: 'hidden',
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={22}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={20}
            className="hidden lg:block"
          />
        </div>

      </div>
    </section>
  );
}
