'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Saud',
    city: 'Riyadh',
    rating: 5,
    car: 'Mercedes S-Class',
    text: 'Impeccable service. The driver was 15 minutes early and the S-Class was pristine. Exactly what you expect from a premium chauffeur service.'
  },
  {
    id: 2,
    name: 'Sarah M.',
    city: 'Jeddah',
    rating: 5,
    car: 'GMC Yukon',
    text: 'Booked an airport transfer for my family. The driver helped with all our luggage and the ride was incredibly smooth. Highly recommend!'
  },
  {
    id: 3,
    name: 'Khalid O.',
    city: 'Mecca',
    rating: 5,
    car: 'Lexus LX 600',
    text: 'Used ArabiaCab for our Umrah trip. The convenience and comfort provided were outstanding. Reliable taxi Arabia — highly recommended!'
  },
  {
    id: 4,
    name: 'James Wilson',
    city: 'Dammam',
    rating: 5,
    car: 'BMW 7 Series',
    text: 'Corporate travel made easy. Reliable, discreet, and very professional. Will definitely use again for our executives.'
  }
];

export function Testimonials() {
  const t = useTranslations('HomePage');
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' });

  return (
    <section className="py-24 bg-[#050505] border-t border-[#333333]/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            What Our Passengers Say
          </h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto" ref={emblaRef}>
          <div className="flex gap-6 cursor-grab active:cursor-grabbing pb-8">
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_40%] min-w-0"
              >
                <div className="bg-[#111111] border border-[#333333] p-8 rounded-2xl h-full flex flex-col hover:border-[#C9A84C]/30 transition-colors">
                  <div className="flex gap-1 mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-8 grow leading-relaxed">
                    &quot;{item.text}&quot;
                  </p>
                  <div className="flex flex-col mt-auto pt-6 border-t border-[#333333]">
                    <span className="text-white font-bold font-display text-lg">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.city} • {item.car}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
