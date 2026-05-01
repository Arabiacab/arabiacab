'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Car, Users, CreditCard, ChevronRight, ChevronLeft, Globe, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';

// ── Real intercity prices (sourced from saudiataxiservice.com + market rates)
// Key = sorted city pair, value = Toyota Camry (Standard) base fare in SAR
const ROUTE_BASE_PRICES: Record<string, number> = {
  'Jeddah-Riyadh':   1100,
  'Makkah-Riyadh':   1100,
  'Madinah-Riyadh':  1100,
  'Jeddah-Makkah':    180,
  'Jeddah-Madinah':   450,
  'Madinah-Makkah':   450,
  'Dammam-Riyadh':    500,
  'Abha-Riyadh':     1200,
  'Dammam-Khobar':    100,
  'Jeddah-Taif':      200,
  'Riyadh-Tabuk':    1400,
  'Qassim-Riyadh':    350,
  'Jeddah-Khobar':   1200,
  'Abha-Jeddah':      900,
  'Khobar-Riyadh':    500,
  'Makkah-Taif':      120,
};

// Multipliers per car type relative to Standard (Camry = 1.0)
const CAR_MULTIPLIERS: Record<string, number> = {
  'Toyota Yaris':  0.80,
  'Toyota Camry':  1.00,
  'GMC Yukon':     1.90,
  'Lexus ES 350':  2.50,
  'Toyota HiAce':  1.50,
};

// Base city prices (no route selected)
const CITY_BASE_PRICES: Record<string, number> = {
  'Toyota Yaris':  30,
  'Toyota Camry':  45,
  'GMC Yukon':     85,
  'Lexus ES 350': 120,
  'Toyota HiAce': 150,
};

const CITIES = ['Riyadh','Jeddah','Makkah','Madinah','Dammam','Khobar','Abha','Taif','Tabuk','Qassim'];

const CARS = [
  { name: 'Toyota Yaris',  type: 'Economy',     accentColor: '#FF6B35' },
  { name: 'Toyota Camry',  type: 'Standard',    accentColor: '#CCFF00' },
  { name: 'GMC Yukon',     type: 'Business SUV', accentColor: '#0066FF' },
  { name: 'Lexus ES 350',  type: 'Luxury',      accentColor: '#9B59B6' },
  { name: 'Toyota HiAce',  type: 'Family Van',  accentColor: '#CCFF00' },
];

const steps = [
  { id: 1, name: 'Trip Details',   icon: MapPin },
  { id: 2, name: 'Car Selection',  icon: Car },
  { id: 3, name: 'Passenger Info', icon: Users },
  { id: 4, name: 'Confirmation',   icon: CreditCard },
  { id: 5, name: 'Success',        icon: Check },
];

const INPUT = 'w-full bg-[#1A1A1A] border border-[#2a2a2a] rounded-lg p-4 text-white focus:border-[#CCFF00] outline-none transition-colors';
const SELECT = 'w-full bg-[#1A1A1A] border border-[#2a2a2a] rounded-lg p-4 text-white focus:border-[#CCFF00] outline-none transition-colors appearance-none';

