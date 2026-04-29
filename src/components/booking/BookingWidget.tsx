'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Car, Plane, Globe, Star, ArrowRight, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function BookingWidget({ className }: { className?: string }) {
  const t = useTranslations('HomePage');
  const [tripType, setTripType] = useState('city');
  
  // Form State
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    date: '',
    passengers: '1',
    carType: 'Economy Sedan',
    airportDir: 'from',
    airport: 'King Khalid — Riyadh (RUH)',
    flightNo: '',
    fromCity: 'Riyadh',
    toCity: 'Jeddah',
    serviceType: 'Airport → Makkah Hotel',
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getEstimatedPrice = () => {
    // Simple mock logic for instant price estimate
    if (tripType === 'intercity') {
      if ((formData.fromCity === 'Riyadh' && formData.toCity === 'Jeddah') || (formData.fromCity === 'Jeddah' && formData.toCity === 'Riyadh')) return 1100;
      if ((formData.fromCity === 'Makkah' && formData.toCity === 'Madinah') || (formData.fromCity === 'Madinah' && formData.toCity === 'Makkah')) return 450;
      if ((formData.fromCity === 'Jeddah' && formData.toCity === 'Makkah') || (formData.fromCity === 'Makkah' && formData.toCity === 'Jeddah')) return 180;
      return 500;
    }
    if (tripType === 'airport') return 250;
    if (tripType === 'hajj') return 600;
    return 150;
  };

  const getServiceSummary = () => {
    if (tripType === 'city') return `${formData.pickup} → ${formData.drop}`;
    if (tripType === 'airport') return `${formData.airportDir === 'from' ? 'From' : 'To'} ${formData.airport}${formData.flightNo ? ` (Flight: ${formData.flightNo})` : ''}`;
    if (tripType === 'intercity') return `${formData.fromCity} → ${formData.toCity}`;
    if (tripType === 'hajj') return formData.serviceType;
    return '';
  };

  const sendBookingEmails = async () => {
    if (!formData.email) return;
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          serviceType: getServiceSummary(),
          passengers: formData.passengers,
          carType: formData.carType,
          tripType: tripType.toUpperCase(),
          extraDetails: formData.pickup || '',
        }),
      });
    } catch {
      // Email failure is silent — booking continues normally
    }
  };

  const generateWhatsAppMessage = () => {
    let msg = `🚕 *New Taxi Booking*\n─────────────────\n`;
    msg += `📍 Type: ${tripType.toUpperCase()}\n`;
    
    if (tripType === 'city') {
      msg += `🚗 From: ${formData.pickup}\n📌 To: ${formData.drop}\n`;
    } else if (tripType === 'airport') {
      msg += `✈️ Airport: ${formData.airportDir} ${formData.airport}\n`;
      msg += `🏢 Location: ${formData.pickup || formData.drop}\n`;
      msg += `🛬 Flight: ${formData.flightNo}\n`;
    } else if (tripType === 'intercity') {
      msg += `🚗 From City: ${formData.fromCity}\n📌 To City: ${formData.toCity}\n`;
    } else if (tripType === 'hajj') {
      msg += `🕌 Service: ${formData.serviceType}\n`;
      msg += `🏢 Details: ${formData.pickup}\n`;
    }

    msg += `📅 Date: ${formData.date}\n`;
    msg += `👥 Passengers: ${formData.passengers}\n`;
    msg += `🚙 Vehicle: ${formData.carType}\n`;
    msg += `💰 Estimated: SAR ${getEstimatedPrice()}\n─────────────────\n`;
    msg += `👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}`;

    const encoded = encodeURIComponent(msg);
    sendBookingEmails();
    window.open(`https://wa.me/966XXXXXXXXX?text=${encoded}`, '_blank');
  };

  const tabs = [
    { id: 'city', label: 'City Ride', icon: MapPin },
    { id: 'airport', label: 'Airport Transfer', icon: Plane },
    { id: 'intercity', label: 'Intercity', icon: Globe },
    { id: 'hajj', label: 'Hajj / Umrah', icon: Star }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className={`w-full max-w-5xl mx-auto px-4 md:px-6 relative z-20 ${className || ''}`}
    >
      <div className="bg-[#111111]/90 backdrop-blur-xl border border-[#333333] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden">
        
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-[#333333] bg-[#0A0A0A]/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setTripType(tab.id)}
                className={`flex-1 min-w-[140px] py-4 px-2 text-sm font-bold flex flex-col md:flex-row items-center justify-center gap-2 transition-all relative ${
                  tripType === tab.id ? 'text-[#C9A84C] bg-[#111111]' : 'text-gray-400 hover:text-white hover:bg-[#111111]/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {tripType === tab.id && (
                  <motion.div layoutId="activeWidgetTab" className="absolute top-0 left-0 right-0 h-1 bg-[#C9A84C]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Form Area */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Conditional Fields based on Trip Type */}
            <AnimatePresence mode="wait">
              {tripType === 'city' && (
                <motion.div key="city" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Pickup Location</label>
                    <input type="text" name="pickup" onChange={handleChange} placeholder="Hotel, Area, or Street" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Drop Location</label>
                    <input type="text" name="drop" onChange={handleChange} placeholder="Destination" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none transition-colors" />
                  </div>
                </motion.div>
              )}

              {tripType === 'airport' && (
                <motion.div key="airport" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Direction</label>
                    <select name="airportDir" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                      <option value="from">From Airport to City</option>
                      <option value="to">From City to Airport</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Airport</label>
                    <select name="airport" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                      <option>King Khalid — Riyadh (RUH)</option>
                      <option>King Abdulaziz — Jeddah (JED)</option>
                      <option>Prince Mohammed — Madinah (MED)</option>
                      <option>King Fahd — Dammam (DMM)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Flight Number</label>
                    <input type="text" name="flightNo" onChange={handleChange} placeholder="e.g. SV105" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none" />
                  </div>
                </motion.div>
              )}

              {tripType === 'intercity' && (
                <motion.div key="intercity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">From City</label>
                    <select name="fromCity" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                      <option>Riyadh</option><option>Jeddah</option><option>Makkah</option><option>Madinah</option><option>Dammam</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">To City</label>
                    <select name="toCity" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                      <option>Jeddah</option><option>Riyadh</option><option>Makkah</option><option>Madinah</option><option>Dammam</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {tripType === 'hajj' && (
                <motion.div key="hajj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Service Type</label>
                    <select name="serviceType" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                      <option>Airport → Makkah Hotel</option>
                      <option>Makkah ↔ Madinah Transfer</option>
                      <option>Ziyarat Tour Makkah</option>
                      <option>Ziyarat Tour Madinah</option>
                      <option>Full Hajj/Umrah Package</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Hotel / Location Details</label>
                    <input type="text" name="pickup" onChange={handleChange} placeholder="Hotel Name" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Common Fields */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Date & Time</label>
              <input type="datetime-local" name="date" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none [color-scheme:dark]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Vehicle Type</label>
              <select name="carType" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                <option>Economy Sedan (Camry)</option>
                <option>Business SUV (Yukon)</option>
                <option>Luxury Sedan (Lexus/Mercedes)</option>
                <option>VIP SUV (Escalade)</option>
                <option>Family Van (Hiace)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Passengers</label>
              <select name="passengers" onChange={handleChange} className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none appearance-none">
                <option>1 Passenger</option>
                <option>2 Passengers</option>
                <option>3-4 Passengers</option>
                <option>5-7 Passengers</option>
                <option>8+ Passengers</option>
              </select>
            </div>
            
            {/* Contact Details */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Your Name</label>
              <input type="text" name="name" onChange={handleChange} placeholder="Full Name" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Email Address</label>
              <input type="email" name="email" onChange={handleChange} placeholder="your@email.com" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-lg py-3 px-4 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider">WhatsApp Number</label>
              <div className="flex">
                <span className="bg-[#0A0A0A] border border-[#333333] border-r-0 rounded-l-lg py-3 px-4 text-gray-400 text-sm flex items-center">+966</span>
                <input type="tel" name="phone" onChange={handleChange} placeholder="5X XXX XXXX" className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-[#C9A84C] text-white text-sm rounded-r-lg py-3 px-4 outline-none" />
              </div>
            </div>

          </div>

          {/* Instant Price & CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#1A1A1A] border border-[#C9A84C]/30 p-6 rounded-xl gap-6">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm uppercase tracking-wider mb-1">Estimated Fare</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-white font-bold">SAR</span>
                <span className="text-5xl font-bold font-numbers text-[#C9A84C]">{getEstimatedPrice()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">* Final price may vary based on exact location.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button onClick={generateWhatsAppMessage} className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-8 rounded-lg shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
                <FaWhatsapp className="w-5 h-5" />
                Book via WhatsApp
              </button>
              <button className="bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
                <Phone className="w-5 h-5" />
                Call to Book
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
