"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 space-y-8 border border-brand-100">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="ArtistPaddy Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-900">
            Welcome back
          </h1>
          <p className="text-gray-500">
            Enter your details to sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 border border-brand-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-fintech-primary/20 focus:border-fintech-primary transition-all bg-brand-50/50"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-sm text-fintech-primary font-medium hover:text-fintech-primary/80"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-brand-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-fintech-primary/20 focus:border-fintech-primary transition-all bg-brand-50/50"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-fintech-primary text-white font-semibold py-3 rounded-xl hover:bg-fintech-primary/90 transition-all shadow-lg shadow-fintech-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="text-fintech-primary font-semibold hover:text-fintech-primary/80 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
