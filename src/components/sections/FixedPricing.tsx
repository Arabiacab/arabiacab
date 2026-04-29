'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const popularRoutes = [
  { from: 'Makkah', to: 'Madinah', price: 450, slug: 'makkah-to-madinah-taxi' },
  { from: 'Jeddah', to: 'Makkah', price: 180, slug: 'jeddah-to-makkah-taxi' },
  { from: 'Jeddah Airport', to: 'Makkah', price: 250, slug: 'jeddah-airport-to-makkah-taxi' },
  { from: 'Jeddah', to: 'Madinah', price: 450, slug: 'jeddah-to-madinah-taxi' },
  { from: 'Riyadh', to: 'Jeddah', price: 1100, slug: 'riyadh-to-jeddah-taxi' },
  { from: 'Riyadh', to: 'Makkah', price: 1100, slug: 'riyadh-to-makkah-taxi' },
  { from: 'Riyadh', to: 'Madinah', price: 1100, slug: 'riyadh-to-madinah-taxi' },
  { from: 'Dammam', to: 'Riyadh', price: 500, slug: 'dammam-to-riyadh-taxi' }
];

export function FixedPricing() {
  const t = useTranslations('HomePage');

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Fixed Fares. No Surprises.
          </h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400">Transparent pricing for Saudi Arabia's most popular routes.</p>
        </motion.div>

        <div className="bg-[#111111] rounded-2xl border border-[#333333] overflow-hidden shadow-2xl">
          {popularRoutes.map((route, index) => (
            <Link 
              key={index}
              href={`/${route.slug}`}
              className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-[#333333] last:border-0 hover:bg-[#1A1A1A] transition-colors group"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                <span className="text-lg font-bold text-white font-display group-hover:text-[#C9A84C] transition-colors">{route.from}</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <span className="text-lg font-bold text-white font-display group-hover:text-[#C9A84C] transition-colors">{route.to}</span>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-white">SAR</span>
                  <span className="text-3xl font-bold font-numbers text-[#C9A84C]">{route.price}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#333333] group-hover:border-[#C9A84C] flex items-center justify-center bg-[#0A0A0A] group-hover:bg-[#C9A84C] transition-all">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0A0A0A]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/taxi-routes"
            className={buttonVariants({ variant: "outline", className: "border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 bg-transparent rounded-full px-8" })}
          >
            View All Routes & Prices
          </Link>
        </div>
      </div>
    </section>
  );
}
