import { taxiRoutes } from '@/data/routes';
import { Navbar } from '@/components/common/Navbar';
import { Link } from '@/i18n/routing';
import { ArrowRight, MapPin } from 'lucide-react';

export default async function TaxiRoutesPage() {

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      
      <section className="pt-16 md:pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border-b border-[#333333]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Popular Taxi Routes in Saudi Arabia
          </h1>
          <div className="w-24 h-1 bg-[#C9A84C] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Find the fixed fares, distances, and travel times for all our major intercity and airport routes. Click on any route to book instantly.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxiRoutes.map((route) => (
              <Link 
                key={route.slug} 
                href={`/${route.slug}`}
                className="group bg-[#111111] border border-[#333333] rounded-2xl p-6 hover:border-[#C9A84C]/50 hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-[#C9A84C]" />
                  <span>{route.distance} • {route.time}</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2 flex items-center gap-2">
                  {route.from} <ArrowRight className="w-4 h-4 text-[#C9A84C]" /> {route.to}
                </h3>
                <div className="mt-auto pt-6 border-t border-[#333333] flex justify-between items-end">
                  <span className="text-sm text-gray-500">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-bold">SAR</span>
                    <span className="text-2xl font-bold font-numbers text-[#C9A84C]">{route.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
