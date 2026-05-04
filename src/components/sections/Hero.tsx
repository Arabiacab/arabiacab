'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';


const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Cities', href: '/cities' },
  { label: 'Pricing', href: '/pricing' },
];


export function Hero({ isMainPage = true }: { isMainPage?: boolean }) {
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
      {/* ── Hero Card ── */}
      <div
        className="relative overflow-hidden flex flex-col md:block bg-[#090909] m-0 md:m-3 rounded-none md:rounded-[20px] min-h-0 md:min-h-[calc(100vh-24px)]"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Car — drives in from right, then floats */}
          <motion.div
            className="absolute inset-0 md:left-auto md:right-0 md:top-0 md:bottom-0 w-full md:w-[85%]"
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
                className="object-contain md:object-contain object-[center_top] md:object-[center_75%] scale-[1.3] md:scale-[1.18] origin-center md:origin-[center_bottom] opacity-50 md:opacity-100 mt-20 md:mt-0"
              />
            </motion.div>
          </motion.div>

          {/* Bottom fade for booking bar readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,12,0.9)] md:from-transparent md:via-transparent md:to-[rgba(10,10,12,0.97)]" />
          {/* Subtle left fade so text stays readable over the car */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,12,0.8)] via-[rgba(10,10,12,0.4)] to-transparent md:from-[rgba(10,10,12,0.72)] md:via-[rgba(10,10,12,0.28)]" />
        </div>

        {/* ── Header row: logo left, nav pill center (Desktop only) ── */}
        <div className="relative z-20 hidden md:flex items-center px-6 pt-5" style={{ minHeight: '140px' }}>
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo.png"
              alt="ArabiaCab Logo"
              width={320}
              height={96}
              className="h-24 w-auto"
              style={{ height: 'auto' }}
              priority
            />
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
          </nav>
        </div>

        {/* ── Hero Content ── */}
        <div className="relative md:absolute z-10 px-5 md:px-0 md:left-10 md:right-auto pt-[100px] pb-10 md:pt-0 md:bottom-[220px]">
          {isMainPage ? (
            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-white font-bold mb-3 leading-[1.08]"
              style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(34px, 5vw, 60px)', letterSpacing: '-1.5px' }}
            >
              Premium Taxi Service<br />in Saudi Arabia
            </motion.h1>
          ) : (
            <motion.h2
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-white font-bold mb-3 leading-[1.08]"
              style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(34px, 5vw, 60px)', letterSpacing: '-1.5px' }}
            >
              Premium Taxi Service<br />in Saudi Arabia
            </motion.h2>
          )}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12 }}
            style={{ color: 'rgba(255,255,255,0.68)', fontSize: '15px', lineHeight: 1.6, maxWidth: '420px', marginTop: '10px' }}
          >
            Book reliable intercity taxi services, airport transfers, and premium rides across Riyadh, Jeddah, Makkah, and Madinah.
          </motion.p>
        </div>

        {/* ── Two-Row Booking Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="relative md:absolute bottom-0 left-0 right-0 z-20 bg-[rgba(15,15,15,0.95)] md:bg-[rgba(22,22,22,0.82)] backdrop-blur-[20px] md:backdrop-blur-[24px] border-t border-[rgba(255,255,255,0.1)] md:border-[rgba(255,255,255,0.09)] rounded-t-[20px] md:rounded-t-none md:rounded-b-[20px] pt-5 px-5 pb-8 md:p-0"
        >
          {/* Row 1 — Trip details */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 md:px-7 md:pt-4 border-b-0 md:border-b border-[rgba(255,255,255,0.07)]"
          >
            <div className="w-full pb-3 md:flex-1 md:pr-5 border-b md:border-b-0 border-[rgba(255,255,255,0.08)] md:border-r md:border-[rgba(255,255,255,0.1)]">
              <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">Pick Up</p>
              <input className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark] py-1 md:py-0" placeholder="Pickup city or address" value={pickup} onChange={e => setPickup(e.target.value)} />
            </div>
            <div className="w-full py-3 md:pb-3 md:pt-0 md:flex-1 md:px-5 border-b md:border-b-0 border-[rgba(255,255,255,0.08)] md:border-r md:border-[rgba(255,255,255,0.1)]">
              <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">Destination</p>
              <input className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark] py-1 md:py-0" placeholder="Drop-off city or address" value={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 md:py-0 md:flex md:flex-1 w-full border-b md:border-b-0 border-[rgba(255,255,255,0.08)]">
              <div className="w-full md:flex-1 md:px-5 md:border-r md:border-[rgba(255,255,255,0.1)] md:pb-3">
                <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">Date</p>
                <input type="date" className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark] py-1 md:py-0" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="w-full md:flex-1 md:pl-5 md:pb-3">
                <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">Time</p>
                <input type="time" className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark] py-1 md:py-0" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Row 2 — Contact details + submit */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 md:px-7 md:pb-4"
          >
            <div className="w-full py-3 md:flex-1 md:pr-5 border-b md:border-b-0 border-[rgba(255,255,255,0.08)] md:border-r md:border-[rgba(255,255,255,0.1)]">
              <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">Your Name</p>
              <input className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark] py-1 md:py-0" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="w-full py-3 md:flex-1 md:px-5 border-b md:border-b-0 border-[rgba(255,255,255,0.08)] md:border-r md:border-[rgba(255,255,255,0.1)]">
              <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">WhatsApp</p>
              <div className="flex items-center gap-1 py-1 md:py-0">
                <span className="text-white/45 text-[15px] md:text-[13px] font-medium">+966</span>
                <input className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark]" placeholder="5X XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="w-full py-3 md:flex-1 md:px-5 border-b border-[rgba(255,255,255,0.08)] md:border-b-0 md:border-r-0">
              <p className="text-[10px] md:text-[11px] text-white/40 md:text-white/48 uppercase tracking-[0.08em] md:tracking-[0.05em] font-medium mb-1">Email (optional)</p>
              <input type="email" className="bg-transparent text-white text-[15px] md:text-sm font-medium outline-none w-full placeholder:text-[#444] [color-scheme:dark] py-1 md:py-0" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="w-full pt-4 md:pt-0 md:pl-5 md:flex-shrink-0 md:w-auto flex items-center">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex items-center justify-center w-full md:w-auto gap-2 font-bold text-[#0A0A0A] rounded-[12px] md:rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap bg-[#CCFF00] p-[14px] md:px-6 md:py-[10px] text-[15px] md:text-[13px] shadow-[0_4px_20px_rgba(204,255,0,0.25)]"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                  : <span className="md:hidden">Find My Ride →</span>
                }
                {!loading && <span className="hidden md:inline">Confirm Booking</span>}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="px-0 md:px-7 pb-3 text-xs text-[#ff6b6b] mt-2 md:mt-0">{error}</p>
          )}
          {/* Urgency Trigger */}
          <div className="px-0 md:px-7 pb-4 md:pb-4 pt-4 md:pt-0 flex items-center justify-between">
            <p className="text-[11px] md:text-xs text-[#888] font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
              High demand: Quick booking in 30 seconds
            </p>
            <p className="text-xs text-[#888] font-medium hidden sm:block">
              Free cancellation up to 24h before
            </p>
          </div>
        </motion.div>

      </div>
    </>
  );
}
