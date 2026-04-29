import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/common/Navbar';
import { FleetShowcase } from '@/components/sections/FleetShowcase';

export default async function FleetPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      <div className="flex-grow pt-32">
        <FleetShowcase />
      </div>
    </main>
  );
}
