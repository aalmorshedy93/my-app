// src/app/site/layout.tsx
import React from "react";
import Header from "./_components/header/Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-900 text-white py-6 text-center mt-12">
        © 2025 MyApp. All rights reserved.
      </footer>
    </>
  );
}
