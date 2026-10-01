import type { Metadata, Viewport } from 'next';
import { Inter, Cairo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ahmed Yossof — Backend & Full-Stack Developer',
  description: 'High-performance portfolio landing page showcasing backend architectures, high-concurrency e-commerce systems, and full-stack web products built with Next.js, FastAPI, and Supabase.',
  keywords: ['Backend Developer', 'Full-Stack Developer', 'Software Architect', 'Next.js', 'FastAPI', 'Tailwind CSS', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Ahmed Yossof' }],
};

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${cairo.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#070709] text-zinc-100 antialiased min-h-screen selection:bg-[#D4FF00]/20 selection:text-[#D4FF00]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
