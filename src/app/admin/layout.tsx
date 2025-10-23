// src/app/admin/layout.tsx
import React from "react";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <div className="bg-white shadow-md rounded-xl p-6">{children}</div>
      </main>
    </div>
  );
}
