import { BookingWidget } from '@/components/booking/BookingWidget';
import { Navbar } from '@/components/common/Navbar';
import { Link } from '@/i18n/routing';
import { 
  Check, Star, MapPin, Clock, ShieldCheck, ChevronRight, Phone,
  Plane, Route, Map, Building2, Hotel, Users, Compass, Briefcase, 
  CalendarHeart, Crown, Waves, MoonStar, Landmark, Factory, Car, 
  Tent, Camera, Building
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const iconMap: Record<string, any> = {
  '🚕': <Building2 className="w-10 h-10 text-[#C9A84C]" />,
  '✈️': <Plane className="w-10 h-10 text-[#C9A84C]" />,
  '🛣️': <Route className="w-10 h-10 text-[#C9A84C]" />,
  '🏨': <Hotel className="w-10 h-10 text-[#C9A84C]" />,
  '🏥': <Building className="w-10 h-10 text-[#C9A84C]" />,
  '🛍️': <Building2 className="w-10 h-10 text-[#C9A84C]" />,
  '💼': <Briefcase className="w-10 h-10 text-[#C9A84C]" />,
  '🎭': <CalendarHeart className="w-10 h-10 text-[#C9A84C]" />,
  '👑': <Crown className="w-10 h-10 text-[#C9A84C]" />,
  '🌊': <Waves className="w-10 h-10 text-[#C9A84C]" />,
  '🕌': <Landmark className="w-10 h-10 text-[#C9A84C]" />,
  '🕋': <Compass className="w-10 h-10 text-[#C9A84C]" />,
  '🌙': <MoonStar className="w-10 h-10 text-[#C9A84C]" />,
  '🗺️': <Map className="w-10 h-10 text-[#C9A84C]" />,
  '🛢️': <Factory className="w-10 h-10 text-[#C9A84C]" />,
  '🌉': <Car className="w-10 h-10 text-[#C9A84C]" />,
  '🏜️': <Tent className="w-10 h-10 text-[#C9A84C]" />,
  '📸': <Camera className="w-10 h-10 text-[#C9A84C]" />
};

export function CityPageTemplate({ cityData, locale }: { cityData: any; locale: string }) {
  const isAr = locale === 'ar';
  const cityName = isAr ? cityData.nameAr : cityData.nameEn;
  const h1Title = isAr ? `خدمة تاكسي في ${cityName}` : `Taxi Service in ${cityName}`;
  const subtitle = isAr
    ? `أرابيا كاب — خدمة تاكسي موثوقة في ${cityName}. احجز تاكسي في ${cityName} الآن — نقل المطار، السفر بين المدن، وجولات المدينة. متوفرة 24/7.`
    : `ArabiaCab taxi service in ${cityName} — book a cab in ${cityName} for airport transfers, intercity travel, and city rides. Available 24/7 with fixed prices.`;

  const baseServices = [
    { icon: '🚕', title: 'City Rides', desc: `Local taxi rides anywhere within ${cityName} — homes, offices, malls, hospitals, schools.` },
    { icon: '✈️', title: 'Airport Transfer', desc: `Professional pickup and drop to ${cityName} Airport. Flight tracking included, free waiting time.` },
    { icon: '🛣️', title: 'Intercity Taxi', desc: `Travel from ${cityName} to any major Saudi city — Riyadh, Jeddah, Makkah, Madinah, Dammam and more.` },
    { icon: '🏨', title: 'Hotel Transfer', desc: `Comfortable transfers between hotels, resorts, and furnished apartments across ${cityName}.` },
    { icon: '🏥', title: 'Medical Trips', desc: `Reliable transport to hospitals and clinics in ${cityName} — for patients and families.` },
    { icon: '🛍️', title: 'Shopping & Errands', desc: `Hourly taxi booking for shopping trips, errands, and appointments across ${cityName}.` }
  ];

  const allServices = [...baseServices, ...cityData.extraServices];

  // Schema Generation
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `ArabiaCab — ${cityData.nameEn} Taxi Service`,
        "description": `ArabiaCab taxi service in ${cityData.nameEn}. Book a cab in ${cityData.nameEn} — airport transfer, intercity rides, and city taxi. Reliable taxi Arabia, available 24/7.`,
        "url": `https://www.arabiacab.com/${cityData.slug}`,
        "areaServed": {
          "@type": "City",
          "name": cityData.nameEn,
          "containedInPlace": { "@type": "Country", "name": "Saudi Arabia" }
        },
        "telephone": "+966503667424",
        "email": "bookings@arabiacab.com",
        "openingHours": "Mo-Su 00:00-24:00",
        "priceRange": `SAR ${cityData.stats.price} - SAR 1100`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "200"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Taxi Service",
        "name": `ArabiaCab taxi service in ${cityData.nameEn}`,
        "description": `Book a cab in ${cityData.nameEn} with ArabiaCab. Airport transfer ${cityData.nameEn}, intercity taxi, city rides. Reliable cab Arabia.`,
        "areaServed": cityData.nameEn,
        "provider": {
          "@type": "LocalBusiness",
          "name": "ArabiaCab",
          "url": "https://www.arabiacab.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": cityData.faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.arabiacab.com" },
          { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://www.arabiacab.com/taxi-routes" },
          { "@type": "ListItem", "position": 3, "name": `ArabiaCab ${cityData.nameEn} Taxi Service`, "item": `https://www.arabiacab.com/${cityData.slug}` }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 relative bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333] overflow-hidden">
        <div className="absolute bottom-0 w-full h-48 opacity-10 bg-[url('/city-skyline-bg.svg')] bg-repeat-x bg-bottom z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Link href="/" className="hover:text-[#C9A84C]">Home</Link>
                <span>/</span>
                <span>Cities</span>
                <span>/</span>
                <span className="text-white">{cityName}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                {h1Title}
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">{subtitle}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-8 rounded-lg shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all flex items-center justify-center gap-2">
                  <FaWhatsapp className="w-5 h-5" /> Book via WhatsApp
                </button>
                <button className="bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" /> Call Now
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {['24/7 Available', 'Fixed Prices', 'Professional Drivers', 'No Hidden Charges'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#C9A84C]" /> {badge}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 3. BOOKING FORM */}
            <div className="w-full lg:w-1/2 relative z-20">
              <div className="bg-[#111111]/90 backdrop-blur-xl border border-[#333333] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden p-2 transform md:scale-95 origin-top">
                <BookingWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <div className="border-b border-[#333333] bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-center md:text-left">
            <div className="flex-1 min-w-[150px]">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Starting From</p>
              <p className="text-2xl font-bold font-numbers text-[#C9A84C]">SAR {cityData.stats.price}</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#333333]"></div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Service Hours</p>
              <p className="text-2xl font-bold text-white">24/7</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#333333]"></div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Avg Response</p>
              <p className="text-2xl font-bold text-white">{cityData.stats.response} min</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#333333]"></div>
            <div className="flex-1 min-w-[150px]">
              <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Customer Rating</p>
              <p className="text-2xl font-bold text-[#C9A84C] flex items-center justify-center md:justify-start gap-1">
                4.9 <Star className="w-5 h-5 fill-[#C9A84C]" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SERVICES IN THIS CITY */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Taxi Services in {cityName}</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, idx) => (
              <div key={idx} className="bg-[#0A0A0A] border border-[#333333] p-6 rounded-2xl hover:border-[#C9A84C] transition-colors">
                <span className="mb-6 block p-3 bg-[#111111] w-max rounded-xl border border-[#333333]">
                  {iconMap[service.icon] || <Building2 className="w-10 h-10 text-[#C9A84C]" />}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AVAILABLE CARS */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Choose Your Taxi in {cityName}</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: 'ECONOMY SEDAN', models: 'Camry / Sonata', pax: 4, bags: 2, features: 'Full AC', price: cityData.stats.price },
              { type: 'BUSINESS SUV', models: 'Yukon / Land Cruiser', pax: 6, bags: 4, features: 'Full AC | Premium', price: Math.round(Number(cityData.stats.price) * 1.5) },
              { type: 'LUXURY SEDAN', models: 'Lexus ES / E-Class', pax: 4, bags: 3, features: 'Full AC | Leather', price: Math.round(Number(cityData.stats.price) * 2.5) },
              { type: 'FAMILY VAN', models: 'Hiace / Savana', pax: 12, bags: 8, features: 'Full AC | Space', price: Math.round(Number(cityData.stats.price) * 2) }
            ].map((car, idx) => (
              <div key={idx} className="bg-[#111111] border border-[#333333] p-6 rounded-2xl flex flex-col h-full">
                <div className="w-full h-32 bg-[#1A1A1A] rounded-xl mb-4 flex items-center justify-center border border-[#333333]">
                  {/* Car placeholder */}
                  <span className="text-gray-500 text-sm">Car Image</span>
                </div>
                <h3 className="text-[#C9A84C] font-bold text-sm tracking-wider mb-1">{car.type}</h3>
                <p className="text-white font-bold mb-4">{car.models}</p>
                <div className="space-y-2 mb-6 flex-grow">
                  <p className="text-sm text-gray-400 flex items-center gap-2">👥 Up to {car.pax} passengers</p>
                  <p className="text-sm text-gray-400 flex items-center gap-2">🧳 {car.bags} large bags</p>
                  <p className="text-sm text-gray-400 flex items-center gap-2">❄️ {car.features}</p>
                </div>
                <div className="border-t border-[#333333] pt-4 mb-4">
                  <p className="text-xs text-gray-500 uppercase">Starting</p>
                  <p className="text-xl font-bold font-numbers text-white">SAR {car.price}</p>
                </div>
                <button className="w-full bg-[#1A1A1A] hover:bg-[#C9A84C] hover:text-black text-white text-sm font-bold py-3 rounded-lg transition-colors border border-[#333333] hover:border-[#C9A84C]">
                  Book This Car
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. POPULAR ROUTES */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Popular Taxi Routes from {cityName}</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityData.routes.map((route: any, idx: number) => (
              <div key={idx} className="bg-[#0A0A0A] border border-[#333333] p-5 rounded-xl flex items-center justify-between group hover:border-[#C9A84C]/50 transition-colors">
                <div>
                  <h4 className="text-white font-bold mb-1">{cityName} → {route.to}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.time}</span>
                    <span className="text-[#C9A84C] font-bold font-numbers">SAR {route.price}</span>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-[#1A1A1A] group-hover:bg-[#25D366] text-gray-400 group-hover:text-white flex items-center justify-center transition-colors">
                  <FaWhatsapp className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEIGHBORHOODS */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Areas We Cover in {cityName}</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {cityData.neighborhoods.map((area: string, idx: number) => (
              <span key={idx} className="bg-[#111111] border border-[#333333] text-gray-400 text-sm px-4 py-2 rounded-full hover:text-white hover:border-[#C9A84C] transition-colors cursor-default">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE US & 9. REVIEWS */}
      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-8">Why Book Your Taxi with Us in {cityName}</h2>
              <div className="space-y-6">
                {[
                  { title: 'Local Expert Drivers', desc: `Our drivers know every street and shortcut in ${cityName}. No wasted time.` },
                  { title: 'Fixed Prices — No Surprises', desc: 'Price quoted is price paid. No surge pricing, no hidden fees.' },
                  { title: `24/7 Available in ${cityName}`, desc: 'Book at 3am or 3pm — our taxis are always ready.' },
                  { title: 'Instant WhatsApp Confirmation', desc: 'Book in 60 seconds via WhatsApp. Get driver details instantly.' }
                ].map((perk, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{perk.title}</h4>
                      <p className="text-gray-400 text-sm">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-8">What Our Passengers Say in {cityName}</h2>
              <div className="space-y-4">
                {cityData.reviews.map((review: any, idx: number) => (
                  <div key={idx} className="bg-[#0A0A0A] border border-[#333333] p-6 rounded-2xl">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />)}
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4">"{review.text}"</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">— {review.author}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          <div className="space-y-4">
            {cityData.faqs.map((faq: any, idx: number) => (
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

    </main>
  );
}
