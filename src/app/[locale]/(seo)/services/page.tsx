import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { Link } from '@/i18n/routing';
import { 
  Check, Plane, Route, Map, Building2, Hotel, Users, Clock, 
  ShieldCheck, ChevronRight, Phone, MapPin, Compass
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titleEn = "ArabiaCab | Taxi Services in Saudi Arabia — Airport, Intercity, Hajj & City Rides";
  const titleAr = "أرابيا كاب | خدمات التاكسي في المملكة العربية السعودية — مطار، بين المدن، حج وعمرة";

  const descEn = "ArabiaCab — reliable cab booking Saudi Arabia. Airport taxi Riyadh, airport transfer Jeddah, Makkah to Madinah cab, Hajj & Umrah transport. Taxi service Saudi Arabia available 24/7 with fixed prices and professional drivers.";
  const descAr = "أرابيا كاب — حجز سيارة أجرة موثوق في المملكة العربية السعودية. تاكسي المطار الرياض، نقل المطار جدة، تاكسي مكة المدينة، نقل الحج والعمرة. متاح ٢٤/٧.";

  return {
    title: locale === 'ar' ? titleAr : titleEn,
    description: locale === 'ar' ? descAr : descEn,
    keywords: [
      'taxi service saudi arabia', 'cab booking saudi arabia', 'airport taxi riyadh',
      'airport transfer jeddah', 'makkah to madinah cab', 'reliable taxi arabia', 'arabiacab services'
    ],
    alternates: {
      canonical: `https://www.arabiacab.com/${locale}/services`,
      languages: {
        'en-SA': 'https://www.arabiacab.com/en/services',
        'ar-SA': 'https://www.arabiacab.com/ar/services'
      }
    }
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';

  const services = [
    {
      icon: <Plane className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Airport Transfer',
      desc: 'Our airport taxi service covers all major Saudi airports. We track your flight in real time so your driver is always ready when you land. Free waiting time of 60 minutes included.',
      features: ['Flight tracking — driver waits for you', '60 mins free waiting time', 'Meet & greet at arrivals', 'Fixed price — no surprises'],
      bestFor: 'Travelers, business passengers, pilgrims',
      price: '80',
      link: '/services/airport-transfer'
    },
    {
      icon: <Route className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Intercity Taxi',
      desc: 'Travel comfortably between major Saudi cities with our private intercity taxi service. We cover all major routes with fixed, transparent pricing. Every ride is private and non-stop.',
      features: ['Private ride — no sharing', 'Air-conditioned vehicle', 'Fixed price confirmed before travel', 'Door-to-door service'],
      bestFor: 'Intercity travelers, business trips',
      price: '180',
      link: '/taxi-routes'
    },
    {
      icon: <Compass className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Hajj & Umrah Taxi Service',
      desc: 'Dedicated taxi services for pilgrims performing Hajj and Umrah. We cover airport arrivals at Jeddah and Madinah, hotel transfers in Makkah, and full pilgrimage support.',
      features: ['Jeddah/Madinah Airport to Hotel', 'Makkah ↔ Madinah transport', 'Daily Haram transfers', 'Group transport available'],
      bestFor: 'International pilgrims, Umrah groups, families',
      price: '250',
      link: '/umrah-taxi-service'
    },
    {
      icon: <Map className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Ziyarat Tour by Taxi',
      desc: 'Explore the holy sites of Makkah and Madinah with our dedicated Ziyarat taxi service. Choose a half-day or full-day tour — we handle everything.',
      features: ['Jabal Al-Nour, Jabal Thawr, Mina', 'Masjid Quba, Jabal Uhud, Al-Baqi', 'Knowledgeable drivers', 'Half-day or full-day options'],
      bestFor: 'Pilgrims, tourists, families',
      price: '200',
      link: '/services/ziyarat-tours'
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#C9A84C]" />,
      title: 'City Taxi Rides',
      desc: 'Need a quick taxi within Riyadh, Jeddah, Makkah, Madinah, or Dammam? Our city taxi service gets you from point A to point B safely and on time. Just WhatsApp us.',
      features: ['Home to airport', 'Hospital visits', 'Shopping mall trips', 'Office commutes'],
      bestFor: 'Residents, daily commuters, quick trips',
      price: '30',
      link: '/services/city-rides'
    },
    {
      icon: <Hotel className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Hotel Transfer Service',
      desc: 'Arriving in Saudi Arabia and need a reliable transfer? Our hotel transfer service is seamless and professional. We pick you up on time and drop you directly to your hotel entrance.',
      features: ['Airport to Hotel transfers', 'Hotel to Hotel transfers', 'Hotel to Haram (daily)', 'Help with luggage'],
      bestFor: 'Tourists, pilgrims, business travelers',
      price: '80',
      link: '/services/hotel-transfers'
    },
    {
      icon: <Users className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Group & Family Taxi',
      desc: 'Traveling with a large family or group? Our group taxi service offers spacious vans and minibuses that comfortably seat 7 to 14 passengers with full luggage.',
      features: ['Toyota Hiace Van (12 pax)', 'GMC Savana Van (12 pax)', 'Toyota Coaster (22 pax)', 'Mercedes V-Class VIP (7 pax)'],
      bestFor: 'Pilgrim groups, large families, corporate teams',
      price: '150',
      link: '/services/group-taxi'
    },
    {
      icon: <Clock className="w-8 h-8 text-[#C9A84C]" />,
      title: 'Hourly Taxi Hire',
      desc: 'Need a taxi at your disposal for a few hours? Our hourly taxi hire service gives you a dedicated driver and vehicle for as long as you need with unlimited stops.',
      features: ['Dedicated driver', 'Unlimited city stops', 'No per-kilometer charges', '2, 4, 8 hours or full day'],
      bestFor: 'Business meetings, hospital days, sightseeing',
      price: '60/hr',
      link: '/services/hourly-hire'
    }
  ];

  const faqs = [
    { q: 'What taxi services do you offer in Saudi Arabia?', a: 'We offer airport transfers, intercity taxi between all major Saudi cities, city rides within Riyadh, Jeddah, Makkah, Madinah, and Dammam, Hajj and Umrah transport, Ziyarat tours in Makkah and Madinah, hotel transfers, group taxi, and hourly taxi hire.' },
    { q: 'How do I book a taxi service?', a: 'The easiest way is via WhatsApp — simply send us your pickup location, destination, date, time, and number of passengers. You can also fill the booking form on this page or call us directly. We confirm all bookings within minutes.' },
    { q: 'Are your taxi prices fixed or metered?', a: 'All our prices are fixed and agreed before your journey starts. We do not use meters. The price we quote via WhatsApp or on the website is the final price — no extra charges.' },
    { q: 'Do you serve international tourists and pilgrims?', a: 'Yes. A large part of our passengers are international visitors — pilgrims from Pakistan, Indonesia, UK, USA, India, Malaysia, and other countries performing Hajj or Umrah, as well as tourists visiting Al-Ula and other Saudi destinations. Our drivers are experienced with international passengers.' },
    { q: 'Is your taxi service available during Hajj and Ramadan seasons?', a: 'Yes, we operate throughout the year including peak Hajj and Ramadan seasons. We strongly recommend booking in advance during these periods due to high demand.' },
    { q: 'What types of vehicles do you have?', a: 'We have Economy Sedans (Toyota Camry, Hyundai Sonata) for up to 4 passengers, Business SUVs (GMC Yukon, Toyota Land Cruiser) for up to 6 passengers, Luxury Sedans (Lexus ES, Mercedes E-Class) for up to 4 passengers, and Family Vans (Toyota Hiace, GMC Savana) for up to 12 passengers.' },
    { q: 'Do you provide return trip bookings?', a: 'Yes, you can book a one-way or return trip. For intercity routes, return bookings often get a better rate. Ask us when booking via WhatsApp.' },
    { q: 'What is the waiting time policy at airports?', a: 'For airport pickups, we offer 60 minutes of free waiting time after your flight lands. This covers immigration, baggage, and customs. After 60 minutes, a small waiting charge may apply.' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...services.map(s => ({
        "@type": "Service",
        "name": s.title,
        "description": s.desc,
        "provider": { "@type": "LocalBusiness", "name": "ArabiaCab", "url": "https://www.arabiacab.com" },
        "areaServed": "Saudi Arabia",
        "serviceType": "Taxi Service"
      })),
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.arabiacab.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.arabiacab.com/services" }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "ArabiaCab",
        "url": "https://www.arabiacab.com",
        "areaServed": {
          "@type": "Country",
          "name": "Saudi Arabia"
        },
        "serviceArea": ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Al-Ula"],
        "openingHours": "Mo-Su 00:00-24:00",
        "telephone": "+966XXXXXXXXX",
        "email": "bookings@arabiacab.com",
        "priceRange": "SAR 30 - SAR 1100",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "500"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 relative bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333]">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
              <Link href="/" className="hover:text-[#C9A84C]">Home</Link>
              <span>/</span>
              <span className="text-white">Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              {isAr ? "خدمات التاكسي في المملكة العربية السعودية" : "Taxi Services in Saudi Arabia"}
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              We provide professional taxi services across Saudi Arabia — from airport transfers and intercity rides to Hajj & Umrah transport and city tours. Available 24/7 in Riyadh, Jeddah, Makkah, Madinah, Dammam, and Al-Ula. Fixed prices, clean vehicles, experienced drivers.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-8 rounded-lg shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2">
                <FaWhatsapp className="w-5 h-5" /> Book via WhatsApp
              </button>
              <button className="bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Call Now
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {['24/7 Available', 'Fixed Prices — No Hidden Fees', 'All Saudi Cities Covered', 'Instant WhatsApp Confirmation'].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-gray-300 bg-[#1A1A1A] px-4 py-2 rounded-full border border-[#333333]">
                  <Check className="w-4 h-4 text-[#C9A84C]" /> {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Taxi Services</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From short city rides to long-distance intercity travel — we have the right taxi service for every journey across Saudi Arabia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-[#111111] border border-[#333333] hover:border-[#C9A84C]/50 rounded-2xl p-6 md:p-8 flex flex-col h-full transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">{service.desc}</p>
                
                <div className="space-y-2 mb-8">
                  <p className="text-sm text-white font-bold mb-3">What's Included:</p>
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <div className="bg-[#0A0A0A] rounded-xl p-4 mb-6 border border-[#333333]">
                    <p className="text-xs text-gray-500 uppercase mb-1">Best For</p>
                    <p className="text-sm text-gray-300 mb-3">{service.bestFor}</p>
                    <p className="text-xs text-gray-500 uppercase mb-1">Starting Price</p>
                    <p className="text-xl font-bold font-numbers text-[#C9A84C]">SAR {service.price}</p>
                  </div>
                  
                  <button className="w-full bg-[#1A1A1A] hover:bg-[#25D366] text-white font-bold py-3 rounded-lg border border-[#333333] hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                    <FaWhatsapp className="w-5 h-5" /> Book This Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 bg-[#111111] border-y border-[#333333]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">How to Book Your Taxi</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#333333] -translate-y-1/2 z-0"></div>
            
            {[
              { step: '1', title: 'Choose Your Service', desc: 'Select the taxi service you need — airport transfer, intercity ride, city ride, Hajj transport, or ziyarat tour.' },
              { step: '2', title: 'Share Your Details', desc: 'Fill the booking form or WhatsApp us directly with your pickup, destination, date, time, and number of passengers.' },
              { step: '3', title: 'Your Taxi is Confirmed', desc: 'We confirm your booking instantly via WhatsApp with driver details, vehicle info, and final price. No surprises.' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 bg-[#0A0A0A] border border-[#333333] p-8 rounded-2xl text-center shadow-xl">
                <div className="w-16 h-16 mx-auto bg-[#C9A84C] rounded-full flex items-center justify-center text-black font-display font-bold text-2xl mb-6 border-4 border-[#111111]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUICK BOOKING FORM */}
      <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Book Your Taxi Now</h2>
              <p className="text-gray-400">We respond within minutes — Available 24/7</p>
            </div>
            
            <div className="bg-[#111111]/90 backdrop-blur-xl border border-[#333333] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden p-2">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING OVERVIEW */}
      <section className="py-20 bg-[#111111] border-y border-[#333333]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Transparent Taxi Pricing</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              All prices are fixed and confirmed before your journey. No meters, no surge pricing, no hidden fees. What you see is what you pay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0A0A0A] border border-[#333333] rounded-2xl p-8">
              <h3 className="text-[#C9A84C] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Route className="w-5 h-5" /> Popular Intercity Routes
              </h3>
              <div className="space-y-4">
                {[
                  { route: 'Jeddah ↔ Makkah', price: '180' },
                  { route: 'Jeddah Airport → Makkah', price: '250' },
                  { route: 'Makkah ↔ Madinah', price: '450' },
                  { route: 'Jeddah ↔ Madinah', price: '450' },
                  { route: 'Riyadh ↔ Jeddah', price: '1,100' },
                  { route: 'Riyadh ↔ Dammam', price: '400' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-[#333333] pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-300">{item.route}</span>
                    <span className="text-white font-bold font-numbers">SAR {item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#333333] rounded-2xl p-8">
              <h3 className="text-[#C9A84C] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> City & Airport Services
              </h3>
              <div className="space-y-4">
                {[
                  { service: 'City Ride (short)', price: 'From SAR 30' },
                  { service: 'Airport Transfer Riyadh', price: 'From SAR 80' },
                  { service: 'Airport Transfer Jeddah', price: 'From SAR 100' },
                  { service: 'Hourly Hire', price: 'From SAR 60/hr' },
                  { service: 'Makkah Ziyarat Half Day', price: 'SAR 200' },
                  { service: 'Madinah Ziyarat Full Day', price: 'SAR 350' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-[#333333] pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-300">{item.service}</span>
                    <span className="text-white font-bold font-numbers">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl text-sm text-gray-400">
                <strong className="text-[#C9A84C]">Note:</strong> Prices above are for Economy Sedan. SUV and Van rates are higher. Contact us for exact quotes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Why Thousands Choose Us</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Fixed Prices Always', desc: 'The price we quote is the price you pay. No meters running, no hidden charges, no surprises at the end.' },
              { title: 'Professional Licensed Drivers', desc: 'All our drivers hold valid Saudi driving licenses and are trained in safe, professional driving. Polite and respectful.' },
              { title: 'Available 24 Hours, 7 Days', desc: 'Day or night, weekday or holiday — our taxi service never stops. Book at any hour and we will be there.' },
              { title: 'Clean & Comfortable Vehicles', desc: 'Every vehicle is cleaned before each trip and regularly serviced. Full air conditioning guaranteed on every ride.' },
              { title: 'Private Rides — No Sharing', desc: 'Your taxi is exclusively for you and your group. We do not combine passengers. Every ride is private and direct.' },
              { title: 'Instant WhatsApp Booking', desc: 'No apps, no accounts, no waiting. WhatsApp us your details and your booking is confirmed in minutes.' }
            ].map((reason, idx) => (
              <div key={idx} className="bg-[#111111] border border-[#333333] p-6 rounded-2xl flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">{reason.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CITIES WE SERVE */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Cities We Serve Across Saudi Arabia</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 'riyadh', name: 'Riyadh', subtitle: 'Capital City Taxi', icon: <Building2 className="w-5 h-5" /> },
              { id: 'jeddah', name: 'Jeddah', subtitle: 'Red Sea Gateway', icon: <Compass className="w-5 h-5" /> },
              { id: 'mecca', name: 'Makkah', subtitle: 'Holy City & Haram', icon: <MapPin className="w-5 h-5" /> },
              { id: 'medina', name: 'Madinah', subtitle: "Prophet's City Taxi", icon: <MapPin className="w-5 h-5" /> },
              { id: 'dammam', name: 'Dammam', subtitle: 'Eastern Province', icon: <Building2 className="w-5 h-5" /> },
              { id: 'al-ula', name: 'Al-Ula', subtitle: 'Heritage Tourism', icon: <Map className="w-5 h-5" /> },
              { id: 'abha', name: 'Abha', subtitle: 'Mountain City Taxi', icon: <MapPin className="w-5 h-5" /> },
              { id: 'khobar', name: 'Khobar', subtitle: 'Eastern Province', icon: <Building2 className="w-5 h-5" /> }
            ].map((city) => (
              <Link key={city.id} href={`/${city.id}`} className="bg-[#0A0A0A] border border-[#333333] p-4 rounded-xl flex items-center gap-3 hover:border-[#C9A84C] hover:bg-[#1A1A1A] transition-all group">
                <div className="text-[#C9A84C] group-hover:scale-110 transition-transform">{city.icon}</div>
                <div>
                  <div className="text-white font-bold">{city.name}</div>
                  <div className="text-xs text-gray-500">{city.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-[#111111] border border-[#333333] rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-white">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronRight className="w-5 h-5 text-[#C9A84C]" />
                  </span>
                </summary>
                <div className="text-gray-400 text-sm p-6 pt-0 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 bg-[#111111] border-t border-[#333333] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#C9A84C_0%,_transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Book Your Taxi in Saudi Arabia?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Available 24/7 — Riyadh, Jeddah, Makkah, Madinah, Dammam & more. Fixed prices. Instant confirmation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2 text-lg">
              <FaWhatsapp className="w-6 h-6" /> Book via WhatsApp — Available Now
            </button>
            <button className="bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 text-lg">
              <Phone className="w-6 h-6" /> Call Us Directly
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
