import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/common/Navbar';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { Check, Star, MapPin } from 'lucide-react';
import Head from 'next/head';

const ziyaratData: Record<string, any> = {
  'makkah-ziyarat': {
    title: 'Makkah Ziyarat Tour',
    price: 300,
    duration: '4-5 Hours',
    spots: ['Jabal Al-Nour (Cave of Hira)', 'Jabal Thawr', 'Arafat', 'Muzdalifah', 'Mina', 'Masjid Al-Jinn', 'Jannatul Mualla'],
    desc: 'Explore the historical and religious sites of Makkah with our guided Ziyarat taxi service.'
  },
  'madinah-ziyarat': {
    title: 'Madinah Ziyarat Tour',
    price: 250,
    duration: '3-4 Hours',
    spots: ['Masjid Quba', 'Masjid Qiblatain', 'Mount Uhud', 'Trench (Khandaq)', 'Jannatul Baqi', 'Seven Mosques'],
    desc: 'Visit the blessed historical sites of Madinah in comfort and peace.'
  }
};

export async function generateStaticParams() {
  return [{ service: 'makkah-ziyarat' }, { service: 'madinah-ziyarat' }];
}

export default async function ZiyaratPage({
  params
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  // Note: we can also handle city services here (e.g. /services/makkah-taxi) 
  // but for now, we just mock the ziyarat ones.
  const data = ziyaratData[service];
  
  if (!data) {
    // Basic fallback for city taxi pages
    if (service.endsWith('-taxi')) {
      const city = service.split('-')[0];
      const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
      return (
        <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
          <Navbar />
          <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333]">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Taxi Service in {capitalizedCity}
              </h1>
              <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full mb-6"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
                Premium chauffeur service in {capitalizedCity}. Book your ride instantly.
              </p>
              <div className="max-w-4xl mx-auto"><BookingWidget /></div>
            </div>
          </section>
        </main>
      );
    }
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-[#C9A84C] font-bold uppercase tracking-widest text-sm border border-[#C9A84C] px-3 py-1 rounded-full inline-block">Guided Tour</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                {data.title}
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">{data.desc}</p>
              
              <div className="bg-[#111111] border border-[#333333] p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-bold">{data.duration}</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#333333] pt-4">
                  <span className="text-gray-400">Starting Price</span>
                  <span className="text-[#C9A84C] font-bold font-numbers text-2xl">SAR {data.price}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-12 md:mt-0 relative z-20">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Locations Covered in This Tour</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.spots.map((spot: string, i: number) => (
              <div key={i} className="flex items-center gap-4 bg-[#111111] border border-[#333333] p-4 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <span className="text-white font-medium">{spot}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
