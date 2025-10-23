'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      {/* Animation container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">MyApp</span> 🌐
        </h1>
        <p className="text-gray-600 text-lg mb-10">Please choose your portal to continue</p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {/* User Portal */}
          <Link
            href="/login?role=user"
            className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-blue-100 hover:border-blue-400 hover:scale-105"
          >
            <FaUser className="text-blue-600 text-2xl" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-800">User Portal</h3>
              <p className="text-sm text-gray-500">Explore articles & features</p>
            </div>
          </Link>

          {/* Admin Portal */}
          <Link
            href="/login?role=admin"
            className="flex items-center gap-3 px-6 py-4 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-700 hover:border-gray-500 hover:scale-105"
          >
            <FaLock className="text-yellow-400 text-2xl" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white">Admin Portal</h3>
              <p className="text-sm text-gray-300">Manage users & content</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 text-gray-400 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </main>
  );
}
