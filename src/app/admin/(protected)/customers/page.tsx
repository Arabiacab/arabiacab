'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Customer, CustomerTag, Booking } from '@/types';
import { useToast } from '@/components/admin/Toast';

const tagColors: Record<CustomerTag, string> = {
  vip:      'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/20',
  frequent: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  risky:    'bg-red-500/10 text-red-400 border-red-500/20',
  new:      'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const ALL_TAGS: CustomerTag[] = ['vip', 'frequent', 'risky', 'new'];

const SKELETON_WIDTHS = ['80%', '65%', '70%', '55%', '60%', '75%'];
function SkeletonRow() {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-5 py-3">
          <div className="h-4 bg-white/[0.06] rounded animate-pulse" style={{ width: SKELETON_WIDTHS[i % SKELETON_WIDTHS.length] }} />
        </td>
      ))}
    </tr>
  );
}

export default function CustomersPage() {
  const { toast } = useToast();
  const [customers, setCustomers]   = useState<Customer[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [profile, setProfile]       = useState<{ customer: Customer; bookings: Booking[] } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [editing, setEditing]       = useState(false);
  const [editForm, setEditForm]     = useState<Partial<Customer>>({});
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/customers');
    const d = await res.json();
    if (d.success) setCustomers(d.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  async function openProfile(c: Customer) {
    setProfileLoading(true);
    setProfile(null);
    const res = await fetch(`/api/customers/${c.id}`);
    const d = await res.json();
    if (d.success) { setProfile(d.data); setEditForm({ name: d.data.customer.name, email: d.data.customer.email, notes: d.data.customer.notes }); }
    setProfileLoading(false);
  }

  async function toggleVip(customer: Customer) {
    setTogglingId(customer.id);
    try {
      const res = await fetch(`/api/customers/${customer.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_vip: !customer.is_vip }),
      });
      const d = await res.json();
      if (d.success) {
        toast(`${customer.name} ${!customer.is_vip ? 'marked as VIP' : 'VIP removed'}`);
        setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, is_vip: !c.is_vip } : c));
        if (profile?.customer.id === customer.id) setProfile(p => p ? { ...p, customer: { ...p.customer, is_vip: !p.customer.is_vip } } : p);
      } else { toast(d.error ?? 'Update failed', 'error'); }
    } finally { setTogglingId(null); }
  }

  async function toggleTag(customer: Customer, tag: CustomerTag) {
    const current = customer.tags ?? [];
    const next = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
    const res = await fetch(`/api/customers/${customer.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: next }),
    });
    const d = await res.json();
    if (d.success) {
      setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, tags: next } : c));
      if (profile?.customer.id === customer.id) setProfile(p => p ? { ...p, customer: { ...p.customer, tags: next } } : p);
      toast('Tags updated');
    } else { toast(d.error ?? 'Update failed', 'error'); }
  }

  async function saveEdit() {
    if (!profile) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/customers/${profile.customer.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const d = await res.json();
      if (d.success) {
        toast('Customer updated');
        setProfile(p => p ? { ...p, customer: d.data } : p);
        setCustomers(prev => prev.map(c => c.id === d.data.id ? d.data : c));
        setEditing(false);
      } else { toast(d.error ?? 'Save failed', 'error'); }
    } finally { setSavingEdit(false); }
  }

  async function saveNotes() {
    if (!profile) return;
    const res = await fetch(`/api/customers/${profile.customer.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: editForm.notes }),
    });
    const d = await res.json();
    if (d.success) { toast('Notes saved'); setProfile(p => p ? { ...p, customer: d.data } : p); }
    else toast(d.error ?? 'Save failed', 'error');
  }

  const filtered = customers.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.email ?? '').toLowerCase().includes(q);
  });

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400', confirmed: 'bg-blue-500/10 text-blue-400',
    in_progress: 'bg-purple-500/10 text-purple-400', completed: 'bg-emerald-500/10 text-emerald-400',
    cancelled: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-white/50 text-sm mt-0.5">{filtered.length} registered</p>
      </div>

      <input type="search" placeholder="Search name, phone, or email…" value={search} onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md bg-[#111111] border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />

      <div className="bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden">
        {loading ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/[0.08]">
                {['Customer', 'Phone', 'Bookings', 'Spent', 'Tags', 'VIP'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-white/50 font-medium">{h}</th>
                ))}
              </tr></thead>
              <tbody>{Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}</tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left px-5 py-3 text-white/50 font-medium">Customer</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium">Phone</th>
                  <th className="text-right px-5 py-3 text-white/50 font-medium">Bookings</th>
                  <th className="text-right px-5 py-3 text-white/50 font-medium">Spent</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium">Tags</th>
                  <th className="text-left px-5 py-3 text-white/50 font-medium">VIP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-bold text-white/50 flex-shrink-0">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <button onClick={() => openProfile(c)} className="text-white font-medium hover:text-[#CCFF00] transition-colors flex items-center gap-1.5 text-sm">
                            {c.name}
                            {c.is_vip && <span className="text-[#CCFF00] text-xs">★</span>}
                          </button>
                          {c.email && <p className="text-white/30 text-xs">{c.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-white/70 font-mono text-xs">{c.phone}</td>
                    <td className="px-5 py-3 text-white/70 text-right">{c.total_bookings}</td>
                    <td className="px-5 py-3 text-emerald-400 text-right font-medium text-sm">SAR {c.total_spent.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {(c.tags ?? []).map(tag => (
                          <span key={tag} className={`text-xs px-1.5 py-0.5 rounded border capitalize ${tagColors[tag]}`}>{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => toggleVip(c)} disabled={togglingId === c.id}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${c.is_vip ? 'bg-[#CCFF00]' : 'bg-white/10'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ${c.is_vip ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-white/30">No customers found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer profile modal */}
      {(profileLoading || profile) && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => { setProfile(null); setEditing(false); }}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {profileLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#CCFF00] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : profile && (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] sticky top-0 bg-[#111111] z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] font-bold">
                      {profile.customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      {editing ? (
                        <input value={editForm.name ?? ''} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                          className="bg-[#1A1A1A] border border-white/[0.08] rounded px-2 py-1 text-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#CCFF00]" />
                      ) : (
                        <p className="font-semibold text-white">{profile.customer.name}</p>
                      )}
                      <p className="text-white/40 text-xs font-mono">{profile.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {editing ? (
                      <>
                        <button onClick={() => setEditing(false)} className="px-3 py-1.5 text-xs bg-[#1A1A1A] text-white/70 rounded-lg hover:bg-white/[0.08]">Cancel</button>
                        <button onClick={saveEdit} disabled={savingEdit} className="px-3 py-1.5 text-xs bg-[#CCFF00] text-[#0A0A0A] font-semibold rounded-lg disabled:opacity-60">{savingEdit ? 'Saving…' : 'Save'}</button>
                      </>
                    ) : (
                      <button onClick={() => setEditing(true)} className="px-3 py-1.5 text-xs bg-[#1A1A1A] text-white/70 rounded-lg hover:bg-white/[0.08]">Edit</button>
                    )}
                    <button onClick={() => { setProfile(null); setEditing(false); }} className="text-white/30 hover:text-white text-lg ml-2">✕</button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/[0.08]">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{profile.customer.total_bookings}</p>
                    <p className="text-white/40 text-xs mt-0.5">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-400">SAR {profile.customer.total_spent.toLocaleString()}</p>
                    <p className="text-white/40 text-xs mt-0.5">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-400">{profile.bookings.filter(b => b.booking_status === 'cancelled').length}</p>
                    <p className="text-white/40 text-xs mt-0.5">Cancellations</p>
                  </div>
                </div>

                {/* Edit fields */}
                {editing && (
                  <div className="px-6 py-4 border-b border-white/[0.08] space-y-3">
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Email</label>
                      <input type="email" value={editForm.email ?? ''} onChange={e => setEditForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="px-6 py-4 border-b border-white/[0.08]">
                  <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map(tag => {
                      const active = (profile.customer.tags ?? []).includes(tag);
                      return (
                        <button key={tag} onClick={() => toggleTag(profile.customer, tag)}
                          className={`px-3 py-1 rounded-full text-xs border capitalize transition-colors ${active ? tagColors[tag] : 'bg-white/[0.03] text-white/30 border-white/10 hover:border-white/20'}`}>
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div className="px-6 py-4 border-b border-white/[0.08]">
                  <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Internal Notes</p>
                  <textarea value={editForm.notes ?? ''} onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))} rows={3} maxLength={2000}
                    placeholder="Internal notes about this customer…"
                    className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] resize-none" />
                  <div className="flex justify-end mt-2">
                    <button onClick={saveNotes} className="px-4 py-1.5 bg-[#CCFF00] text-[#0A0A0A] text-xs font-semibold rounded-lg hover:bg-[#CCFF00]/90 transition-colors">Save Notes</button>
                  </div>
                </div>

                {/* Booking history */}
                <div className="px-6 py-4">
                  <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Booking History ({profile.bookings.length})</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {profile.bookings.length === 0 && <p className="text-white/30 text-sm">No bookings yet</p>}
                    {profile.bookings.map(b => (
                      <div key={b.id} className="flex items-center justify-between gap-3 p-3 bg-[#1A1A1A] rounded-lg">
                        <div>
                          <p className="font-mono text-[#CCFF00] text-xs">{b.booking_ref}</p>
                          <p className="text-white/50 text-xs">{b.pickup_location} → {b.dropoff_location}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded capitalize ${statusColors[b.booking_status] ?? ''}`}>{b.booking_status.replace('_', ' ')}</span>
                          <p className="text-white/30 text-xs mt-0.5">{b.pickup_date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
