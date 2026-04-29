'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plane, Compass, Briefcase, Moon, Crown, Map, Clock, Star } from 'lucide-react';

const services = [
  {
    id: 'airport',
    icon: Plane,
    titleEn: 'Airport Transfers',
    titleAr: 'توصيل المطار',
    descEn: 'Meet & Greet at all Saudi airports. Flight tracking included.',
    descAr: 'استقبال وتوديع في جميع مطارات السعودية. تتبع الرحلات متضمن.',
    colSpan: 'md:col-span-2 md:row-span-2'
  },
  {
    id: 'hajj',
    icon: Star,
    titleEn: 'Hajj & Umrah Transport',
    titleAr: 'نقل الحج والعمرة',
    descEn: 'Dedicated pilgrim transport — Mecca, Medina, Masjid Al-Haram routes.',
    descAr: 'نقل الحجاج والمعتمرين - طرق مكة والمدينة والمسجد الحرام.',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'vip',
    icon: Crown,
    titleEn: 'VIP & Diplomatic',
    titleAr: 'خدمات كبار الشخصيات',
    descEn: 'Luxury fleet for dignitaries, executives, and special occasions.',
    descAr: 'أسطول فاخر لكبار الشخصيات والتنفيذيين والمناسبات الخاصة.',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'corporate',
    icon: Briefcase,
    titleEn: 'Corporate Travel',
    titleAr: 'السفر للشركات',
    descEn: 'Monthly packages for businesses. Invoicing available.',
    descAr: 'باقات شهرية للشركات. الفواتير متاحة.',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'city',
    icon: Compass,
    titleEn: 'City Tours',
    titleAr: 'جولات سياحية',
    descEn: 'Explore Riyadh, Jeddah, Al-Ula with knowledgeable drivers.',
    descAr: 'استكشف الرياض، جدة، العلا مع سائقين ذوي خبرة.',
    colSpan: 'md:col-span-2 md:row-span-1'
  },
  {
    id: 'intercity',
    icon: Map,
    titleEn: 'Intercity Travel',
    titleAr: 'السفر بين المدن',
    descEn: 'Riyadh ↔ Jeddah ↔ Dammam and all major Saudi routes.',
    descAr: 'الرياض ↔ جدة ↔ الدمام وجميع الطرق الرئيسية.',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'night',
    icon: Moon,
    titleEn: 'Night Rides',
    titleAr: 'رحلات ليلية',
    descEn: 'Safe, reliable 24/7 service — any time, any destination.',
    descAr: 'خدمة آمنة وموثوقة على مدار الساعة.',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'hourly',
    icon: Clock,
    titleEn: 'Hourly Charter',
    titleAr: 'تأجير بالساعة',
    descEn: 'Book by the hour — meetings, events, city errands.',
    descAr: 'احجز بالساعة - اجتماعات، فعاليات، مهام المدينة.',
    colSpan: 'md:col-span-1 md:row-span-1'
  }
];

export function ServicesSection({ locale }: { locale: string }) {
  const t = useTranslations('HomePage');

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('servicesTitle')}
          </h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-[200px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const title = locale === 'ar' ? service.titleAr : service.titleEn;
            const desc = locale === 'ar' ? service.descAr : service.descEn;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl bg-[#111111] border border-[#333333] hover:border-[#C9A84C]/50 transition-colors p-6 flex flex-col justify-end ${service.colSpan}`}
              >
                {/* Background Pattern/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Icon size={120} className="text-[#C9A84C]" />
                </div>
                
                <div className="relative z-10 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#C9A84C] group-hover:text-[#0A0A0A] transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-display">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
