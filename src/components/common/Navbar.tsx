'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home',    href: '/' },
  { name: 'About',   href: '/about' },
  { name: 'Services',href: '/services' },
  { name: 'Cities',  href: '/cities' },
  { name: 'Blog',    href: '/blog' },
  { name: 'Pricing', href: '/pricing' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 w-full z-[1000] transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(10,10,10,0.98)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[rgba(10,10,10,0.95)]'
      } backdrop-blur-[16px] border-b border-[rgba(255,255,255,0.06)]`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="ArabiaCab Logo"
            width={360}
            height={108}
            className="h-[20px] md:h-[26px] w-auto object-contain"
            style={{ width: 'auto' }}
            priority
          />
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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/booking"
            className="bg-[#CCFF00] hover:bg-[#B8E600] text-[#0A0A0A] rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(204,255,0,0.25)]"
          >
            Book a Ride
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center text-white"
          style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 w-[100vw] h-[100vh] bg-[#0A0A0A] z-[9999] flex flex-col p-0"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-[rgba(255,255,255,0.08)] shrink-0">
              <Link href="/" className="flex items-center shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="ArabiaCab Logo" width={360} height={108} className="h-[20px] w-auto object-contain" style={{ width: 'auto' }} />
              </Link>
              <button
                className="flex items-center justify-center text-white"
                style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col flex-1 overflow-y-auto pt-4 pb-24">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href as any}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white transition-colors border-b border-[rgba(255,255,255,0.06)] px-7 py-[18px] hover:text-[#CCFF00]"
                  style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto p-7 shrink-0 bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)] relative z-10 pb-12">
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-[#0A0A0A] text-center"
                style={{ background: '#CCFF00', borderRadius: '14px', padding: '18px', fontSize: '17px', fontWeight: 700 }}
              >
                Book a Ride
              </Link>
              <p className="text-center mt-3" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                No upfront payment · Free cancellation
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
