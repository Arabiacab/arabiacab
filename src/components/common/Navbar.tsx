'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';

export function Navbar() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Services', href: '/services' },
    { name: 'Booking', href: '/booking' },
    { name: 'About', href: '/about' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#333333]' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#C9A84C] rounded-none flex items-center justify-center transform transition-transform group-hover:rotate-12">
            <span className="text-[#0A0A0A] font-bold text-xl font-display">A</span>
          </div>
          <span className="text-white font-display text-2xl font-bold tracking-wider">
            Arabia<span className="text-[#C9A84C]">Cab</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href as any}
                className="text-sm font-medium text-gray-300 hover:text-[#C9A84C] transition-colors uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-[#333333] pl-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{locale === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <a 
              href="https://wa.me/966XXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className={buttonVariants({ className: "bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-none shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all" })}
            >
              <FaWhatsapp className="mr-2 h-4 w-4" />
              {t('whatsappUs')}
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-[#333333]"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-[#C9A84C] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-[#333333] my-2" />
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-gray-300 py-2"
              >
                <Globe className="w-5 h-5" />
                <span>{locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}</span>
              </button>
              <a 
                href="https://wa.me/966XXXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer"
                className={buttonVariants({ className: "bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-none w-full justify-center mt-2" })}
              >
                <FaWhatsapp className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
