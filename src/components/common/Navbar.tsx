'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

export function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { name: locale === 'ar' ? 'عن الشركة' : 'About', href: '/about' },
    { name: locale === 'ar' ? 'الخدمات' : 'Services', href: '/services' },
    { name: locale === 'ar' ? 'المدن' : 'Cities', href: '/cities' },
    { name: locale === 'ar' ? 'الأسعار' : 'Pricing', href: '/pricing' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 w-full z-[1000] transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(10,10,10,0.98)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[rgba(15,15,15,0.95)]'
      } backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)]`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-[#CCFF00] rounded-lg flex items-center justify-center">
            <span className="text-[#0A0A0A] font-bold text-xs leading-none" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>AC</span>
          </div>
          <span className="text-white font-bold text-[1.1rem] tracking-tight" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
            Arabia<span className="text-[#CCFF00]">Cab</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href as any}
              className="text-sm font-medium text-[#888888] hover:text-white transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-[#888888] hover:text-white transition-colors text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{locale === 'en' ? 'عربي' : 'EN'}</span>
          </button>
          <Link
            href="/booking"
            className="bg-[#CCFF00] hover:bg-[#B8E600] text-[#0A0A0A] rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(204,255,0,0.25)]"
          >
            {locale === 'ar' ? 'احجز رحلة' : 'Book a Ride'}
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-[#888888] hover:text-white transition-colors p-1"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            className="text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[rgba(10,10,10,0.99)] border-b border-[rgba(255,255,255,0.06)] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#888888] hover:text-white transition-colors py-3 text-base font-medium border-b border-[rgba(255,255,255,0.05)] last:border-0"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-[#CCFF00] hover:bg-[#B8E600] text-[#0A0A0A] rounded-full px-6 py-3 text-sm font-semibold text-center transition-colors"
                >
                  {locale === 'ar' ? 'احجز رحلة' : 'Book a Ride'}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
