// src/app/admin/_components/AdminHeader.tsx
'use client';

import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b border-gray-200">
      {/* Logo / Title */}
      <h1 className="text-2xl font-semibold text-gray-800">Admin Panel</h1>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-900">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <FaUserCircle size={24} className="text-gray-700" />
          <span className="text-sm text-gray-700 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
