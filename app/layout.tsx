import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { TickerSkeleton } from "@/components/Skeletons";
import { getCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজার দর ও দামের পরিবর্তন এক জায়গায়।",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="bn" data-theme="bazardor">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar categories={categories} />
        <Suspense fallback={<TickerSkeleton />}>
          <Ticker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
