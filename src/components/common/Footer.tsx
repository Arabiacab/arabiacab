import { Link } from '@/i18n/routing';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Cities', href: '/cities' },
    { label: 'Pricing', href: '/pricing' },
  ],
  legal: [
    { label: 'Terms & Conditions', href: '/terms-of-service' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
  cities: [
    { label: 'Riyadh', href: '/riyadh' },
    { label: 'Jeddah', href: '/jeddah' },
    { label: 'Mecca', href: '/mecca' },
    { label: 'Medina', href: '/medina' },
    { label: 'Dammam', href: '/dammam' },
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
              <div className="w-8 h-8 bg-[#CCFF00] rounded-lg flex items-center justify-center">
                <span
                  className="text-[#0A0A0A] font-bold text-xs"
                  style={{ fontFamily: 'var(--font-syne), sans-serif' }}
                >
                  AC
                </span>
              </div>
              <span
                className="text-white font-bold text-[1.05rem]"
                style={{ fontFamily: 'var(--font-syne), sans-serif' }}
              >
                Arabia<span className="text-[#CCFF00]">Cab</span>
              </span>
            </Link>
            <p className="text-[#666] text-sm leading-relaxed max-w-[280px]">
              Luxury taxi service in Saudi Arabia. Offering premium taxis with trained drivers to ensure your trip goes smoothly. Book now and enjoy a special trip.
            </p>
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
