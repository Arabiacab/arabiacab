import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/common/Navbar';
import { BookingWidget } from '@/components/booking/BookingWidget';
import { Check, Star, Moon, Map } from 'lucide-react';
import Head from 'next/head';

export default async function UmrahTaxiPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <span className="text-[#C9A84C] font-bold uppercase tracking-widest text-sm border border-[#C9A84C] px-3 py-1 rounded-full inline-block">Hajj & Umrah Transport</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                Umrah Taxi Service
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">
                Dedicated premium transportation for pilgrims. Travel safely and comfortably between Jeddah Airport, Makkah, and Madinah.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full text-sm font-medium text-white border border-[#333333]">
                  <Star className="w-4 h-4 text-[#C9A84C]" />
                  Experienced Drivers
                </div>
                <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-full text-sm font-medium text-white border border-[#333333]">
                  <Moon className="w-4 h-4 text-[#C9A84C]" />
                  24/7 Availability
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-12 md:mt-0 relative z-20">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Dedicated Umrah Packages</h2>
            <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#333333] hover:border-[#C9A84C] transition-colors">
              <Map className="w-10 h-10 text-[#C9A84C] mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Airport to Makkah</h3>
              <p className="text-gray-400 mb-6">Direct private transfer from Jeddah King Abdulaziz Airport to your hotel in Makkah. Driver waits at arrivals with a nameboard.</p>
              <span className="text-[#C9A84C] font-bold font-numbers text-xl">SAR 250</span>
            </div>
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#333333] hover:border-[#C9A84C] transition-colors">
              <Map className="w-10 h-10 text-[#C9A84C] mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Makkah ↔ Madinah</h3>
              <p className="text-gray-400 mb-6">Comfortable 4-hour journey between the two holy cities. Available 24/7 for your convenience.</p>
              <span className="text-[#C9A84C] font-bold font-numbers text-xl">SAR 450</span>
            </div>
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#333333] hover:border-[#C9A84C] transition-colors">
              <Map className="w-10 h-10 text-[#C9A84C] mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Full Ziyarat Tour</h3>
              <p className="text-gray-400 mb-6">Comprehensive tours covering all important historical and religious sites in both Makkah and Madinah.</p>
              <span className="text-[#C9A84C] font-bold font-numbers text-xl">From SAR 300</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
