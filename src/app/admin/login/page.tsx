'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? 'Invalid email or password');
        return;
      }
      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0A0A0A]">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#CCFF00] mb-4">
            <svg className="w-8 h-8 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">ArabiaCab Admin</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to manage bookings</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08] shadow-2xl space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="admin@arabiacab.com"
              className="w-full bg-[#1A1A1A] rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-[#1A1A1A] rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#CCFF00] hover:bg-[#CCFF00]/90 disabled:opacity-60 disabled:cursor-not-allowed text-[#0A0A0A] font-semibold rounded-lg py-2.5 transition text-sm"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          ArabiaCab © {new Date().getFullYear()} · Admin Panel
        </p>
      </div>
    </div>
  );
}
