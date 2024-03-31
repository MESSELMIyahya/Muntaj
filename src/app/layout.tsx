import type { Metadata } from 'next';
import { Cairo as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import AuthProvider from '@/auth';
import Navbar from '@/components/Navbar';
import AlertProvider from '@/providers/alertProvider';
import ContactProvider from '@/providers/ContactProvider';
import Footer from '@/components/Footer';
import QueryProvider from '@/providers/QueryProvider';

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
            <QueryProvider>
              <ContactProvider>
                {/* @ts-ignore */}
                <Navbar />
                {children}
              </ContactProvider>
            </QueryProvider>
          </AlertProvider>
        </AuthProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
