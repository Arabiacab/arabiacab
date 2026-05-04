'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { Booking, BookingStatus, Driver } from '@/types';
import { useToast } from '@/components/admin/Toast';

const statusColors: Record<BookingStatus, string> = {
  pending:     'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  in_progress: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled:   'bg-red-500/10 text-red-400 border-red-500/20',
};

const ALL_STATUSES: BookingStatus[] = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
const PAGE_SIZE = 25;

function isUrgent(b: Booking): boolean {
  if (b.booking_status === 'cancelled' || b.booking_status === 'completed') return false;
  const now = Date.now();
  const dt = new Date(`${b.pickup_date}T${b.pickup_time}`).getTime();
  return dt > now && dt - now < 3600000;
}

const SKELETON_WIDTHS = ['75%', '85%', '60%', '70%', '65%', '80%', '55%'];
function SkeletonRow() {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-white/[0.06] rounded animate-pulse" style={{ width: SKELETON_WIDTHS[i % SKELETON_WIDTHS.length] }} />
        </td>
      ))}
    </tr>
  );
}

export default function BookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings]             = useState<Booking[]>([]);
  const [total, setTotal]                   = useState(0);
  const [pages, setPages]                   = useState(1);
  const [page, setPage]                     = useState(1);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState('');
  const [statusFilter, setStatusFilter]     = useState('');
  const [dateFrom, setDateFrom]             = useState('');
  const [dateTo, setDateTo]                 = useState('');
  const [serviceType, setServiceType]       = useState('');
  const [paymentMethod, setPaymentMethod]   = useState('');
  const [paymentStatus, setPaymentStatus]   = useState('');
  const [priceMin, setPriceMin]             = useState('');
  const [priceMax, setPriceMax]             = useState('');
  const [showAdvanced, setShowAdvanced]     = useState(false);
  const [selected, setSelected]             = useState<Booking | null>(null);
  const [cancelReason, setCancelReason]     = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [updatingId, setUpdatingId]         = useState<string | null>(null);
  const [checkedIds, setCheckedIds]         = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction]         = useState('');
  const [bulkLoading, setBulkLoading]       = useState(false);
  const [drivers, setDrivers]               = useState<Driver[]>([]);
  const [assignDriverId, setAssignDriverId] = useState('');
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [adminNotes, setAdminNotes]         = useState('');
  const [savingNotes, setSavingNotes]       = useState(false);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advancedCount = [dateFrom, dateTo, serviceType, paymentMethod, paymentStatus, priceMin, priceMax].filter(Boolean).length;

  const fetchBookings = useCallback(async (p = page) => {
    setLoading(true);
    const params = new URLSearchParams({ paginate: 'true', page: String(p), limit: String(PAGE_SIZE) });
    if (search)        params.set('search', search);
    if (statusFilter)  params.set('status', statusFilter);
    if (dateFrom)      params.set('date_from', dateFrom);
    if (dateTo)        params.set('date_to', dateTo);
    if (serviceType)   params.set('service_type', serviceType);
    if (paymentMethod) params.set('payment_method', paymentMethod);
    if (paymentStatus) params.set('payment_status', paymentStatus);
    if (priceMin)      params.set('price_min', priceMin);
    if (priceMax)      params.set('price_max', priceMax);
    try {
      const res = await fetch(`/api/bookings?${params}`);
      const d = await res.json();
      if (d.success) { setBookings(d.data); setTotal(d.total); setPages(d.pages); }
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, dateFrom, dateTo, serviceType, paymentMethod, paymentStatus, priceMin, priceMax, page]);

  useEffect(() => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => { setPage(1); fetchBookings(1); }, 300);
    return () => { if (searchRef.current) clearTimeout(searchRef.current); };
  }, [search, statusFilter, dateFrom, dateTo, serviceType, paymentMethod, paymentStatus, priceMin, priceMax]);

  useEffect(() => { fetchBookings(page); }, [page]);

  useEffect(() => {
    fetch('/api/drivers').then(r => r.json()).then(d => d.success && setDrivers(d.data)).catch(() => {});
  }, []);

  // Auto-refresh every 30s
  useEffect(() => {
    const t = setInterval(() => fetchBookings(page), 30000);
    return () => clearInterval(t);
  }, [fetchBookings, page]);

  function clearAllFilters() {
    setSearch(''); setStatusFilter(''); setDateFrom(''); setDateTo('');
    setServiceType(''); setPaymentMethod(''); setPaymentStatus('');
    setPriceMin(''); setPriceMax(''); setPage(1);
  }

  const hasAnyFilter = Boolean(search || statusFilter || dateFrom || dateTo || serviceType || paymentMethod || paymentStatus || priceMin || priceMax);

  function toggleCheck(id: string) {
    setCheckedIds(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }

  function toggleAll() {
    setCheckedIds(prev => prev.size === bookings.length ? new Set() : new Set(bookings.map(b => b.id)));
  }

  async function runBulkAction() {
    if (!bulkAction || checkedIds.size === 0) return;
    if (bulkAction === 'assign_driver' && !assignDriverId) { setShowDriverModal(true); return; }
    setBulkLoading(true);
    try {
      const body: Record<string, unknown> = { bulk_action: bulkAction, ids: Array.from(checkedIds) };
      if (bulkAction === 'assign_driver') body.driver_id = assignDriverId;
      const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const d = await res.json();
      if (d.success) {
        toast(`${d.updated} bookings updated`);
        setCheckedIds(new Set()); setBulkAction(''); setAssignDriverId('');
        fetchBookings(page);
      } else {
        toast(d.error ?? 'Bulk action failed', 'error');
      }
    } finally {
      setBulkLoading(false);
    }
  }

  async function updateStatus(id: string, status: BookingStatus, reason?: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reason }),
      });
      const d = await res.json();
      if (d.success) {
        toast(`Status → ${status.replace('_', ' ')}`);
        fetchBookings(page); setSelected(null); setShowCancelModal(false); setCancelReason('');
      } else { toast(d.error ?? 'Update failed', 'error'); }
    } finally { setUpdatingId(null); }
  }

  async function saveAdminNotes() {
    if (!selected) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/bookings/${selected.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_notes: adminNotes }),
      });
      const d = await res.json();
      if (d.success) { toast('Notes saved'); setSelected(d.data); }
      else toast(d.error ?? 'Save failed', 'error');
    } finally { setSavingNotes(false); }
  }

  async function assignDriverToBooking(bookingId: string, driverId: string | null) {
    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driver_id: driverId }),
    });
    const d = await res.json();
    if (d.success) { toast(driverId ? 'Driver assigned' : 'Driver removed'); fetchBookings(page); setSelected(d.data); }
    else toast(d.error ?? 'Failed', 'error');
  }

  function exportCSV() {
    const params = new URLSearchParams();
    if (search)        params.set('search', search);
    if (statusFilter)  params.set('status', statusFilter);
    if (dateFrom)      params.set('date_from', dateFrom);
    if (dateTo)        params.set('date_to', dateTo);
    if (serviceType)   params.set('service_type', serviceType);
    if (paymentMethod) params.set('payment_method', paymentMethod);
    if (paymentStatus) params.set('payment_status', paymentStatus);
    window.open(`/api/bookings/export?${params}`, '_blank');
  }

  const allChecked = bookings.length > 0 && checkedIds.size === bookings.length;
  const someChecked = checkedIds.size > 0;

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Bookings</h1>
          <p className="text-white/50 text-sm mt-0.5">{total} total</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/20 hover:bg-[#CCFF00]/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Bulk action bar */}
      {someChecked && (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-xl flex-wrap">
          <span className="text-[#CCFF00] text-sm font-medium">{checkedIds.size} selected</span>
          <select
            value={bulkAction}
            onChange={e => setBulkAction(e.target.value)}
            className="bg-[#111111] border border-white/[0.08] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
          >
            <option value="">Bulk action…</option>
            <option value="confirm">Confirm all</option>
            <option value="cancel">Cancel all</option>
            <option value="assign_driver">Assign driver</option>
          </select>
          {bulkAction === 'assign_driver' && (
            <select
              value={assignDriverId}
              onChange={e => setAssignDriverId(e.target.value)}
              className="bg-[#111111] border border-white/[0.08] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
            >
              <option value="">Select driver…</option>
              {drivers.filter(d => d.is_active).map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.status})</option>
              ))}
            </select>
          )}
          <button
            onClick={runBulkAction}
            disabled={!bulkAction || bulkLoading}
            className="px-4 py-1.5 bg-[#CCFF00] text-[#0A0A0A] text-sm font-semibold rounded-lg disabled:opacity-50 hover:bg-[#CCFF00]/90 transition-colors"
          >
            {bulkLoading ? 'Processing…' : 'Apply'}
          </button>
          <button onClick={() => setCheckedIds(new Set())} className="text-white/40 hover:text-white text-sm ml-auto">Clear</button>
        </div>
      )}

      {/* Primary filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search ref, name, phone, route…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-[#111111] border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
        />
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-[#111111] border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
        <button
          onClick={() => setShowAdvanced(v => !v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors whitespace-nowrap ${showAdvanced || advancedCount > 0 ? 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00]' : 'bg-[#111111] border-white/[0.08] text-white/50 hover:text-white'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
          {advancedCount > 0 && <span className="bg-[#CCFF00] text-[#0A0A0A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{advancedCount}</span>}
        </button>
        {hasAnyFilter && (
          <button onClick={clearAllFilters} className="px-4 py-2 rounded-lg text-sm bg-[#111111] border border-white/[0.08] text-white/50 hover:text-white transition-colors whitespace-nowrap">
            Clear all
          </button>
        )}
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: 'Date from', type: 'date', value: dateFrom, set: setDateFrom },
            { label: 'Date to',   type: 'date', value: dateTo,   set: setDateTo   },
            { label: 'Price min (SAR)', type: 'number', value: priceMin, set: setPriceMin },
            { label: 'Price max (SAR)', type: 'number', value: priceMax, set: setPriceMax },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">{f.label}</label>
              <input type={f.type} value={f.value} onChange={e => { f.set(e.target.value); setPage(1); }} className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00] [color-scheme:dark]" />
            </div>
          ))}
          {[
            { label: 'Service type', value: serviceType, set: setServiceType, opts: [['', 'All services'], ['standard', 'Standard'], ['airport', 'Airport'], ['tour', 'Tour'], ['rental', 'Rental']] },
            { label: 'Payment method', value: paymentMethod, set: setPaymentMethod, opts: [['', 'All methods'], ['cash', 'Cash'], ['online', 'Online']] },
            { label: 'Payment status', value: paymentStatus, set: setPaymentStatus, opts: [['', 'All'], ['pending', 'Pending'], ['paid', 'Paid'], ['refunded', 'Refunded']] },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">{f.label}</label>
              <select value={f.value} onChange={e => { f.set(e.target.value); setPage(1); }} className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]">
                {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="px-4 py-3 w-8">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll}
                    className="rounded border-white/20 bg-[#1A1A1A] accent-[#CCFF00] cursor-pointer w-4 h-4" />
                </th>
                <th className="text-left px-4 py-3 text-white/50 font-medium whitespace-nowrap">Ref</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Customer</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Route</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium whitespace-nowrap">Date / Time</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Driver</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                : bookings.map(b => {
                    const urgent = isUrgent(b);
                    return (
                      <tr key={b.id} className={`border-b border-white/[0.04] transition-colors ${urgent ? 'bg-red-500/[0.04] hover:bg-red-500/[0.07]' : 'hover:bg-white/[0.02]'}`}>
                        <td className="px-4 py-3">
                          <input type="checkbox" checked={checkedIds.has(b.id)} onChange={() => toggleCheck(b.id)}
                            className="rounded border-white/20 bg-[#1A1A1A] accent-[#CCFF00] cursor-pointer w-4 h-4" />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {urgent && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" title="Upcoming within 1h" />}
                            <span className="font-mono text-[#CCFF00] text-xs">{b.booking_ref}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-white font-medium text-xs">{b.customer_name}</p>
                          <p className="text-white/30 text-xs">{b.customer_phone}</p>
                        </td>
                        <td className="px-4 py-3 text-white/70 max-w-[180px]">
                          <p className="truncate text-xs">{b.pickup_location}</p>
                          <p className="truncate text-white/30 text-xs">→ {b.dropoff_location}</p>
                        </td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap">
                          <span className="text-white/70">{b.pickup_date}</span>
                          <br /><span className="text-white/30">{b.pickup_time}</span>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {b.driver
                            ? <span className="text-[#CCFF00]/80">{(b.driver as Driver).name}</span>
                            : <span className="text-white/20">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          {/* Inline status dropdown */}
                          <select
                            value={b.booking_status}
                            disabled={updatingId === b.id}
                            onChange={async e => {
                              const newStatus = e.target.value as BookingStatus;
                              if (newStatus === 'cancelled') { setSelected(b); setShowCancelModal(true); return; }
                              setUpdatingId(b.id);
                              await updateStatus(b.id, newStatus);
                            }}
                            className={`text-xs px-2 py-1 rounded-lg border bg-transparent cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#CCFF00] disabled:opacity-50 ${statusColors[b.booking_status]}`}
                          >
                            {ALL_STATUSES.map(s => <option key={s} value={s} className="bg-[#111111] text-white">{s.replace('_', ' ')}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => { setSelected(b); setAdminNotes(b.admin_notes ?? ''); }} className="text-xs text-white/40 hover:text-white underline transition-colors">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
              }
              {!loading && bookings.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-white/30">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.08]">
            <p className="text-xs text-white/40">Page {page} of {pages} · {total} total</p>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 text-xs bg-[#1A1A1A] text-white/70 rounded-lg disabled:opacity-30 hover:bg-white/[0.08] transition-colors">← Prev</button>
              {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                const p = pages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= pages - 3 ? pages - 6 + i : page - 3 + i;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 text-xs rounded-lg transition-colors ${p === page ? 'bg-[#CCFF00] text-[#0A0A0A] font-bold' : 'bg-[#1A1A1A] text-white/50 hover:bg-white/[0.08]'}`}>
                    {p}
                  </button>
                );
              })}
              <button disabled={page >= pages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 text-xs bg-[#1A1A1A] text-white/70 rounded-lg disabled:opacity-30 hover:bg-white/[0.08] transition-colors">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* Booking detail modal */}
      {selected && !showCancelModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] sticky top-0 bg-[#111111] z-10">
              <div>
                <h3 className="font-semibold text-white">Booking #{selected.booking_ref}</h3>
                {isUrgent(selected) && <p className="text-xs text-red-400 mt-0.5 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Pickup within 1 hour</p>}
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors text-lg">✕</button>
            </div>

            <div className="px-6 py-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <Row label="Customer" value={`${selected.customer_name} · ${selected.customer_phone}`} />
              <Row label="Email" value={selected.customer_email ?? '—'} />
              <Row label="Pickup" value={selected.pickup_location} />
              <Row label="Dropoff" value={selected.dropoff_location} />
              <Row label="Date / Time" value={`${selected.pickup_date} at ${selected.pickup_time}`} />
              <Row label="Service" value={selected.service_type} />
              <Row label="Passengers" value={String(selected.passengers)} />
              <Row label="Payment" value={`${selected.payment_method} · ${selected.payment_status}`} />
              {selected.price_estimate != null && <Row label="Est. Price" value={`SAR ${selected.price_estimate}`} />}
              {selected.final_price != null && <Row label="Final Price" value={`SAR ${selected.final_price}`} />}
              {selected.notes && <Row label="Customer Notes" value={selected.notes} />}
            </div>

            {/* Driver assignment */}
            <div className="px-6 py-4 border-t border-white/[0.08]">
              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Assign Driver</p>
              <div className="flex gap-2">
                <select
                  defaultValue={selected.driver_id ?? ''}
                  onChange={e => assignDriverToBooking(selected.id, e.target.value || null)}
                  className="flex-1 bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
                >
                  <option value="">No driver assigned</option>
                  {drivers.filter(d => d.is_active).map(d => (
                    <option key={d.id} value={d.id}>{d.name} — {d.status} {d.vehicle_plate ? `(${d.vehicle_plate})` : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status update */}
            <div className="px-6 py-4 border-t border-white/[0.08]">
              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Update Status</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_STATUSES.filter(s => s !== selected.booking_status).map(s => (
                  <button key={s} disabled={updatingId === selected.id}
                    onClick={() => { if (s === 'cancelled') { setShowCancelModal(true); } else { updateStatus(selected.id, s); } }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors capitalize disabled:opacity-50 ${statusColors[s]}`}>
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin notes */}
            <div className="px-6 py-4 border-t border-white/[0.08]">
              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Admin Notes</p>
              <textarea
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                rows={3}
                maxLength={2000}
                placeholder="Internal notes (not visible to customer)…"
                className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] resize-none"
              />
              <div className="flex justify-end mt-2">
                <button onClick={saveAdminNotes} disabled={savingNotes}
                  className="px-4 py-1.5 bg-[#CCFF00] text-[#0A0A0A] text-xs font-semibold rounded-lg disabled:opacity-60 hover:bg-[#CCFF00]/90 transition-colors">
                  {savingNotes ? 'Saving…' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel modal */}
      {showCancelModal && selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl">
            <div className="px-6 py-4 border-b border-white/[0.08]">
              <h3 className="font-semibold text-white">Cancel #{selected.booking_ref}</h3>
            </div>
            <div className="px-6 py-4">
              <label className="block text-sm text-white/70 mb-2">Reason (optional)</label>
              <textarea value={cancelReason} onChange={e => setCancelReason(e.target.value)} rows={3} maxLength={500}
                placeholder="Reason for cancellation…"
                className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] resize-none" />
            </div>
            <div className="px-6 py-4 flex gap-3">
              <button onClick={() => { setShowCancelModal(false); setCancelReason(''); }} className="flex-1 px-4 py-2 rounded-lg text-sm bg-[#1A1A1A] text-white/70 hover:bg-white/[0.08] transition-colors">Back</button>
              <button disabled={updatingId === selected.id} onClick={() => updateStatus(selected.id, 'cancelled', cancelReason || undefined)}
                className="flex-1 px-4 py-2 rounded-lg text-sm bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50">
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
    <div className="flex gap-2 col-span-1">
      <span className="text-white/40 w-28 flex-shrink-0 text-xs pt-0.5">{label}</span>
      <span className="text-white/80 flex-1 text-xs">{value}</span>
    </div>
  );
}
