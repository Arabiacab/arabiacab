'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const cars = [
  {
    id: 'yaris',
    name: 'Toyota Yaris',
    label: 'Economy',
    subtitle: 'Budget-friendly city rides',
    widgetOption: 'Economy Sedan (Camry)',
    price: 30,
    rating: 4.7,
    recommend: 94,
    image: '/cars/toyota_yaris.png',
    accentColor: '#FF6B35',
  },
  {
    id: 'camry',
    name: 'Toyota Camry',
    label: 'Standard',
    subtitle: 'City rides & airport transfers',
    widgetOption: 'Economy Sedan (Camry)',
    price: 45,
    rating: 4.9,
    recommend: 98,
    image: '/cars/toyota_camry.png',
    accentColor: '#CCFF00',
  },
  {
    id: 'yukon',
    name: 'GMC Yukon',
    label: 'Business SUV',
    subtitle: 'Families, groups up to 6',
    widgetOption: 'Business SUV (Yukon)',
    price: 85,
    rating: 4.8,
    recommend: 96,
    image: '/cars/gmc_yukon.png',
    accentColor: '#0066FF',
  },
  {
    id: 'lexus',
    name: 'Lexus ES 350',
    label: 'Luxury',
    subtitle: 'Business & special occasions',
    widgetOption: 'Luxury Sedan (Lexus/Mercedes)',
    price: 120,
    rating: 5.0,
    recommend: 99,
    image: '/cars/lexus_es350.png',
    accentColor: '#9B59B6',
  },
  {
    id: 'hiace',
    name: 'Toyota HiAce',
    label: 'Family Van',
    subtitle: 'Large groups up to 12',
    widgetOption: 'Family Van (Hiace)',
    price: 150,
    rating: 4.8,
    recommend: 97,
    image: '/cars/toyota_hiace.png',
    accentColor: '#CCFF00',
  },
];

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold text-[#0A0A0A]"
      style={{ background: '#CCFF00', boxShadow: '0 8px 32px rgba(204,255,0,0.35)' }}
    >
      {message}
    </motion.div>
  );
}

export function FleetShowcase() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (car: typeof cars[0]) => {
    setSelectedCar(car.id);
    window.dispatchEvent(new CustomEvent('arabiacab:selectCar', {
      detail: { widgetOption: car.widgetOption, price: car.price },
    }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(`${car.name} selected — complete your booking below`);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
    setTimeout(() => {
      document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white font-bold mb-10"
          style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(26px, 3vw, 36px)' }}
        >
          Choose Your Ride
        </motion.h2>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto car-cards-wrap snap-x snap-mandatory pb-4">
          {cars.map((car, idx) => {
            const isSelected = selectedCar === car.id;
            return (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                whileHover={{ y: -5 }}
                onClick={() => handleSelect(car)}
                className="rounded-2xl p-4 cursor-pointer transition-all duration-300 min-w-[260px] md:min-w-0 snap-start shrink-0"
                style={{
                  background: isSelected ? '#1A2000' : '#1A1A1A',
                  border: `1px solid ${isSelected ? '#CCFF00' : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isSelected ? '0 0 0 1px rgba(204,255,0,0.25)' : 'none',
                }}
              >
                {/* Label */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${car.accentColor}22`, color: car.accentColor }}
                  >
                    {car.label}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#CCFF00] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Car image */}
                <div className="relative w-full mb-3 rounded-xl overflow-hidden" style={{ height: '120px', background: 'rgba(255,255,255,0.02)' }}>
                  <Image
                    src={car.image}
                    alt={`${car.name} - Premium Taxi Service in Saudi Arabia`}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Name & subtitle */}
                <p className="text-white font-bold text-sm mb-0.5" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>{car.name}</p>
                <p className="text-[#666] text-[11px] mb-3">{car.subtitle}</p>

                {/* Rating + Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#CCFF00] text-[#CCFF00]" />
                      <span className="text-[#CCFF00] text-xs font-semibold">{car.rating}</span>
                    </div>
                    <p className="text-[#555] text-[10px]">{car.recommend}% recommend</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold" style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px' }}>
                      SAR {car.price}
                    </p>
                    <p className="text-[#555] text-[10px]">/trip</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast} />}
      </AnimatePresence>
    </section>
  );
}
