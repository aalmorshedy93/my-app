// app/register/layout.tsx
import React from 'react';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
