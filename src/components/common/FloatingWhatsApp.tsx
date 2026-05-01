'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/966503667424"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book Now on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.7)] hover:scale-105 transition-all px-5 py-3 group"
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50"></div>
      <FaWhatsapp className="w-6 h-6 relative z-10 shrink-0" />
      <span className="relative z-10 font-bold text-sm whitespace-nowrap">Book Now on WhatsApp</span>
    </motion.a>
  );
}
