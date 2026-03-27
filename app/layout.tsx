import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Vanttage",
  description:
    "Vanttage diseña sistemas, automatizaciones y plataformas a medida para empresas que necesitan escalar su operación con software.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
