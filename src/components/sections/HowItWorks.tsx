'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Car, CreditCard, MapPin } from 'lucide-react';

export function HowItWorks() {
  const t = useTranslations('HomePage');
  
  const steps = [
    {
      icon: Car,
      title: 'Choose Your Car',
      desc: 'Select from our premium fleet based on your needs.'
    },
    {
      icon: MapPin,
      title: 'Enter Details',
      desc: 'Provide your pickup, drop-off, and schedule.'
    },
    {
      icon: CreditCard,
      title: 'Confirm Booking',
      desc: 'Get an instant quote and book securely.'
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-[#333333]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-30"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-[#111111] border-2 border-[#C9A84C] flex items-center justify-center mb-6 relative z-10 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                  <Icon className="w-10 h-10 text-[#C9A84C]" />
                  <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-[#C9A84C] text-[#0A0A0A] font-bold flex items-center justify-center font-numbers text-xl">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 font-display">{step.title}</h3>
                <p className="text-gray-400 max-w-[250px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