function getCarPrice(tripType: 'city' | 'intercity', from: string, to: string, carName: string): number | null {
  if (tripType === 'city') return CITY_BASE_PRICES[carName] ?? 45;
  const pair = [from, to].sort().join('-');
  const base = ROUTE_BASE_PRICES[pair];
  if (!base) return null;
  return Math.round(base * (CAR_MULTIPLIERS[carName] ?? 1));
}

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripType, setTripType] = useState<'city' | 'intercity'>('intercity');
  const [fromCity, setFromCity] = useState('Riyadh');
  const [toCity, setToCity] = useState('Jeddah');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1 Passenger');
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash'>('cash');
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [waUrl, setWaUrl]           = useState('');

  const prevStep = () => setCurrentStep(p => Math.max(p - 1, 1));

  const nextStep = async () => {
    if (currentStep !== 4) { setCurrentStep(p => Math.min(p + 1, 5)); return; }

    // Step 4 → 5: submit booking
    const ref = `AC-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);

    const fullPhone = `+966${phone.replace(/^\+966/, '')}`;
    const today = new Date().toISOString().split('T')[0];
    const [pickup_date, pickup_time] = date
      ? [date.split('T')[0], date.split('T')[1]?.slice(0, 5) ?? '00:00']
      : [today, '00:00'];

    const [pickup_location, dropoff_location] =
      tripType === 'city' ? [pickup || 'TBD', dropoff || 'TBD'] : [fromCity, toCity];

    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name:    name || 'Unknown',
        customer_phone:   fullPhone,
        customer_email:   email || undefined,
        pickup_location,
        dropoff_location,
        pickup_date,
        pickup_time,
        service_type:     'standard',
        passengers:       parseInt(passengers) || 1,
        payment_method:   selectedPayment,
        price_estimate:   selectedCarPrice ?? 0,
        notes:            `Vehicle: ${selectedCar ?? '—'} | Ref: ${ref}${notes ? ` | ${notes}` : ''}`,
      }),
    }).catch(() => {});

    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name || 'Guest', email, phone: fullPhone,
        date: pickup_date, time: pickup_time,
        service: tripType === 'city' ? `${pickup || 'TBD'} → ${dropoff || 'TBD'}` : `${fromCity} → ${toCity}`,
        vehicle: selectedCar ?? '—',
        bookingRef: ref,
      }),
    }).catch(() => {});

    const msg = [
      `🚕 *New Booking — ArabiaCab*`,
      `Ref: ${ref}`,
      `───────────────────`,
      tripType === 'city'
        ? `📍 City Ride\n🚗 From: ${pickup || 'TBD'}\n📌 To: ${dropoff || 'TBD'}`
        : `📍 Intercity Transfer\n🚗 From: ${fromCity}\n📌 To: ${toCity}`,
      `📅 Date/Time: ${date || '—'}`,
      `🚙 Vehicle: ${selectedCar ?? '—'}`,
      `👥 Passengers: ${passengers}`,
      `💰 Estimated: ${selectedCarPrice !== null ? `SAR ${selectedCarPrice}` : 'On Request'}`,
      `💳 Payment: ${selectedPayment === 'card' ? 'Card' : 'Cash'}`,
      `───────────────────`,
      `👤 Name: ${name || '—'}`,
      `📞 Phone: ${fullPhone}`,
      email ? `📧 Email: ${email}` : '',
      notes ? `📝 Notes: ${notes}` : '',
    ].filter(Boolean).join('\n');

    setWaUrl(`https://wa.me/966503667424?text=${encodeURIComponent(msg)}`);
    setCurrentStep(5);
  };

  const selectedCarPrice = selectedCar ? getCarPrice(tripType, fromCity, toCity, selectedCar) : null;
  const routeLabel = tripType === 'intercity' ? `${fromCity} → ${toCity}` : `${pickup || 'TBD'} → ${dropoff || 'TBD'}`;

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#111111] rounded-2xl border border-[#222222] shadow-2xl overflow-hidden mt-12 mb-24">

      {/* Progress Bar */}
      <div className="bg-[#0A0A0A] px-6 py-8 border-b border-[#222222]">
        <div className="relative flex justify-between items-center max-w-2xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#222222] z-0" />
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#CCFF00] z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive    = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                  isActive    ? 'bg-[#111111] border-[#CCFF00] text-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.25)]' :
                  isCompleted ? 'bg-[#CCFF00] border-[#CCFF00] text-[#0A0A0A]' :
                                'bg-[#111111] border-[#333333] text-gray-500'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider hidden md:block ${isActive ? 'text-[#CCFF00]' : isCompleted ? 'text-white' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 md:p-10 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >

            {/* ── Step 1: Trip Details ── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>Enter Trip Details</h3>

                {/* Trip Type Toggle */}
                <div className="flex gap-3">
                  {(['city', 'intercity'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTripType(type)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                      style={{
                        border: `1px solid ${tripType === type ? '#CCFF00' : 'rgba(255,255,255,0.1)'}`,
                        background: tripType === type ? 'rgba(204,255,0,0.08)' : '#1A1A1A',
                        color: tripType === type ? '#CCFF00' : '#888',
                      }}
                    >
                      {type === 'city' ? <MapPin className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                      {type === 'city' ? 'City Ride' : 'Intercity Transfer'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {tripType === 'intercity' ? (
                    <motion.div key="intercity" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">From City</label>
                        <div className="relative">
                          <select className={SELECT} value={fromCity} onChange={e => setFromCity(e.target.value)}>
                            {CITIES.map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">To City</label>
                        <div className="relative">
                          <select className={SELECT} value={toCity} onChange={e => setToCity(e.target.value)}>
                            {CITIES.filter(c => c !== fromCity).map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="city" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Pickup Location</label>
                        <input type="text" className={INPUT} placeholder="Hotel, street or area" value={pickup} onChange={e => setPickup(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">Drop-off Location</label>
                        <input type="text" className={INPUT} placeholder="Destination" value={dropoff} onChange={e => setDropoff(e.target.value)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Date & Time</label>
                    <input type="datetime-local" className={`${INPUT} [color-scheme:dark]`} value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Passengers</label>
                    <select className={SELECT} value={passengers} onChange={e => setPassengers(e.target.value)}>
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3-4 Passengers</option>
                      <option>5-7 Passengers</option>
                      <option>8+ Passengers</option>
                    </select>
                  </div>
                </div>

                {/* Route not found warning */}
                {tripType === 'intercity' && !ROUTE_BASE_PRICES[[fromCity, toCity].sort().join('-')] && (
                  <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', color: '#FF8855' }}>
                    ⚠ Pricing for this route is not listed. Our team will confirm the fare via WhatsApp after booking.
                  </div>
                )}
              </div>
            )}

            {/* ── Step 2: Car Selection ── */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>Select a Vehicle</h3>
                  {tripType === 'intercity' && (
                    <span className="text-xs text-[#888] px-3 py-1.5 rounded-full" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {fromCity} → {toCity}
                    </span>
                  )}
                </div>

                {CARS.map((car) => {
                  const isSelected = selectedCar === car.name;
                  const price = getCarPrice(tripType, fromCity, toCity, car.name);
                  return (
                    <button
                      key={car.name}
                      type="button"
                      onClick={() => setSelectedCar(car.name)}
                      className="flex flex-col md:flex-row justify-between items-center p-5 rounded-xl text-left w-full transition-all duration-200"
                      style={{
                        border: `1px solid ${isSelected ? '#CCFF00' : 'rgba(255,255,255,0.08)'}`,
                        background: isSelected ? 'rgba(204,255,0,0.05)' : '#1A1A1A',
                      }}
                    >
                      <div className="flex flex-col items-start gap-2 mb-3 md:mb-0">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${car.accentColor}22`, color: car.accentColor }}>{car.type}</span>
                        <h4 className="text-lg font-bold" style={{ fontFamily: 'var(--font-syne), sans-serif', color: isSelected ? '#CCFF00' : '#FFFFFF' }}>{car.name}</h4>
                      </div>
                      <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
                        <div className="text-right">
                          <p className="text-[#888] text-xs mb-0.5">Estimated Fare</p>
                          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-syne), sans-serif', color: isSelected ? '#CCFF00' : '#FFFFFF' }}>
                            {price !== null ? `SAR ${price}` : 'On Request'}
                          </p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200"
                          style={{ borderColor: isSelected ? '#CCFF00' : '#444' }}>
                          {isSelected && <div className="w-3 h-3 rounded-full bg-[#CCFF00]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Step 3: Passenger Info ── */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>Passenger Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input type="text" className={INPUT} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Phone Number (WhatsApp)</label>
                    <div className="flex">
                      <span className="bg-[#0A0A0A] border border-[#2a2a2a] border-r-0 rounded-l-lg px-4 flex items-center text-gray-400 text-sm">+966</span>
                      <input type="tel" className="w-full bg-[#1A1A1A] border border-[#2a2a2a] rounded-r-lg p-4 text-white focus:border-[#CCFF00] outline-none transition-colors" placeholder="5X XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email (optional)</label>
                    <input type="email" className={INPUT} placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Special Requests (optional)</label>
                    <textarea className={`${INPUT} h-28 resize-none`} placeholder="Child seat, extra luggage, specific pickup instructions..." value={notes} onChange={e => setNotes(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 4: Confirmation ── */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>Confirm & Pay</h3>
                <div className="bg-[#1A1A1A] border border-[#222222] rounded-xl p-6 space-y-4">

                  {/* Trip summary */}
                  <div className="space-y-2 pb-4 border-b border-[#222222]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Route</span>
                      <span className="text-white font-medium">{routeLabel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Vehicle</span>
                      <span className="text-white font-medium">{selectedCar ?? '—'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Date</span>
                      <span className="text-white font-medium">{date || '—'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Passengers</span>
                      <span className="text-white font-medium">{passengers}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-white">Total Amount</h4>
                    <span className="text-3xl font-bold text-[#CCFF00]" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                      {selectedCarPrice !== null ? `SAR ${selectedCarPrice}` : 'On Request'}
                    </span>
                  </div>
                  <p className="text-[#666] text-xs">* Fixed price — no surge pricing, no hidden fees</p>

                  <h5 className="font-bold text-gray-300 pt-2">Payment Method</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {([
                      { key: 'card' as const, label: 'Pay with Mada / Credit Card' },
                      { key: 'cash' as const, label: 'Pay Cash to Driver' },
                    ] as const).map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedPayment(key)}
                        className="rounded-xl p-4 text-center font-semibold text-sm transition-all duration-200"
                        style={{
                          border: `1px solid ${selectedPayment === key ? '#CCFF00' : 'rgba(255,255,255,0.08)'}`,
                          background: selectedPayment === key ? 'rgba(204,255,0,0.08)' : '#0A0A0A',
                          color: selectedPayment === key ? '#CCFF00' : '#888',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 5: Success ── */}
            {currentStep === 5 && (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 border-2 border-[#CCFF00]" style={{ background: 'rgba(204,255,0,0.1)' }}>
                  <Check className="w-12 h-12 text-[#CCFF00]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>Booking Confirmed!</h3>
                <p className="text-gray-400 mb-8 max-w-md">Your ride has been successfully booked. A confirmation has been sent to your WhatsApp.</p>
                <div className="bg-[#1A1A1A] px-8 py-4 rounded-xl border border-[#222222] mb-8">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Booking Reference</span>
                  <p className="text-2xl font-bold text-[#CCFF00] tracking-widest mt-1" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>
                    {bookingRef}
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Link href="/"
                    className="font-bold rounded-xl px-6 py-3 transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: '#CCFF00', color: '#0A0A0A', fontSize: '15px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#B8E600'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#CCFF00'; }}
                  >
                    Back to Home
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-bold rounded-xl px-6 py-3 transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: '#25D366', color: '#fff', fontSize: '15px', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-auto pt-8 border-t border-[#222222]">
            <button type="button" onClick={prevStep}
              className={`flex items-center gap-2 font-semibold text-sm transition-colors px-4 py-2 rounded-lg ${currentStep === 1 ? 'invisible' : 'text-gray-400 hover:text-white'}`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button type="button" onClick={nextStep}
              className="flex items-center gap-2 font-bold rounded-xl px-8 py-3 transition-all duration-200 hover:scale-[1.02]"
              style={{ background: '#CCFF00', color: '#0A0A0A', fontSize: '15px', boxShadow: '0 4px 20px rgba(204,255,0,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#B8E600'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#CCFF00'; }}
            >
              {currentStep === 4 ? 'Confirm Booking' : 'Continue'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
