'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';

const INPUT = 'w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] focus:border-[#CCFF00] text-white text-sm rounded-xl py-3 px-4 outline-none transition-colors placeholder:text-[#444] [color-scheme:dark]';
const SELECT = 'w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] focus:border-[#CCFF00] text-white text-sm rounded-xl py-3 px-4 outline-none appearance-none transition-colors';
const LABEL = 'text-xs text-[#666] uppercase tracking-wider font-medium';

const CAR_PRICES: Record<string, number> = {
  'Economy Sedan (Camry)':       45,
  'Business SUV (Yukon)':        85,
  'Luxury Sedan (Lexus/Mercedes)': 120,
  'VIP SUV (Escalade)':          200,
  'Family Van (Hiace)':          150,
};

export function BookingWidget({ className }: { className?: string }) {
  const [tripType, setTripType] = useState<'city' | 'intercity'>('city');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [booked, setBooked]     = useState(false);
  const [waMsg, setWaMsg]       = useState('');

  const [form, setForm] = useState({
    pickup:    '',
    drop:      '',
    fromCity:  'Riyadh',
    toCity:    'Jeddah',
    date:      '',
    carType:   'Economy Sedan (Camry)',
    passengers: '1 Passenger',
    name:      '',
    phone:     '',
    email:     '',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  // Pre-fill from AvailableRoutes
  useEffect(() => {
    const handler = (e: CustomEvent<{ type: 'intercity'; from: string; to: string }>) => {
      setTripType(e.detail.type);
      setForm(prev => ({ ...prev, fromCity: e.detail.from, toCity: e.detail.to }));
    };
    window.addEventListener('arabiacab:selectRoute', handler as EventListener);
    return () => window.removeEventListener('arabiacab:selectRoute', handler as EventListener);
  }, []);

  // Pre-fill car type from FleetShowcase
  useEffect(() => {
    const handler = (e: CustomEvent<{ widgetOption: string; price: number }>) => {
      setForm(prev => ({ ...prev, carType: e.detail.widgetOption }));
    };
    window.addEventListener('arabiacab:selectCar', handler as EventListener);
    return () => window.removeEventListener('arabiacab:selectCar', handler as EventListener);
  }, []);

  const getEstimatedPrice = () => {
    if (tripType === 'intercity') {
      const pair = [form.fromCity, form.toCity].sort().join('-');
      const routePrices: Record<string, number> = {
        'Jeddah-Riyadh':  1100,
        'Makkah-Riyadh':  1100,
        'Madinah-Riyadh': 1100,
        'Jeddah-Makkah':   180,
        'Jeddah-Madinah':  450,
        'Madinah-Makkah':  450,
        'Dammam-Riyadh':   500,
        'Abha-Riyadh':    1200,
        'Dammam-Khobar':   100,
        'Jeddah-Taif':     200,
        'Riyadh-Tabuk':   1400,
        'Qassim-Riyadh':   350,
        'Abha-Jeddah':     900,
        'Makkah-Taif':     120,
      };
      return routePrices[pair] ?? 250;
    }
    return CAR_PRICES[form.carType] ?? 45;
  };

  const getServiceSummary = () =>
    tripType === 'city'
      ? `${form.pickup || 'TBD'} → ${form.drop || 'TBD'}`
      : `${form.fromCity} → ${form.toCity}`;

  const handleConfirm = async () => {
    if (!form.name.trim()) { setError('Please enter your name.'); return; }
    if (!form.phone.trim()) { setError('Please enter your WhatsApp number.'); return; }
    setError('');
    setLoading(true);

    const fullPhone = `+966${form.phone.replace(/^\+966/, '')}`;
    const today = new Date().toISOString().split('T')[0];
    const [pickup_date, pickup_time] = form.date
      ? [form.date.split('T')[0], form.date.split('T')[1]?.slice(0, 5) ?? '00:00']
      : [today, '00:00'];

    const [pickup_location, dropoff_location] =
      tripType === 'city'
        ? [form.pickup || 'TBD', form.drop || 'TBD']
        : [form.fromCity, form.toCity];

    // Save to admin panel
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name:    form.name,
        customer_phone:   fullPhone,
        customer_email:   form.email || undefined,
        pickup_location,
        dropoff_location,
        pickup_date,
        pickup_time,
        service_type:     'standard',
        passengers:       parseInt(form.passengers) || 1,
        payment_method:   'cash',
        price_estimate:   getEstimatedPrice(),
        notes:            `Vehicle: ${form.carType}`,
      }),
    }).catch(() => {});

    // Send confirmation emails
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name, email: form.email, phone: fullPhone,
        date: pickup_date, time: pickup_time,
        service: getServiceSummary(),
        vehicle: form.carType,
      }),
    }).catch(() => {});

    // Build WhatsApp message (stored, not auto-opened)
    const lines = [
      `🚕 *New Booking — ArabiaCab*`,
      `───────────────────`,
      tripType === 'city'
        ? `📍 Service: City Ride\n🚗 From: ${form.pickup || 'TBD'}\n📌 To: ${form.drop || 'TBD'}`
        : `📍 Service: Intercity Transfer\n🚗 From: ${form.fromCity}\n📌 To: ${form.toCity}`,
      `📅 Date/Time: ${form.date || '—'}`,
      `🚙 Vehicle: ${form.carType}`,
      `👥 Passengers: ${form.passengers}`,
      `💰 Estimated: SAR ${getEstimatedPrice()}`,
      `───────────────────`,
      `👤 Name: ${form.name}`,
      `📞 Phone: ${fullPhone}`,
      form.email ? `📧 Email: ${form.email}` : '',
    ].filter(Boolean).join('\n');

    setWaMsg(`https://wa.me/966503667424?text=${encodeURIComponent(lines)}`);
    setLoading(false);
    setBooked(true);
  };

  const tabs = [
    { id: 'city' as const,      label: 'City Ride',          icon: MapPin },
    { id: 'intercity' as const, label: 'Intercity Transfer', icon: Globe  },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`w-full max-w-5xl mx-auto px-4 md:px-6 ${className ?? ''}`}
    >
      <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(10,10,10,0.6)' }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTripType(id)}
              className="flex-1 py-4 px-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all relative"
              style={{ color: tripType === id ? '#CCFF00' : '#666', background: tripType === id ? 'rgba(204,255,0,0.05)' : 'transparent' }}
            >
              <Icon className="w-4 h-4" />
              {label}
              {tripType === id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: '#CCFF00' }} />
              )}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">

          {/* Trip-specific fields */}
          <AnimatePresence mode="wait">
            {tripType === 'city' && (
              <motion.div key="city" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5"
              >
                <div className="flex flex-col gap-2">
                  <label className={LABEL}>Pickup Location</label>
                  <input className={INPUT} placeholder="Hotel, street, or area" value={form.pickup} onChange={set('pickup')} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={LABEL}>Drop Location</label>
                  <input className={INPUT} placeholder="Destination" value={form.drop} onChange={set('drop')} />
                </div>
              </motion.div>
            )}
            {tripType === 'intercity' && (
              <motion.div key="intercity" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5"
              >
                <div className="flex flex-col gap-2">
                  <label className={LABEL}>From City</label>
                  <select className={SELECT} value={form.fromCity} onChange={set('fromCity')}>
                    {['Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 'Abha'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={LABEL}>To City</label>
                  <select className={SELECT} value={form.toCity} onChange={set('toCity')}>
                    {['Jeddah', 'Riyadh', 'Makkah', 'Madinah', 'Dammam', 'Abha'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Common fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <div className="flex flex-col gap-2">
              <label className={LABEL}>Date & Time</label>
              <input type="datetime-local" className={INPUT} value={form.date} onChange={set('date')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={LABEL}>Vehicle Type</label>
              <select className={SELECT} value={form.carType} onChange={set('carType')}>
                <option>Economy Sedan (Camry)</option>
                <option>Business SUV (Yukon)</option>
                <option>Luxury Sedan (Lexus/Mercedes)</option>
                <option>VIP SUV (Escalade)</option>
                <option>Family Van (Hiace)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className={LABEL}>Passengers</label>
              <select className={SELECT} value={form.passengers} onChange={set('passengers')}>
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3-4 Passengers</option>
                <option>5-7 Passengers</option>
                <option>8+ Passengers</option>
              </select>
            </div>
          </div>

          {/* Contact details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label className={LABEL}>Your Name</label>
              <input className={INPUT} placeholder="Full name" value={form.name} onChange={set('name')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={LABEL}>WhatsApp Number</label>
              <div className="flex">
                <span className="flex items-center px-4 text-sm font-medium rounded-l-xl" style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', color: '#888' }}>+966</span>
                <input type="tel" className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] focus:border-[#CCFF00] text-white text-sm rounded-r-xl py-3 px-4 outline-none transition-colors placeholder:text-[#444]"
                  placeholder="5X XXX XXXX" value={form.phone} onChange={set('phone')} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className={LABEL}>Email (optional)</label>
              <input type="email" className={INPUT} placeholder="you@email.com" value={form.email} onChange={set('email')} />
            </div>
          </div>

          {/* Price + Submit / Success */}
          <AnimatePresence mode="wait">
            {booked ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl p-6 text-center"
                style={{ background: '#0d1a00', border: '1px solid rgba(204,255,0,0.3)' }}
              >
                <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: '#CCFF00' }} />
                <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                  Booking Confirmed!
                </p>
                <p className="text-[#888] text-sm mb-5">
                  Your booking has been saved. Open WhatsApp to connect with our operator.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={waMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-bold rounded-xl px-6 py-3 transition-all hover:scale-[1.02]"
                    style={{ background: '#25D366', color: '#fff', fontSize: '15px', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Open WhatsApp
                  </a>
                  <button
                    onClick={() => { setBooked(false); setWaMsg(''); }}
                    className="text-sm font-medium transition-colors"
                    style={{ color: '#555' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#555'; }}
                  >
                    Book Another Ride
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row items-center gap-5 rounded-xl p-5"
                style={{ background: '#1A1A1A', border: '1px solid rgba(204,255,0,0.15)' }}
              >
                <div className="flex flex-col">
                  <span className="text-[#666] text-xs uppercase tracking-wider mb-1">Estimated Fare</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-lg font-bold">SAR</span>
                    <span className="text-[#CCFF00] font-bold" style={{ fontSize: '42px', fontFamily: 'var(--font-bebas-neue), sans-serif', lineHeight: 1 }}>{getEstimatedPrice()}</span>
                  </div>
                  <p className="text-[#444] text-xs mt-1">* Final price confirmed by driver</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:ml-auto items-center">
                  {error && <p className="text-xs" style={{ color: '#ff6b6b' }}>{error}</p>}
                  {/* Direct WhatsApp chat button */}
                  <a
                    href="https://wa.me/966503667424"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold rounded-xl px-4 py-3 transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', fontSize: '13px', whiteSpace: 'nowrap' }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
                    style={{ background: '#CCFF00', color: '#0A0A0A', padding: '14px 28px', fontSize: '15px', boxShadow: '0 4px 20px rgba(204,255,0,0.25)', whiteSpace: 'nowrap' }}
                    onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#B8E600'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#CCFF00'; }}
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Confirm Booking'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
