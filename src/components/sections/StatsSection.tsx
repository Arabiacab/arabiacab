'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function Counter({ from, to, duration, suffix = '' }: { from: number, to: number, duration: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let start = performance.now();
    let frameId: number;
    
    const animate = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (to - from) + from));
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
}

export function StatsSection() {
  const t = useTranslations('HomePage');
  
  const stats = [
    { value: 5000, suffix: '+', label: 'Happy Customers' },
    { value: 50, suffix: '+', label: 'Professional Drivers' },
    { value: 8, suffix: '', label: 'Cities Covered' },
    { value: 4.9, suffix: '/5', label: 'Rating' },
  ];

  return (
    <section className="py-20 bg-[#050505] border-y border-[#333333]/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-[#333333]/30">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-4xl md:text-6xl font-bold font-numbers text-[#C9A84C] tracking-wider mb-2">
                <Counter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
