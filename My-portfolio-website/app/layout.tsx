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
  title: 'Ahmed Yossof — Systems & Product Engineering',
  description: 'Showcasing scalable backend architectures, high-performance database systems, workflow automation, and fluid web products.',
  keywords: ['System Architecture', 'Database Engineering', 'Workflow Automation', 'Next.js', 'FastAPI', 'Tailwind CSS', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Ahmed Yossof' }],
};

export const viewport: Viewport = {
  themeColor: '#000000',
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
      <body className="bg-black text-bone-white antialiased min-h-screen selection:bg-[#8052ff]/25 selection:text-[#8052ff]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
