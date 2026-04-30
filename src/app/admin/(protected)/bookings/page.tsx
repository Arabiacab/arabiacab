'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Booking, BookingStatus } from '@/types';
import { useToast } from '@/components/admin/Toast';

const statusColors: Record<BookingStatus, string> = {
  pending:     'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled:   'bg-red-500/10 text-red-400 border-red-500/20',
};

const ALL_STATUSES: BookingStatus[] = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];

export default function BookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    const res = await fetch(`/api/bookings?${params}`);
    const d = await res.json();
    if (d.success) setBookings(d.data);
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function updateStatus(id: string, status: BookingStatus, reason?: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reason }),
      });
      const d = await res.json();
      if (d.success) {
        toast(`Booking status updated to ${status.replace('_', ' ')}`);
        fetchBookings();
        setSelected(null);
        setShowCancelModal(false);
        setCancelReason('');
      } else {
        toast(d.error ?? 'Update failed', 'error');
      }
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = bookings.filter(b => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.booking_ref.toLowerCase().includes(q) ||
      b.customer_name.toLowerCase().includes(q) ||
      b.customer_phone.includes(q) ||
      b.pickup_location.toLowerCase().includes(q) ||
      b.dropoff_location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-gray-400 text-sm mt-0.5">{filtered.length} total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search by ref, name, phone, route…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-4 py-3 text-gray-400 font-medium whitespace-nowrap">Ref</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Route</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium whitespace-nowrap">Date</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-amber-400 text-xs whitespace-nowrap">{b.booking_ref}</td>
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{b.customer_name}</p>
                      <p className="text-gray-500 text-xs">{b.customer_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300 max-w-[200px]">
                      <p className="truncate">{b.pickup_location}</p>
                      <p className="truncate text-gray-500 text-xs">→ {b.dropoff_location}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300 whitespace-nowrap text-xs">
                      {b.pickup_date}<br/><span className="text-gray-500">{b.pickup_time}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded border text-xs font-medium capitalize ${statusColors[b.booking_status]}`}>
                        {b.booking_status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(b)}
                          className="text-xs text-gray-400 hover:text-white underline transition-colors"
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No bookings found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking detail + status modal */}
      {selected && !showCancelModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div>
                <h3 className="font-semibold text-white">Booking #{selected.booking_ref}</h3>
                <p className="text-xs text-gray-400 mt-0.5 capitalize">{selected.booking_status.replace('_', ' ')}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">✕</button>
            </div>
            <div className="px-6 py-4 space-y-3 text-sm">
              <Row label="Customer" value={`${selected.customer_name} · ${selected.customer_phone}`} />
              <Row label="Email" value={selected.customer_email ?? '—'} />
              <Row label="Pickup" value={selected.pickup_location} />
              <Row label="Dropoff" value={selected.dropoff_location} />
              <Row label="Date / Time" value={`${selected.pickup_date} at ${selected.pickup_time}`} />
              <Row label="Service" value={selected.service_type} />
              <Row label="Passengers" value={String(selected.passengers)} />
              <Row label="Payment" value={`${selected.payment_method} · ${selected.payment_status}`} />
              {selected.notes && <Row label="Notes" value={selected.notes} />}
              {selected.price_estimate != null && <Row label="Est. Price" value={`SAR ${selected.price_estimate}`} />}
            </div>
            <div className="px-6 py-4 border-t border-gray-800">
              <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_STATUSES.filter(s => s !== selected.booking_status).map(s => (
                  <button
                    key={s}
                    disabled={updatingId === selected.id}
                    onClick={() => {
                      if (s === 'cancelled') {
                        setShowCancelModal(true);
                      } else {
                        updateStatus(selected.id, s);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors capitalize disabled:opacity-50 ${statusColors[s]}`}
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel reason modal */}
      {showCancelModal && selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 className="font-semibold text-white">Cancel Booking #{selected.booking_ref}</h3>
            </div>
            <div className="px-6 py-4">
              <label className="block text-sm text-gray-300 mb-2">Cancellation reason (optional)</label>
              <textarea
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Reason for cancellation…"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>
            <div className="px-6 py-4 flex gap-3">
              <button
                onClick={() => { setShowCancelModal(false); setCancelReason(''); }}
                className="flex-1 px-4 py-2 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                disabled={updatingId === selected.id}
                onClick={() => updateStatus(selected.id, 'cancelled', cancelReason || undefined)}
                className="flex-1 px-4 py-2 rounded-lg text-sm bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-gray-500 w-24 flex-shrink-0">{label}</span>
      <span className="text-gray-200 flex-1">{value}</span>
    </div>
  );
}
