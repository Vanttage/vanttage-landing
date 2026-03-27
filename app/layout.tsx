import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Vanttage",
  description: "Boutique de Ingeniería de Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={syne.variable}>
      <body className="font-sans bg-black text-white antialiased">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
