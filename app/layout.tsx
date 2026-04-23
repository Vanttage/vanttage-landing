import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

import Navbar  from "@/app/components/layout/Navbar";
import Footer  from "@/app/components/layout/Footer";
import JsonLd  from "@/app/components/JsonLd";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* ─────────────────────────────────────────
   META — cambia el dominio cuando lo tengas
───────────────────────────────────────── */
const DOMAIN = "https://vanttagetech.com";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),

  title: {
    default: "Vanttage — Desarrollo Web & Software a Medida · Colombia",
    template: "%s | Vanttage",
  },

  description:
    "Agencia de software boutique en Cartagena, Colombia. Desarrollamos sitios web, aplicaciones a medida y automatizaciones que convierten visitas en clientes reales. Código limpio, diseño premium, resultados medibles.",

  keywords: [
    // Intención principal
    "desarrollo web Colombia",
    "agencia web Cartagena",
    "software a medida Colombia",
    "software boutique Colombia",
    "desarrollo web profesional Colombia",
    // Servicios
    "diseño web empresarial Colombia",
    "migración web Next.js",
    "SEO técnico Colombia",
    "automatización procesos digitales",
    "landing page profesional Colombia",
    "mantenimiento web Colombia",
    "sistemas internos empresas",
    // Local
    "agencia digital Cartagena Colombia",
    "desarrollo web Cartagena",
    "empresa software Cartagena",
    // Long-tail
    "páginas web que convierten Colombia",
    "Next.js desarrollo Colombia",
    "aplicaciones web a medida Colombia",
    "rediseño web Colombia",
    "optimización web velocidad Colombia",
  ],

  authors:   [{ name: "Vanttage", url: DOMAIN }],
  creator:   "Vanttage",
  publisher: "Vanttage",

  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  openGraph: {
    type:        "website",
    locale:      "es_CO",
    url:         DOMAIN,
    siteName:    "Vanttage",
    title:       "Vanttage — Desarrollo Web & Software a Medida · Colombia",
    description: "Software boutique en Cartagena, Colombia. Desarrollamos productos digitales de alto nivel que convierten visitantes en clientes reales.",
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@vanttage",
    creator:     "@vanttage",
    title:       "Vanttage — Desarrollo Web & Software a Medida · Colombia",
    description: "Software boutique en Cartagena, Colombia. Código limpio, diseño premium, resultados medibles.",
  },

  alternates: {
    canonical: DOMAIN,
  },

  category: "technology",

  /* Verificación Google Search Console — pega tu código cuando lo tengas */
  verification: { google: "oDFmxUPYD8bwklybjgtr1TNINNHVSlkaIlfz0LiVbuE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/icon.svg"    type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color"     content="#06060C" />
        <meta name="geo.region"      content="CO-BOL" />
        <meta name="geo.placename"   content="Cartagena, Colombia" />
        <JsonLd />
      </head>
      <body className="bg-[#061729] text-[#F8FAFC] antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
