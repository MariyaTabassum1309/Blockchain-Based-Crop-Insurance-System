"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
     <body className={`${inter.className} text-gray-800`}>
        {!isAdminRoute && <Navbar />}

        <main>
          {children}
        </main>

        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}