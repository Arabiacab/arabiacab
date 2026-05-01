'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const allReviews = [
  {
    id: 1,
    name: 'Guillermo Rauch',
    city: 'Riyadh',
    initials: 'GR',
    color: '#0066FF',
    text: 'I am very impressed with this taxi booking service! The booking process was easy, fast, and most importantly the cars provided were truly luxurious. I felt like a celebrity. Thank you so much for this unforgettable experience.',
  },
  {
    id: 2,
    name: 'Ayaka Kamisato',
    city: 'Jeddah',
    initials: 'AK',
    color: '#CCFF00',
    text: 'I have used this taxi booking service several times and I am always satisfied with my experience. The cars are always clean and comfortable, and the drivers are always friendly and professional. Highly recommended!',
  },
  {
    id: 3,
    name: 'Luna M.',
    city: 'Mecca',
    initials: 'LM',
    color: '#FF6B35',
    text: 'I recently used this taxi booking service for my business trip. The quick and easy booking process made it very efficient, and the luxury cars added an elegant touch to my travel experience. Will definitely use again!',
  },
  {
    id: 4,
    name: 'Ayoto Kamisato',
    city: 'Dammam',
    initials: 'AK',
    color: '#9B59B6',
    text: 'I cannot emphasize enough how extraordinary the experience of using this service was. The cars are the latest models with full amenities, making me feel like a VIP. This service provides outstanding added value to every trip.',
  },
  {
    id: 5,
    name: 'Diluc Maulana',
    city: 'Medina',
    initials: 'DM',
    color: '#0066FF',
    text: 'I always look for a combination of comfort and style in every journey, and this taxi booking service delivers both perfectly. From the range of luxurious cars to the friendly customer service, everything makes me feel truly valued.',
  },
  {
    id: 6,
    name: 'Diego L.',
    city: 'Abha',
    initials: 'DL',
    color: '#CCFF00',
    text: 'I have used this taxi booking service for my airport transfers several times. The cars are always on time and in pristine condition. The drivers are always professional and friendly, making my journey truly enjoyable.',
  },
  {
    id: 7,
    name: 'Furnia',
    city: 'Khobar',
    initials: 'FN',
    color: '#FF6B35',
    text: 'As someone who values both comfort and style, I was delighted with the luxury car I booked. It offered the finest of luxury rides, the attention to detail and the service provided added a touch of class to the whole experience.',
  },
  {
    id: 8,
    name: 'Isabella S.',
    city: 'Riyadh',
    initials: 'IS',
    color: '#9B59B6',
    text: 'This taxi booking service redefines luxury travel. The fleet of luxury cars available and the over selected for my journey exceeded all expectations. The ideal solution for anyone seeking a comfortable and stylish journey.',
  },
  {
    id: 9,
    name: 'Emily W.',
    city: 'Jeddah',
    initials: 'EW',
    color: '#0066FF',
    text: 'I recently used this booking service for a special occasion, and I couldn\'t have been happier with the experience. The luxury car provided added a touch of elegance to my journey. Top class, top service — simply unmatched!',
  },
];

export function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? allReviews : allReviews.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white font-bold"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(26px, 3vw, 40px)',
              letterSpacing: '-1px',
            }}
          >
            What our<br className="hidden md:block" /> enchanted riders say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#888] text-sm max-w-xs"
          >
            Here is what satisfied customers who have experienced ArabiaCab have to say about our service.
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {visible.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid rounded-2xl p-6 mb-4"
              style={{
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                ))}
              </div>

              {/* Review text */}
              <p
                className="mb-5 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', lineHeight: 1.65 }}
              >
                {review.text}
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: review.color,
                    color: review.color === '#CCFF00' ? '#0A0A0A' : '#FFFFFF',
                  }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{review.name}</p>
                  <p className="text-[#666] text-xs">{review.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {!showAll && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full text-sm font-medium text-white transition-all duration-200 hover:bg-[rgba(255,255,255,0.06)]"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Show More
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
