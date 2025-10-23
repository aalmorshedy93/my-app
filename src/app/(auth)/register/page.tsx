'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // تحقق بسيط
    if (!form.email || !form.password || !form.username) {
      toast.error('Please fill in all required fields!');
      return;
    }

    toast.success('Account created successfully 🎉');
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 border border-gray-100 dark:border-gray-800">
        {/* Back to Home */}
        <Link
          href="/"
          className="absolute -top-4 -left-4 bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-full shadow-md transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <h1 className="text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mb-8">
          Create Your Account ✨
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="john_doe"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select gender...</option>
              <option value="male">Male ♂️</option>
              <option value="female">Female ♀️</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg 
                         transition-transform transform hover:-translate-y-0.5 shadow-md"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
