import type { Metadata } from 'next';
import { Cairo as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import AuthProvider from '@/auth';
import Navbar from '@/components/Navbar';
import AlertProvider from '@/providers/alertProvider';
import ContactProvider from '@/providers/ContactProvider';
import Footer from '@/components/Footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'منتج - شارك منتجاتك مع جيرانك العرب',
  description: `منتج هي منصة عربية تعرض المنتجات العربية المصنعة محلياً، بهدف تعزيز التعاون التجاري بين الدول العربية`,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AuthProvider>
          <AlertProvider>
            <ContactProvider>
              {/* @ts-ignore */}
              <Navbar />
              {children}
            </ContactProvider>
          </AlertProvider>
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}
