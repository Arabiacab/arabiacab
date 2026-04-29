'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const cities = [
  { id: 'riyadh', nameEn: 'Riyadh', nameAr: 'الرياض', top: '55%', left: '58%' },
  { id: 'jeddah', nameEn: 'Jeddah', nameAr: 'جدة', top: '63%', left: '23%' },
  { id: 'mecca', nameEn: 'Mecca', nameAr: 'مكة المكرمة', top: '66%', left: '26%' },
  { id: 'medina', nameEn: 'Medina', nameAr: 'المدينة المنورة', top: '50%', left: '22%' },
  { id: 'dammam', nameEn: 'Dammam', nameAr: 'الدمام', top: '45%', left: '78%' },
  { id: 'khobar', nameEn: 'Khobar', nameAr: 'الخبر', top: '46%', left: '80%' },
  { id: 'abha', nameEn: 'Abha', nameAr: 'أبها', top: '85%', left: '35%' },
  { id: 'al-ula', nameEn: 'Al-Ula', nameAr: 'العُلا', top: '30%', left: '18%' }
];

export function CitiesWeServe({ locale }: { locale: string }) {
  const t = useTranslations('HomePage');

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Cities We Serve
          </h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our premium chauffeur network covers all major destinations across the Kingdom.
          </p>
        </motion.div>

        {/* Map Container */}
        <div className="relative w-full max-w-2xl mx-auto aspect-square flex items-center justify-center p-4">
          
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          {/* Exact Map Bounds Container */}
          <div className="relative w-full h-full max-w-[800px] max-h-[800px]">
            {/* Neon Saudi Arabia Map Background */}
            <div 
              className="absolute inset-0 bg-white opacity-20 pointer-events-none z-0"
              style={{
                WebkitMaskImage: 'url(/saudi-map.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5)) drop-shadow(0 0 30px rgba(201,168,76,0.2))'
              }}
            />
            
            {/* City Dots Layer */}
            <div className="absolute inset-0 z-10">
              {cities.map((city, index) => {
              const cityName = locale === 'ar' ? city.nameAr : city.nameEn;
              return (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                  className="absolute group flex flex-col items-center"
                  style={{ top: city.top, left: city.left, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="relative cursor-pointer">
                    <div className="absolute -inset-3 rounded-full bg-white/20 animate-ping"></div>
                    <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#ffffff,0_0_40px_#C9A84C]"></div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full mt-3 opacity-0 group-hover:opacity-100 transition-all bg-[#050505]/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg whitespace-nowrap z-20 pointer-events-none group-hover:pointer-events-auto shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <p className="text-white font-bold mb-1 drop-shadow-md">{cityName}</p>
                    <Link href={`/${city.id}-taxi`} className="text-xs text-[#C9A84C] hover:text-white transition-colors">
                      Book in {cityName} →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
