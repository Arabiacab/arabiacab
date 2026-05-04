'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { DashboardStats, Booking } from '@/types';

function StatCard({ label, value, sub, color, icon }: { label: string; value: number | string; sub?: string; color?: string; icon?: string }) {
  return (
    <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-5">
      {icon && <p className="text-lg mb-1">{icon}</p>}
      <p className="text-white/50 text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color ?? 'text-white'}`}>{value}</p>
      {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-5 animate-pulse">
      <div className="h-3 bg-white/[0.06] rounded w-24 mb-3" />
      <div className="h-8 bg-white/[0.08] rounded w-16" />
    </div>
  );
}

const statusColors: Record<string, string> = {
  pending:     'bg-yellow-500/10 text-yellow-400',
  confirmed:   'bg-blue-500/10 text-blue-400',
  in_progress: 'bg-purple-500/10 text-purple-400',
  completed:   'bg-emerald-500/10 text-emerald-400',
  cancelled:   'bg-red-500/10 text-red-400',
};

const serviceLabels: Record<string, string> = { standard: 'Standard', airport: 'Airport', tour: 'Tour', rental: 'Rental' };

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
      <div className="space-y-6 max-w-7xl">
        <div className="h-8 bg-white/[0.06] rounded w-40 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}</div>
      </div>
    );
  }

  if (!stats) return <p className="text-white/50">Failed to load stats.</p>;

  const completedPct = stats.completed_count + stats.cancelled_count > 0
    ? Math.round(stats.completed_count / (stats.completed_count + stats.cancelled_count) * 100)
    : 0;

  const maxPeakCount = Math.max(...(stats.peak_hours?.map(h => h.count) ?? [1]), 1);
  const maxRevService = Math.max(...(stats.revenue_by_service?.map(s => s.revenue) ?? [1]), 1);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 text-sm mt-0.5">Operations overview</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
          Auto-refresh every 30s
        </div>
      </div>

      {/* Booking counts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today" value={stats.today_bookings} color="text-[#CCFF00]" icon="📅" />
        <StatCard label="This Week" value={stats.week_bookings} />
        <StatCard label="This Month" value={stats.month_bookings} />
        <StatCard label="Monthly Revenue" value={`SAR ${stats.month_revenue.toLocaleString()}`} sub={`Total: SAR ${stats.total_revenue.toLocaleString()}`} color="text-emerald-400" icon="💰" />
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Pending" value={stats.pending_count} color="text-yellow-400" />
        <StatCard label="Confirmed" value={stats.confirmed_count} color="text-blue-400" />
        <StatCard label="In Progress" value={stats.in_progress_count} color="text-purple-400" />
        <StatCard label="Completed" value={stats.completed_count} color="text-emerald-400" />
        <StatCard label="Cancelled" value={stats.cancelled_count} color="text-red-400" />
      </div>

      {/* Completion rate */}
      <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/50 text-sm">Completion Rate</p>
          <p className="text-white font-bold">{completedPct}%</p>
        </div>
        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
          <div className="h-full bg-[#CCFF00] rounded-full transition-all duration-700" style={{ width: `${completedPct}%` }} />
        </div>
        <p className="text-white/30 text-xs mt-2">{stats.completed_count} completed / {stats.cancelled_count} cancelled</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
            <h2 className="font-semibold text-white">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-[#CCFF00] text-sm hover:text-[#CCFF00]/80 transition-colors">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left px-6 py-3 text-white/50 font-medium">Ref</th>
                  <th className="text-left px-6 py-3 text-white/50 font-medium">Customer</th>
                  <th className="text-left px-6 py-3 text-white/50 font-medium">Route</th>
                  <th className="text-left px-6 py-3 text-white/50 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_bookings.map((b: Booking) => (
                  <tr key={b.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3 font-mono text-[#CCFF00] text-xs">{b.booking_ref}</td>
                    <td className="px-6 py-3 text-white text-sm">{b.customer_name}</td>
                    <td className="px-6 py-3 text-white/60 max-w-[160px] truncate text-xs">{b.pickup_location} → {b.dropoff_location}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${statusColors[b.booking_status] ?? 'bg-white/10 text-white/50'}`}>
                        {b.booking_status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
                {stats.recent_bookings.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-white/30">No bookings yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top routes */}
        <div className="bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.08]">
            <h2 className="font-semibold text-white">Top Routes</h2>
          </div>
          <div className="p-4 space-y-2">
            {stats.top_routes.length === 0 && <p className="text-white/30 text-sm text-center py-4">No data yet</p>}
            {stats.top_routes.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                <span className="w-6 h-6 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs truncate">{r.pickup}</p>
                  <p className="text-white/30 text-xs truncate">→ {r.dropoff}</p>
                </div>
                <span className="text-white/50 text-xs font-medium flex-shrink-0">{r.count}×</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Peak hours */}
        <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Peak Hours</h2>
          {stats.peak_hours?.length === 0 ? (
            <p className="text-white/30 text-sm">No data yet</p>
          ) : (
            <div className="flex items-end gap-1 h-24">
              {Array.from({ length: 24 }, (_, h) => {
                const found = stats.peak_hours?.find(p => p.hour === h);
                const count = found?.count ?? 0;
                const height = count > 0 ? Math.max(8, Math.round((count / maxPeakCount) * 100)) : 2;
                return (
                  <div key={h} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className="w-full rounded-sm transition-all duration-300 bg-[#CCFF00]/30 group-hover:bg-[#CCFF00]"
                      style={{ height: `${height}%` }}
                    />
                    {count > 0 && (
                      <div className="absolute bottom-full mb-1 bg-[#1A1A1A] text-[#CCFF00] text-xs px-1.5 py-0.5 rounded hidden group-hover:block whitespace-nowrap z-10">
                        {h}:00 — {count}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex justify-between mt-2 text-white/20 text-xs">
            <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>23h</span>
          </div>
        </div>

        {/* Revenue by service */}
        <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-5">
          <h2 className="font-semibold text-white mb-4">Revenue by Service</h2>
          {stats.revenue_by_service?.length === 0 ? (
            <p className="text-white/30 text-sm">No data yet</p>
          ) : (
            <div className="space-y-3">
              {stats.revenue_by_service?.sort((a, b) => b.revenue - a.revenue).map(s => (
                <div key={s.service_type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-xs capitalize">{serviceLabels[s.service_type] ?? s.service_type}</span>
                    <div className="text-right">
                      <span className="text-white text-xs font-medium">SAR {s.revenue.toLocaleString()}</span>
                      <span className="text-white/30 text-xs ml-2">{s.count} trips</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-[#CCFF00] rounded-full" style={{ width: `${Math.round((s.revenue / maxRevService) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
