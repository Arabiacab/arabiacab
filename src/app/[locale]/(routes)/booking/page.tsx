import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/common/Navbar';
import { BookingFlow } from '@/components/booking/BookingFlow';

export const metadata: Metadata = {
  title: 'ArabiaCab | Book a Taxi in Saudi Arabia — Cab Booking Online',
  description: 'Book a cab in Saudi Arabia with ArabiaCab. Taxi service Saudi Arabia — cab booking Riyadh, airport taxi Jeddah, Makkah to Madinah cab. Get a quote instantly via WhatsApp.',
  alternates: {
    canonical: 'https://www.arabiacab.com/booking'
  }
};

export default async function BookingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      <div className="flex-grow pt-32 px-4 md:px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Book a Cab in Saudi Arabia</h1>
          <p className="text-gray-400">ArabiaCab — reliable taxi service Saudi Arabia. Complete your booking in a few simple steps.</p>
        </div>
        <BookingFlow />
      </div>
    </main>
  );
}
