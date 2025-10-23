// src/components/ThemeToggle.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // avoid SSR mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // placeholder to avoid layout shift / mismatch
    return <button aria-label="toggle theme" className="w-9 h-9 rounded-md" />;
  }

  const current = resolvedTheme || theme;

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {current === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon />}
    </button>
  );
}
