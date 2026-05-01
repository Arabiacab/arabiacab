'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight, ArrowRight, Loader2 } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';


const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Cities', href: '/cities' },
  { label: 'Pricing', href: '/pricing' },
];

const FIELD = 'bg-transparent text-white text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark]';
const LABEL = { fontSize: '11px', color: 'rgba(255,255,255,0.48)', fontWeight: 500, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' as const };
const DIVIDER = { borderRight: '1px solid rgba(255,255,255,0.1)' };

export function Hero() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Row 1 — trip details
  const [pickup, setPickup]           = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate]               = useState('');
  const [time, setTime]               = useState('');

  // Row 2 — contact
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const toggleLanguage = () =>
    router.replace(pathname, { locale: locale === 'en' ? 'ar' : 'en' });

  const handleConfirm = async () => {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!phone.trim()) { setError('Please enter your WhatsApp number.'); return; }
    setError('');
    setLoading(true);

    const fullPhone = `+966${phone.replace(/^\+966/, '')}`;
    const today = new Date().toISOString().split('T')[0];

    // Save booking (fire-and-forget)
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name:    name,
        customer_phone:   fullPhone,
        customer_email:   email || undefined,
        pickup_location:  pickup  || 'TBD',
        dropoff_location: destination || 'TBD',
        pickup_date:      date   || today,
        pickup_time:      time   || '00:00',
        service_type:     'standard',
        passengers:       1,
        payment_method:   'cash',
        price_estimate:   0,
        notes:            'Booking via hero form',
      }),
    }).catch(() => {});

    // Send confirmation email (fire-and-forget)
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone: fullPhone,
        date: date || today,
        time: time || '',
        service: `${pickup || 'TBD'} → ${destination || 'TBD'}`,
      }),
    }).catch(() => {});

    // Build WhatsApp message
    const msg = [
      `🚕 *New Booking — ArabiaCab*`,
      `───────────────────`,
      `🚗 From: ${pickup  || 'TBD'}`,
      `📌 To: ${destination || 'TBD'}`,
      `📅 Date: ${date || '—'}`,
      `🕒 Time: ${time || '—'}`,
      `───────────────────`,
      `👤 Name: ${name}`,
      `📞 Phone: ${fullPhone}`,
      email ? `📧 Email: ${email}` : '',
    ].filter(Boolean).join('\n');

    setLoading(false);
    window.open(`https://wa.me/966503667424?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* ── Fixed "Book a Ride" button ── */}
      <Link
        href="/booking"
        className="fixed z-[1002] flex items-center gap-2 font-bold text-[#0A0A0A] transition-all duration-200 hover:scale-[1.02]"
        style={{
          top: '16px', right: '16px',
          background: '#CCFF00',
          borderRadius: '16px',
          padding: '14px 28px',
          fontSize: '15px',
          fontWeight: 700,
          fontFamily: 'var(--font-syne), sans-serif',
          boxShadow: '0 4px 20px rgba(204,255,0,0.32)',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#B8E600'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#CCFF00'; }}
      >
        {locale === 'ar' ? 'احجز رحلة' : 'Book a Ride'}
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      {/* ── Hero Card ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: '#090909', margin: '12px 12px 0', borderRadius: '20px', minHeight: '88vh' }}
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Car — drives in from right, then floats */}
          <motion.div
            className="absolute right-0 top-0 bottom-0"
            style={{ width: '85%' }}
            initial={{ x: 160, opacity: 0, scale: 0.94 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ x: [0, -14, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            >
              <Image
                src="/cars/gmc_yukon.png" alt="" fill priority
                className="object-contain"
                style={{ objectPosition: 'center 75%', transform: 'scale(1.18)', transformOrigin: 'center bottom' }}
              />
            </motion.div>
          </motion.div>

          {/* Bottom fade for booking bar readability */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(10,10,12,0.75) 75%, rgba(10,10,12,0.97) 100%)' }} />
          {/* Subtle left fade so text stays readable over the car */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.28) 35%, transparent 60%)' }} />
        </div>

        {/* ── Header row: logo left, nav pill center ── */}
        <div className="relative z-20 flex items-center px-6 pt-5" style={{ minHeight: '60px' }}>
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#CCFF00' }}>
              <span className="text-[#0A0A0A] font-bold text-[11px]" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>AC</span>
            </div>
            <span className="text-white font-bold text-[15px] hidden sm:block" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
              Arabia<span style={{ color: '#CCFF00' }}>Cab</span>
            </span>
          </Link>

          <nav
            className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7"
            style={{ background: 'rgba(255,255,255,0.11)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '100px', padding: '9px 24px' }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href as any}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.82)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'; }}
              >
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'عربي' : 'EN'}</span>
            </button>
          </nav>
        </div>

        {/* ── Hero Content ── */}
        <div className="absolute z-10 left-10 right-6 md:right-auto" style={{ bottom: '220px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white font-bold mb-3 leading-[1.08]"
            style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(34px, 5vw, 60px)', letterSpacing: '-1.5px' }}
          >
            Exclusive Rides,<br />Premier Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }}
            style={{ color: 'rgba(255,255,255,0.68)', fontSize: '15px', lineHeight: 1.6, maxWidth: '420px', marginTop: '10px' }}
          >
            Professional city-to-city rides across Saudi Arabia.
          </motion.p>
        </div>

        {/* ── Two-Row Booking Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 z-20"
          style={{ background: 'rgba(22,22,22,0.82)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderTop: '1px solid rgba(255,255,255,0.09)', borderRadius: '0 0 20px 20px' }}
        >
          {/* Row 1 — Trip details */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0"
            style={{ padding: '16px 28px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex-1 pb-4 md:pb-3 md:pr-5" style={DIVIDER}>
              <p style={LABEL}>Pick Up</p>
              <input className={FIELD} placeholder="Pickup city or address" value={pickup} onChange={e => setPickup(e.target.value)} />
            </div>
            <div className="flex-1 pb-4 md:pb-3 md:px-5" style={DIVIDER}>
              <p style={LABEL}>Destination</p>
              <input className={FIELD} placeholder="Drop-off city or address" value={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div className="flex-1 pb-4 md:pb-3 md:px-5" style={DIVIDER}>
              <p style={LABEL}>Date</p>
              <input type="date" className={FIELD} value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="flex-1 pb-4 md:pb-3 md:pl-5">
              <p style={LABEL}>Time</p>
              <input type="time" className={FIELD} value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>

          {/* Row 2 — Contact details + submit */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0"
            style={{ padding: '0 28px 16px' }}
          >
            <div className="flex-1 pt-3 md:pr-5" style={DIVIDER}>
              <p style={LABEL}>Your Name</p>
              <input className={FIELD} placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="flex-1 pt-3 md:px-5" style={DIVIDER}>
              <p style={LABEL}>WhatsApp</p>
              <div className="flex items-center gap-1">
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 500 }}>+966</span>
                <input className={FIELD} placeholder="5X XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="flex-1 pt-3 md:px-5" style={DIVIDER}>
              <p style={LABEL}>Email (optional)</p>
              <input type="email" className={FIELD} placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="pt-3 md:pl-5 flex items-end">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex items-center gap-2 font-bold text-[#0A0A0A] rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap"
                style={{ background: '#CCFF00', padding: '12px 22px', fontSize: '14px', boxShadow: '0 4px 20px rgba(204,255,0,0.25)' }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#B8E600'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#CCFF00'; }}
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                  : 'Confirm Booking'
                }
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="px-7 pb-3 text-xs" style={{ color: '#ff6b6b' }}>{error}</p>
          )}
        </motion.div>

      </div>
    </>
  );
}
