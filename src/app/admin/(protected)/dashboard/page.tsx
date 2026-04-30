'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { DashboardStats, Booking } from '@/types';

function StatCard({ label, value, sub, color }: { label: string; value: number | string; sub?: string; color?: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400',
  confirmed: 'bg-blue-500/10 text-blue-400',
  in_progress: 'bg-purple-500/10 text-purple-400',
  completed: 'bg-emerald-500/10 text-emerald-400',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(r => r.json())
      .then(d => d.success && setStats(d.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <p className="text-gray-400">Failed to load stats.</p>;
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-0.5">Overview of your operations</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Bookings" value={stats.today_bookings} color="text-amber-400" />
        <StatCard label="This Week" value={stats.week_bookings} />
        <StatCard label="This Month" value={stats.month_bookings} />
        <StatCard label="Monthly Revenue" value={`SAR ${stats.month_revenue.toLocaleString()}`} sub={`Total: SAR ${stats.total_revenue.toLocaleString()}`} color="text-emerald-400" />
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending" value={stats.pending_count} color="text-yellow-400" />
        <StatCard label="Confirmed" value={stats.confirmed_count} color="text-blue-400" />
        <StatCard label="Completed" value={stats.completed_count} color="text-emerald-400" />
        <StatCard label="Cancelled" value={stats.cancelled_count} color="text-red-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-amber-400 text-sm hover:text-amber-300 transition-colors">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Ref</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Customer</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Route</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_bookings.map((b: Booking) => (
                  <tr key={b.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-3 font-mono text-amber-400 text-xs">{b.booking_ref}</td>
                    <td className="px-6 py-3 text-white">{b.customer_name}</td>
                    <td className="px-6 py-3 text-gray-300 max-w-[180px] truncate">{b.pickup_location} → {b.dropoff_location}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[b.booking_status] ?? 'bg-gray-700 text-gray-300'}`}>
                        {b.booking_status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
                {stats.recent_bookings.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No bookings yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top routes */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Top Routes</h2>
          </div>
          <div className="p-4 space-y-2">
            {stats.top_routes.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">No data yet</p>
            )}
            {stats.top_routes.map((r: { pickup: string; dropoff: string; count: number }, i: number) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
                <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{r.pickup}</p>
                  <p className="text-gray-500 text-xs truncate">→ {r.dropoff}</p>
                </div>
                <span className="text-gray-400 text-xs font-medium">{r.count}×</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
