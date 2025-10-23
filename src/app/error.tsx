'use client';

import Link from 'next/link';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h1>

      <p className="text-gray-700 mb-6 max-w-md">
        {error.message || 'An unexpected error occurred.'}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md transition"
        >
          Try again
        </button>

        {/* ✅ زر الرجوع إلى الصفحة الرئيسية */}
        <Link
          href="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
