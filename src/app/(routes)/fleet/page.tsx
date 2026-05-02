import { Navbar } from '@/components/common/Navbar';
import { FleetShowcase } from '@/components/sections/FleetShowcase';

export default async function FleetPage() {

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar />
      <div className="flex-grow pt-16 md:pt-32">
        <FleetShowcase />
      </div>
    </main>
  );
}
