'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export interface Testimonial {
  text: string;
  name: string;
  city: string;
  initials: string;
  color: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: props.duration ?? 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...Array(2)].map((_, dupIdx) => (
          <React.Fragment key={dupIdx}>
            {props.testimonials.map(({ text, name, city, initials, color }, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 w-[280px] md:w-[300px]"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  flexShrink: 0,
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                  ))}
                </div>

                {/* Review text */}
                <p
                  className="mb-5 leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.72)',
                    fontSize: '14px',
                    lineHeight: 1.7,
                  }}
                >
                  {text}
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: color,
                      color: color === '#CCFF00' ? '#0A0A0A' : '#FFFFFF',
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight"
                       style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                      {name}
                    </p>
                    <p className="text-[#666] text-xs mt-0.5">{city}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
