'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { Users, Briefcase, Snowflake } from 'lucide-react';
import { Link } from '@/i18n/routing';

const fleet = [
  {
    id: 'gmc-yukon',
    name: 'GMC Yukon',
    category: 'BUSINESS CLASS',
    image: '/cars/gmc_yukon.png',
    specs: { passengers: 7, luggage: 5, ac: true },
    price: 350
  },
  {
    id: 'mercedes-s',
    name: 'Mercedes S-Class',
    category: 'VIP CLASS',
    image: '/cars/gmc_yukon.png', // Fallback to same image for demo
    specs: { passengers: 3, luggage: 3, ac: true },
    price: 800
  },
  {
    id: 'toyota-camry',
    name: 'Toyota Camry',
    category: 'ECONOMY CLASS',
    image: '/cars/gmc_yukon.png', // Fallback to same image for demo
    specs: { passengers: 4, luggage: 2, ac: true },
    price: 150
  }
];

export function FleetShowcase() {
  const t = useTranslations('HomePage');

  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('fleetTitle')}
          </h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
        </motion.div>

        {/* Mobile Horizontal Scroll, Desktop Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar">
          {fleet.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="min-w-[85vw] md:min-w-0 snap-center group relative flex flex-col bg-[#111111] rounded-2xl border border-[#333333] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(201,168,76,0.15)] hover:border-[#C9A84C]/50"
            >
              <div className="absolute top-4 left-4 z-10 bg-[#C9A84C] text-[#0A0A0A] text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                {car.category}
              </div>
              
              <div className="relative h-56 w-full p-6 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#111111] rounded-t-2xl">
                <div className="absolute inset-0 bg-[#C9A84C] opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                <Image 
                  src={car.image} 
                  alt={car.name} 
                  fill 
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-2xl font-bold text-white font-display mb-4 group-hover:text-[#C9A84C] transition-colors">
                  {car.name}
                </h3>
                
                <div className="flex gap-4 text-gray-400 text-sm mb-6 pb-6 border-b border-[#333333]">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#C9A84C]" />
                    <span>{car.specs.passengers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-[#C9A84C]" />
                    <span>{car.specs.luggage}</span>
                  </div>
                  {car.specs.ac && (
                    <div className="flex items-center gap-1">
                      <Snowflake className="w-4 h-4 text-[#C9A84C]" />
                      <span>AC</span>
                    </div>
                  )}
                </div>

                <div className="flex items-end justify-between mb-6 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{t('from')}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white">SAR</span>
                      <span className="text-3xl font-bold font-numbers text-[#C9A84C]">{car.price}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={{ pathname: '/booking', query: { car: car.id } } as any}
                  className={buttonVariants({ className: "w-full bg-[#1A1A1A] hover:bg-[#C9A84C] text-white hover:text-black border border-[#333333] hover:border-transparent rounded-none transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(201,168,76,0.3)]" })}
                >
                  {t('bookThisCar')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
