import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { taxiRoutes } from '@/data/routes';
import { citiesData } from '@/data/cities';
import { Navbar } from '@/components/common/Navbar';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { Check, MapPin, Clock, ShieldCheck, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { CityPageTemplate } from '@/components/seo/CityPageTemplate';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const routeSlugs = taxiRoutes.map((route) => route.slug);
  const citySlugs = Object.keys(citiesData);
  const allSlugs = [...routeSlugs, ...citySlugs];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  
  // Check if it's a city
  const cityInfo = (citiesData as any)[slug];
  if (cityInfo) {
    return {
      title: cityInfo.title,
      description: cityInfo.description,
      alternates: {
        canonical: `https://www.arabiacab.com/${locale}/${slug}`,
        languages: {
          'en-SA': `https://www.arabiacab.com/en/${slug}`,
          'ar-SA': `https://www.arabiacab.com/ar/${slug}`
        }
      }
    };
  }
  
  // Otherwise it's a route
  const routeData = taxiRoutes.find((r) => r.slug === slug);
  if (routeData) {
    const titleEn = `ArabiaCab | ${routeData.from} to ${routeData.to} Taxi — SAR ${routeData.price}`;
    const titleAr = `أرابيا كاب | تاكسي من ${routeData.from} إلى ${routeData.to} — ${routeData.price} ريال`;
    const descEn = `Book a cab from ${routeData.from} to ${routeData.to} with ArabiaCab. Reliable taxi service Saudi Arabia — fixed price SAR ${routeData.price}, private ride, airport transfer available. Book now on WhatsApp.`;
    return {
      title: locale === 'ar' ? titleAr : titleEn,
      description: descEn,
      alternates: {
        canonical: `https://www.arabiacab.com/${locale}/${slug}`,
        languages: {
          'en-SA': `https://www.arabiacab.com/en/${slug}`,
          'ar-SA': `https://www.arabiacab.com/ar/${slug}`
        }
      }
    };
  }

  return { title: 'ArabiaCab | Taxi Service in Saudi Arabia' };
}

