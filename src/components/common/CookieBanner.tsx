'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="bg-[#111111] border border-[#333333] shadow-2xl rounded-2xl p-6 pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2">We value your privacy</h4>
                <p className="text-sm text-gray-400">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with Saudi PDPL guidelines.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button 
                  onClick={rejectAll}
                  variant="outline" 
                  className="border-[#333333] text-gray-300 hover:bg-[#1A1A1A] hover:text-white"
                >
                  Reject All
                </Button>
                <Button 
                  onClick={acceptAll}
                  className="bg-[#C9A84C] hover:bg-[#F0D080] text-black font-bold"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
