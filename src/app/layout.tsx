import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import { ThemeProvider } from './providers/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyApp',
  description: 'A modern Next.js app with theme support',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                const t = localStorage.getItem('theme');
                if(t) document.documentElement.classList.add(t);
              } catch(e){}
            })();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
