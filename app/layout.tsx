import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
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
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Vanttage — Ingeniería web de alto nivel",
  description:
    "Desarrollamos sitios y plataformas web profesionales, migramos proyectos legacy a stacks modernos y mantenemos la tecnología de empresas que quieren escalar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-[#061729] text-[#F8FAFC] antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