export default async function RouteSEOPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const cityInfo = (citiesData as any)[slug];
  if (cityInfo) {
    return <CityPageTemplate cityData={cityInfo} locale={locale} />;
  }

  const routeData = taxiRoutes.find((r) => r.slug === slug);
  if (!routeData) {
    notFound();
  }

  const { from, to, price, distance, time } = routeData;

  // Title Logic
  const titleEn = `ArabiaCab | ${from} to ${to} Taxi — SAR ${price}`;
  const titleAr = `أرابيا كاب | تاكسي من ${from} إلى ${to} — ${price} ريال`;
  const title = locale === 'ar' ? titleAr : titleEn;

  // JSON-LD Schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "name": titleEn,
        "description": `Premium chauffeur and taxi service from ${from} to ${to}. Distance: ${distance}, Time: ${time}.`,
        "provider": {
          "@type": "LocalBusiness",
          "name": "ArabiaCab",
          "url": "https://www.arabiacab.com"
        },
        "priceRange": `SAR ${price} - SAR ${price * 3}`,
        "areaServed": [
          { "@type": "City", "name": from },
          { "@type": "City", "name": to }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much is a taxi from ${from} to ${to}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The price for a taxi from ${from} to ${to} starts at SAR ${price} for an Economy Sedan.`
            }
          },
          {
            "@type": "Question",
            "name": `How long does it take from ${from} to ${to}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The distance is approximately ${distance} and it takes around ${time} depending on traffic.`
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-[#C9A84C]">Home</Link>
                <span>/</span>
                <Link href="/taxi-routes" className="hover:text-[#C9A84C]">Routes</Link>
                <span>/</span>
                <span className="text-white">{from} to {to}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                {title}
              </h1>
              
              <div className="flex gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#C9A84C] w-5 h-5" />
                  <span>{distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-[#C9A84C] w-5 h-5" />
                  <span>{time}</span>
                </div>
              </div>

              <p className="text-gray-400 text-lg max-w-xl">
                Experience a premium, comfortable, and safe private ride from {from} to {to}. Book instantly via WhatsApp and get an immediate confirmation.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {['Free Wifi', 'Bottled Water', 'AC Controlled', 'Private Ride'].map((perk) => (
                  <div key={perk} className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full text-sm font-medium text-white border border-[#333333]">
                    <Check className="w-4 h-4 text-[#C9A84C]" />
                    {perk}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-12 md:mt-0">
              {/* Embed Booking Widget here, visually distinct */}
              <div className="relative z-20 transform md:scale-95 origin-top">
                <BookingWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table & Details */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">Vehicle Pricing & Options</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-[#333333]">
                    <thead>
                      <tr className="bg-[#111111]">
                        <th className="p-4 border border-[#333333] text-gray-400 uppercase text-sm font-bold">Vehicle Class</th>
                        <th className="p-4 border border-[#333333] text-gray-400 uppercase text-sm font-bold">Example</th>
                        <th className="p-4 border border-[#333333] text-gray-400 uppercase text-sm font-bold">Capacity</th>
                        <th className="p-4 border border-[#333333] text-[#C9A84C] uppercase text-sm font-bold">Fixed Fare</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#0A0A0A] hover:bg-[#111111] transition-colors">
                        <td className="p-4 border border-[#333333] text-white font-medium">Economy Sedan</td>
                        <td className="p-4 border border-[#333333] text-gray-400">Camry, Sonata</td>
                        <td className="p-4 border border-[#333333] text-gray-400">4 Pax, 2 Bags</td>
                        <td className="p-4 border border-[#333333] font-bold text-white font-numbers">SAR {price}</td>
                      </tr>
                      <tr className="bg-[#0A0A0A] hover:bg-[#111111] transition-colors">
                        <td className="p-4 border border-[#333333] text-white font-medium">Business SUV</td>
                        <td className="p-4 border border-[#333333] text-gray-400">Yukon, Tahoe</td>
                        <td className="p-4 border border-[#333333] text-gray-400">7 Pax, 5 Bags</td>
                        <td className="p-4 border border-[#333333] font-bold text-white font-numbers">SAR {Math.round(price * 1.5)}</td>
                      </tr>
                      <tr className="bg-[#0A0A0A] hover:bg-[#111111] transition-colors">
                        <td className="p-4 border border-[#333333] text-white font-medium">VIP Luxury</td>
                        <td className="p-4 border border-[#333333] text-gray-400">S-Class, Lexus LX</td>
                        <td className="p-4 border border-[#333333] text-gray-400">3 Pax, 3 Bags</td>
                        <td className="p-4 border border-[#333333] font-bold text-[#C9A84C] font-numbers">SAR {price * 3}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: `How much is a taxi from ${from} to ${to}?`, a: `The price starts at exactly SAR ${price} for a standard economy vehicle.` },
                    { q: `How long does the journey take?`, a: `The distance is ${distance}. Under normal traffic conditions, it takes about ${time}.` },
                    { q: `Are there any hidden fees?`, a: `No. The price quoted is the final fixed fare, including VAT and tolls.` },
                    { q: `Can I book a return trip?`, a: `Yes, you can select the round-trip option when booking via WhatsApp.` },
                  ].map((faq, i) => (
                    <div key={i} className="bg-[#111111] border border-[#333333] rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                      <p className="text-gray-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar (Map & Trust) */}
            <div className="space-y-8">
              {/* Google Map Placeholder */}
              <div className="bg-[#111111] rounded-2xl border border-[#333333] p-4 flex flex-col gap-4">
                <h3 className="font-bold text-white font-display">Route Map</h3>
                <div className="w-full aspect-square bg-[#1A1A1A] rounded-xl relative overflow-hidden flex items-center justify-center">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${encodeURIComponent(from)},Saudi+Arabia&destination=${encodeURIComponent(to)},Saudi+Arabia`}
                  ></iframe>
                  {/* Overlay for when API key is missing */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/80 flex flex-col items-center justify-center p-6 text-center border border-[#333333]">
                    <MapPin className="w-8 h-8 text-[#C9A84C] mb-2" />
                    <span className="text-white font-bold">{from} ↔ {to}</span>
                    <span className="text-gray-500 text-sm mt-1">Google Maps Route</span>
                  </div>
                </div>
              </div>

              {/* Reviews specific to route */}
              <div className="bg-[#111111] rounded-2xl border border-[#333333] p-6">
                <h3 className="font-bold text-white font-display mb-6">Recent Reviews for this Route</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="border-b border-[#333333] last:border-0 pb-6 last:pb-0">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />)}
                      </div>
                      <p className="text-sm text-gray-300 italic mb-2">"Excellent ride from {from} to {to}. Driver was punctual and the car was very comfortable."</p>
                      <span className="text-xs text-gray-500 font-bold uppercase">Verified Customer</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
