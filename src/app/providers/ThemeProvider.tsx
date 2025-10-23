'use client';

import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"     // سيضع class="dark" على <html>
      defaultTheme="system" // يمكن تغييره إلى 'light' أو 'dark' حسب رغبتك
      enableSystem={true}
      storageKey="theme"
    >
      {children}
    </NextThemeProvider>
  );
}
