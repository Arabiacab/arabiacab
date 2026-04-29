import { Link } from '@/i18n/routing';
import { FaInstagram, FaTwitter, FaSnapchatGhost, FaTiktok } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-[#333333]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C9A84C] flex items-center justify-center">
                <span className="text-[#0A0A0A] font-bold text-lg font-display">A</span>
              </div>
              <span className="text-white font-display text-xl font-bold tracking-wider">
                Arabia<span className="text-[#C9A84C]">Cab</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Reliable taxi service in Saudi Arabia — Riyadh, Jeddah, Makkah, Madinah &amp; Dammam. ArabiaCab is your trusted ride in Arabia, available 24/7 with fixed prices and professional drivers.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaTwitter, FaSnapchatGhost, FaTiktok].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center text-gray-400 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold font-display text-lg mb-2">Quick Links</h4>
            {['Home', 'Fleet', 'Services', 'Booking', 'About', 'Contact'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-gray-400 hover:text-[#C9A84C] text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold font-display text-lg mb-2">Cities We Serve</h4>
            {['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Al-Ula'].map((city) => (
              <Link key={city} href={`/${city.toLowerCase()}`} className="text-gray-400 hover:text-[#C9A84C] text-sm transition-colors">
                {city}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold font-display text-lg mb-2">Contact Us</h4>
            <div className="text-gray-400 text-sm flex flex-col gap-2">
              <p>Phone: +966 5X XXX XXXX</p>
              <p>WhatsApp: +966 5X XXX XXXX</p>
              <p>Email: bookings@arabiacab.com</p>
              <p className="mt-2 text-[#C9A84C] font-bold">Licensed in Saudi Arabia 🇸🇦</p>
              <p className="text-xs text-gray-500 mt-2">
                CR Number: 1010XXXXXX <br />
                VAT Number: 3100XXXXXX00003 <br />
                <span className="text-gray-400 mt-1 block">* All prices include 15% VAT</span>
              </p>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#333333] gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 ArabiaCab. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-[#C9A84C] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
