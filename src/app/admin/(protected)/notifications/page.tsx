'use client';

import { useEffect, useState } from 'react';
import type { Notification } from '@/types';
import { useToast } from '@/components/admin/Toast';

const typeIcons: Record<string, string> = {
  new_booking:   'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  status_change: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  payment:       'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  system:        'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

const typeColors: Record<string, string> = {
  new_booking:   'bg-blue-500/10 text-blue-400',
  status_change: 'bg-purple-500/10 text-purple-400',
  payment:       'bg-emerald-500/10 text-emerald-400',
  system:        'bg-white/[0.05] text-white/40',
};

export default function NotificationsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    fetch('/api/notifications')
      .then(r => r.json())
      .then(d => d.success && setNotifications(d.data))
      .finally(() => setLoading(false));
  }, []);

  const unread = notifications.filter(n => !n.is_read);

  async function markAllRead() {
    if (unread.length === 0) return;
    setMarkingAll(true);
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: unread.map(n => n.id) }),
      });
      const d = await res.json();
      if (d.success) {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        toast('All notifications marked as read');
      }
    } finally {
      setMarkingAll(false);
    }
  }

  async function markOneRead(id: string) {
    const n = notifications.find(n => n.id === id);
    if (!n || n.is_read) return;
    const res = await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [id] }),
    });
    const d = await res.json();
    if (d.success) setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  }

  function formatTime(iso: string) {
    const d = new Date(iso);
    const now = Date.now();
    const diff = now - d.getTime();
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString('en-SA', { month: 'short', day: 'numeric' });
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-white/50 text-sm mt-0.5">
            {unread.length > 0 ? `${unread.length} unread` : 'All caught up'}
          </p>
        </div>
        {unread.length > 0 && (
          <button
            onClick={markAllRead}
            disabled={markingAll}
            className="text-sm text-[#CCFF00] hover:text-[#CCFF00]/80 transition-colors disabled:opacity-60"
          >
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#CCFF00] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-[#111111] border border-white/[0.08] rounded-xl px-6 py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-white/40">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markOneRead(n.id)}
              className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${n.is_read ? 'bg-[#111111] border-white/[0.08] opacity-60 hover:opacity-100' : 'bg-[#111111] border-[#CCFF00]/20 hover:border-[#CCFF00]/40'}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[n.type] ?? typeColors.system}`}>
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={typeIcons[n.type] ?? typeIcons.system} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${n.is_read ? 'text-white/60' : 'text-white font-medium'}`}>{n.message}</p>
                <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1.5">
                  <span className="capitalize">{n.type.replace('_', ' ')}</span>
                  <span>·</span>
                  <span>{formatTime(n.created_at)}</span>
                  {!n.is_read && <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] inline-block" />}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
