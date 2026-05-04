'use client';

import { useEffect, useState } from 'react';
import type { PricingRule } from '@/types';
import { useToast } from '@/components/admin/Toast';

const serviceLabels: Record<string, string> = {
  standard: 'Standard Ride',
  airport:  'Airport Transfer',
  tour:     'City Tour',
  rental:   'Daily Rental',
};

const serviceIcons: Record<string, string> = {
  standard: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  airport:  'M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m3 7h3m-3 0l3-3m-3 3l3 3M9 10h.01M12 10h.01M15 10h.01',
  tour:     'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  rental:   'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
};

interface EditState {
  base_price: string;
  price_per_km: string;
  minimum_price: string;
  is_active: boolean;
}

export default function PricingPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(d => d.success && setRules(d.data))
      .finally(() => setLoading(false));
  }, []);

  function startEdit(rule: PricingRule) {
    setEditing(rule.id);
    setEditState({
      base_price:    String(rule.base_price),
      price_per_km:  String(rule.price_per_km ?? ''),
      minimum_price: String(rule.minimum_price ?? ''),
      is_active:     rule.is_active,
    });
  }

  function cancelEdit() {
    setEditing(null);
    setEditState(null);
  }

  async function saveEdit(rule: PricingRule) {
    if (!editState) return;
    const base_price = parseFloat(editState.base_price);
    if (isNaN(base_price) || base_price <= 0) {
      toast('Base price must be a positive number', 'error');
      return;
    }
    const updates: Record<string, unknown> = {
      id: rule.id,
      base_price,
      is_active: editState.is_active,
    };
    const pkm = parseFloat(editState.price_per_km);
    if (!isNaN(pkm)) updates.price_per_km = pkm;
    const minp = parseFloat(editState.minimum_price);
    if (!isNaN(minp)) updates.minimum_price = minp;

    setSaving(true);
    try {
      const res = await fetch('/api/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const d = await res.json();
      if (d.success) {
        setRules(prev => prev.map(r => r.id === rule.id ? d.data : r));
        toast('Pricing updated');
        cancelEdit();
      } else {
        toast(d.error ?? 'Update failed', 'error');
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#CCFF00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Pricing</h1>
        <p className="text-white/50 text-sm mt-0.5">Manage service rates (SAR)</p>
      </div>

      <div className="space-y-4">
        {rules.map(rule => {
          const isEditing = editing === rule.id;
          return (
            <div key={rule.id} className={`bg-[#111111] border rounded-xl overflow-hidden transition-colors ${isEditing ? 'border-[#CCFF00]/30' : 'border-white/[0.08]'}`}>
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#CCFF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={serviceIcons[rule.service_type] ?? serviceIcons.standard} />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{serviceLabels[rule.service_type] ?? rule.service_type}</p>
                    {!isEditing && (
                      <p className="text-white/40 text-xs mt-0.5">
                        SAR {rule.base_price} base
                        {rule.price_per_km != null && ` · SAR ${rule.price_per_km}/km`}
                        {rule.minimum_price != null && ` · min SAR ${rule.minimum_price}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!isEditing && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${rule.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.05] text-white/30'}`}>
                      {rule.is_active ? 'Active' : 'Inactive'}
                    </span>
                  )}
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button onClick={cancelEdit} className="px-3 py-1.5 rounded-lg text-xs bg-[#1A1A1A] text-white/70 hover:bg-white/[0.08] transition-colors">Cancel</button>
                      <button
                        onClick={() => saveEdit(rule)}
                        disabled={saving}
                        className="px-3 py-1.5 rounded-lg text-xs bg-[#CCFF00] text-[#0A0A0A] font-semibold hover:bg-[#CCFF00]/90 transition-colors disabled:opacity-60"
                      >
                        {saving ? 'Saving…' : 'Save'}
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => startEdit(rule)} className="px-3 py-1.5 rounded-lg text-xs bg-[#1A1A1A] text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors">Edit</button>
                  )}
                </div>
              </div>

              {isEditing && editState && (
                <div className="px-6 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/[0.08] pt-4">
                  <Field
                    label="Base Price (SAR)"
                    value={editState.base_price}
                    onChange={v => setEditState(s => s ? { ...s, base_price: v } : s)}
                    type="number"
                    required
                  />
                  <Field
                    label="Per KM (SAR)"
                    value={editState.price_per_km}
                    onChange={v => setEditState(s => s ? { ...s, price_per_km: v } : s)}
                    type="number"
                    placeholder="optional"
                  />
                  <Field
                    label="Minimum (SAR)"
                    value={editState.minimum_price}
                    onChange={v => setEditState(s => s ? { ...s, minimum_price: v } : s)}
                    type="number"
                    placeholder="optional"
                  />
                  <div className="flex items-center gap-3 col-span-full">
                    <label className="text-sm text-white/70 flex items-center gap-2 cursor-pointer select-none">
                      <button
                        type="button"
                        onClick={() => setEditState(s => s ? { ...s, is_active: !s.is_active } : s)}
                        className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${editState.is_active ? 'bg-emerald-500' : 'bg-white/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition mt-0.5 ${editState.is_active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                      Active
                    </label>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-white/40 mb-1.5">{label}{required && <span className="text-[#CCFF00] ml-0.5">*</span>}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        min={0}
        step="0.01"
        className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
      />
    </div>
  );
}
