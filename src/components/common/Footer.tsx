import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Cities', href: '/cities' },
    { label: 'Blog', href: '/blog' },
    { label: 'Pricing', href: '/pricing' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
  cities: [
    { label: 'Riyadh', href: '/riyadh-taxi-service' },
    { label: 'Jeddah', href: '/jeddah-taxi-service' },
    { label: 'Makkah', href: '/makkah-taxi-service' },
    { label: 'Madinah', href: '/madinah-taxi-service' },
    { label: 'Dammam', href: '/dammam-taxi-service' },
  ],
};

export function Footer() {
  return (
    <footer
      className="bg-[#0A0A0A] pt-16 pb-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand — 2 cols wide on large */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.png"
                alt="ArabiaCab Logo"
                width={320}
                height={96}
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-[#666] text-sm leading-relaxed max-w-[280px] mb-6">
              Luxury taxi service in Saudi Arabia. Offering premium taxis with trained drivers to ensure your trip goes smoothly. Book now and enjoy a special trip.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-white/80 bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span> Trusted by 500+ riders
              </span>
              <span className="flex items-center gap-1.5 text-white/80 bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></span> 24/7 Service
              </span>
            </div>
          </div>

          {/* Page Links */}
          <div>
            <h5
              className="text-white font-semibold text-sm mb-5"
              style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            >
              Pages
            </h5>
            <ul className="flex flex-col gap-3">
              {footerLinks.pages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-[#666] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h5
              className="text-white font-semibold text-sm mb-5"
              style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            >
              Legal
            </h5>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-[#666] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h5
              className="text-white font-semibold text-sm mb-5"
              style={{ fontFamily: 'var(--font-syne), sans-serif' }}
            >
              Cities
            </h5>
            <ul className="flex flex-col gap-3">
              {footerLinks.cities.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-[#666] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-[#555] text-xs">
            © 2025 ArabiaCab. All Rights Reserved. Licensed in Saudi Arabia 🇸🇦
          </p>

          <div className="flex flex-wrap items-center gap-5 text-[#555] text-xs">
            <a
              href="https://wa.me/966503667424"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-3 h-3 text-[#CCFF00]" />
              +966 503 667 424
            </a>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#CCFF00]" />
              bookings@arabiacab.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#CCFF00]" />
              Saudi Arabia
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
