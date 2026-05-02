import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import JsonLd from "@/app/components/JsonLd";
import ChatWidget from "@/app/components/ChatWidget";

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
    default: "Vanttage — Páginas Web Profesionales · Cartagena, Colombia",
    template: "%s | Vanttage",
  },

  description:
    "Creamos páginas web profesionales en Cartagena, Colombia. Diseño único, rápido y optimizado para Google que genera confianza y trae más clientes a tu negocio. Cotización gratis en menos de 24h.",

  keywords: [
    // Alta intención — búsquedas de compra
    "páginas web profesionales Cartagena",
    "diseño web Cartagena Colombia",
    "hacer página web para negocio Colombia",
    "agencia web Cartagena",
    "desarrollo web Cartagena",
    // Servicios específicos
    "tienda virtual Colombia",
    "rediseño página web Colombia",
    "mantenimiento web Colombia",
    "posicionamiento Google Colombia",
    "SEO para negocios Colombia",
    "landing page profesional Colombia",
    "aplicaciones web a medida Colombia",
    // Long-tail con intención
    "cuánto cuesta una página web en Colombia",
    "empresa para hacer página web Cartagena",
    "agencia diseño web profesional Colombia",
    "página web para empresa pequeña Colombia",
    "crear tienda online Colombia",
    // Local + servicios
    "agencia digital Cartagena Bolívar",
    "desarrollo web profesional Colombia",
    "diseño web para restaurantes Colombia",
    "página web para hoteles Cartagena",
  ],

  authors: [{ name: "Vanttage", url: DOMAIN }],
  creator: "Vanttage",
  publisher: "Vanttage",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: DOMAIN,
    siteName: "Vanttage",
    title: "Vanttage — Páginas Web Profesionales · Cartagena, Colombia",
    description:
      "Creamos páginas web profesionales con diseño único que generan confianza y traen más clientes a tu negocio. Cotización gratis en menos de 24h.",
    images: [
      {
        url: `${DOMAIN}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Vanttage — Páginas Web Profesionales · Cartagena, Colombia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@vanttage",
    creator: "@vanttage",
    title: "Vanttage — Páginas Web Profesionales · Cartagena, Colombia",
    description:
      "Diseño único, código limpio y resultados reales para tu negocio en internet. Cartagena, Colombia.",
    images: [`${DOMAIN}/opengraph-image`],
  },

  alternates: {
    canonical: DOMAIN,
  },

  category: "technology",

  /* Verificación Google Search Console — pega tu código cuando lo tengas */
  verification: { google: "oDFmxUPYD8bwklybjgtr1TNINNHVSlkaIlfz0LiVbuE" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#06060C" />
        <meta name="geo.region" content="CO-BOL" />
        <meta name="geo.placename" content="Cartagena, Colombia" />
        <JsonLd />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVHZXM6G');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-[#061729] text-[#F8FAFC] antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KVHZXM6G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
