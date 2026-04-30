'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Customer } from '@/types';
import { useToast } from '@/components/admin/Toast';

export default function CustomersPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/customers');
    const d = await res.json();
    if (d.success) setCustomers(d.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  async function toggleVip(customer: Customer) {
    setTogglingId(customer.id);
    try {
      const res = await fetch(`/api/customers/${customer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_vip: !customer.is_vip }),
      });
      const d = await res.json();
      if (d.success) {
        toast(`${customer.name} ${!customer.is_vip ? 'marked as VIP' : 'VIP removed'}`);
        setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, is_vip: !c.is_vip } : c));
      } else {
        toast(d.error ?? 'Update failed', 'error');
      }
    } finally {
      setTogglingId(null);
    }
  }

  const filtered = customers.filter(c => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.email ?? '').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-gray-400 text-sm mt-0.5">{filtered.length} registered</p>
      </div>

      <input
        type="search"
        placeholder="Search by name, phone, or email…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

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
                  <th className="text-left px-5 py-3 text-gray-400 font-medium">Customer</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium">Phone</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium text-right">Bookings</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium text-right">Spent</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium">Joined</th>
                  <th className="text-left px-5 py-3 text-gray-400 font-medium">VIP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium flex items-center gap-1.5">
                            {c.name}
                            {c.is_vip && <span className="text-amber-400 text-xs">★ VIP</span>}
                          </p>
                          {c.email && <p className="text-gray-500 text-xs">{c.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-300 font-mono text-xs">{c.phone}</td>
                    <td className="px-5 py-3 text-gray-300 text-right">{c.total_bookings}</td>
                    <td className="px-5 py-3 text-emerald-400 text-right font-medium">SAR {c.total_spent.toLocaleString()}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(c.created_at).toLocaleDateString('en-SA', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => toggleVip(c)}
                        disabled={togglingId === c.id}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${c.is_vip ? 'bg-amber-500' : 'bg-gray-700'}`}
                        title={c.is_vip ? 'Remove VIP' : 'Make VIP'}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ${c.is_vip ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-500">No customers found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
