'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'user';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.length < 10 || password.length < 6) {
      toast.error('Please check  all fields');
      return;
    } else {
      toast.success('Login successful!');
      console.log({ email, password });
      if (role === 'admin') {
        router.push('/admin');
        return;
      }
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800">
        {/* Back to Home */}
        <Link
          href="/"
          className="absolute -top-4 -left-4 bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <h1 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mb-8">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg 
                       transition-transform transform hover:-translate-y-0.5 shadow-md"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link href="/register" className="text-sky-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
