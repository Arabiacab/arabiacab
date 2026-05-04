'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Driver, DriverStatus } from '@/types';
import { useToast } from '@/components/admin/Toast';

const statusColors: Record<DriverStatus, string> = {
  available: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  busy:      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  offline:   'bg-white/[0.05] text-white/30 border-white/10',
};

const vehicleTypes = ['standard', 'airport', 'tour', 'rental'];

const SKELETON_WIDTHS = ['80%', '65%', '70%', '55%', '60%', '75%'];
function SkeletonRow() {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-white/[0.06] rounded animate-pulse" style={{ width: SKELETON_WIDTHS[i % SKELETON_WIDTHS.length] }} />
        </td>
      ))}
    </tr>
  );
}

const emptyForm = { name: '', phone: '', vehicle_type: 'standard', vehicle_plate: '', notes: '', status: 'available' as DriverStatus, is_active: true };

export default function DriversPage() {
  const { toast } = useToast();
  const [drivers, setDrivers]       = useState<Driver[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editing, setEditing]       = useState<Driver | null>(null);
  const [form, setForm]             = useState({ ...emptyForm });
  const [saving, setSaving]         = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch]         = useState('');

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/drivers');
    const d = await res.json();
    if (d.success) setDrivers(d.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchDrivers(); }, [fetchDrivers]);

  function openCreate() { setEditing(null); setForm({ ...emptyForm }); setShowModal(true); }
  function openEdit(driver: Driver) {
    setEditing(driver);
    setForm({ name: driver.name, phone: driver.phone, vehicle_type: driver.vehicle_type, vehicle_plate: driver.vehicle_plate ?? '', notes: driver.notes ?? '', status: driver.status, is_active: driver.is_active });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.phone.trim()) { toast('Name and phone required', 'error'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/drivers/${editing.id}` : '/api/drivers';
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await res.json();
      if (d.success) {
        toast(editing ? 'Driver updated' : 'Driver added');
        setShowModal(false); fetchDrivers();
      } else { toast(d.error ?? 'Save failed', 'error'); }
    } finally { setSaving(false); }
  }

  async function toggleStatus(driver: Driver) {
    const next: DriverStatus = driver.status === 'available' ? 'offline' : 'available';
    const res = await fetch(`/api/drivers/${driver.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) });
    const d = await res.json();
    if (d.success) { toast(`${driver.name} → ${next}`); fetchDrivers(); }
    else toast(d.error ?? 'Update failed', 'error');
  }

  async function handleDelete(driver: Driver) {
    if (!confirm(`Delete driver ${driver.name}? This cannot be undone.`)) return;
    setDeletingId(driver.id);
    try {
      const res = await fetch(`/api/drivers/${driver.id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) { toast('Driver deleted'); fetchDrivers(); }
      else toast(d.error ?? 'Delete failed', 'error');
    } finally { setDeletingId(null); }
  }

  const filtered = drivers.filter(d => {
    if (!search) return true;
    const q = search.toLowerCase();
    return d.name.toLowerCase().includes(q) || d.phone.includes(q) || (d.vehicle_plate ?? '').toLowerCase().includes(q);
  });

  const available = drivers.filter(d => d.status === 'available' && d.is_active).length;
  const busy      = drivers.filter(d => d.status === 'busy').length;

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Drivers</h1>
          <p className="text-white/50 text-sm mt-0.5">{drivers.length} total · {available} available · {busy} busy</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-[#CCFF00] text-[#0A0A0A] font-semibold hover:bg-[#CCFF00]/90 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Driver
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Available', value: available, color: 'text-emerald-400' },
          { label: 'Busy', value: busy, color: 'text-yellow-400' },
          { label: 'Offline', value: drivers.filter(d => d.status === 'offline').length, color: 'text-white/50' },
        ].map(s => (
          <div key={s.label} className="bg-[#111111] border border-white/[0.08] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <input type="search" placeholder="Search name, phone, plate…" value={search} onChange={e => setSearch(e.target.value)}
        className="w-full max-w-sm bg-[#111111] border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />

      <div className="bg-[#111111] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left px-4 py-3 text-white/50 font-medium">Driver</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Phone</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Vehicle</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Plate</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                <th className="text-left px-4 py-3 text-white/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.map(d => (
                    <tr key={d.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${!d.is_active ? 'opacity-50' : ''}`}>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{d.name}</p>
                        {d.notes && <p className="text-white/30 text-xs truncate max-w-[160px]">{d.notes}</p>}
                      </td>
                      <td className="px-4 py-3 text-white/70 font-mono text-xs">{d.phone}</td>
                      <td className="px-4 py-3 text-white/70 text-xs capitalize">{d.vehicle_type}</td>
                      <td className="px-4 py-3 text-white/50 text-xs font-mono">{d.vehicle_plate ?? '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border capitalize ${statusColors[d.status]}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleStatus(d)} className="text-xs text-white/40 hover:text-[#CCFF00] transition-colors">
                            {d.status === 'available' ? 'Set Offline' : 'Set Available'}
                          </button>
                          <span className="text-white/20">·</span>
                          <button onClick={() => openEdit(d)} className="text-xs text-white/40 hover:text-white transition-colors">Edit</button>
                          <span className="text-white/20">·</span>
                          <button onClick={() => handleDelete(d)} disabled={deletingId === d.id} className="text-xs text-white/40 hover:text-red-400 transition-colors disabled:opacity-50">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
              }
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-white/30">No drivers found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#111111] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
              <h3 className="font-semibold text-white">{editing ? 'Edit Driver' : 'Add Driver'}</h3>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white text-lg">✕</button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {[
                { label: 'Name', key: 'name', type: 'text', placeholder: 'Driver name' },
                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+966 5X XXX XXXX' },
                { label: 'Vehicle Plate', key: 'vehicle_plate', type: 'text', placeholder: 'ABC 1234' },
                { label: 'Notes', key: 'notes', type: 'text', placeholder: 'Optional notes' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-white/50 mb-1.5">{f.label}</label>
                  <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Vehicle Type</label>
                  <select value={form.vehicle_type} onChange={e => setForm(p => ({ ...p, vehicle_type: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]">
                    {vehicleTypes.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as DriverStatus }))}
                    className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#CCFF00]">
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <button type="button" onClick={() => setForm(p => ({ ...p, is_active: !p.is_active }))}
                  className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${form.is_active ? 'bg-[#CCFF00]' : 'bg-white/10'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition mt-0.5 ${form.is_active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
                <span className="text-sm text-white/70">Active</span>
              </label>
            </div>
            <div className="px-6 py-4 flex gap-3 border-t border-white/[0.08]">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm bg-[#1A1A1A] text-white/70 hover:bg-white/[0.08] transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 px-4 py-2 rounded-lg text-sm bg-[#CCFF00] text-[#0A0A0A] font-semibold hover:bg-[#CCFF00]/90 transition-colors disabled:opacity-60">
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Driver'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
