import type { Metadata } from 'next';
import { Cairo as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import AuthProvider from '@/auth';
import Navbar from '@/components/Navbar';
import AlertProvider from '@/providers/alertProvider';
import ContactProvider from '@/providers/ContactProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Muntaj',
  description: 'Shear your products with your neighbors',
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
              {/* @ts-expect-error */}
              <Navbar />
              {children}
            </ContactProvider>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
