import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'বাজার দর - BazarDor',
  description: 'দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের সঠিক বাজার দর',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}