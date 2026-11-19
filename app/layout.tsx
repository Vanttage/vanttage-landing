import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import JsonLd from "@/app/components/JsonLd";
import ChatWidget from "@/app/components/ChatWidget";
import MotionProvider from "@/app/components/MotionProvider";

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
    default: "Vanttage | Páginas web profesionales en Cartagena, Colombia",
    template: "%s | Vanttage",
  },

  description:
    "Hacemos páginas web profesionales desde Cartagena, Colombia, para negocios de cualquier país. Diseño propio, carga rápida y bien posicionadas en Google para que te encuentren más clientes. Cotización gratis en menos de 24 horas.",

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
    "diseño web en español para empresas en el exterior",
    "agencia de desarrollo web en Latinoamérica",
    "desarrollo web remoto para empresas en Estados Unidos",
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
    title: "Vanttage | Páginas web profesionales en Cartagena, Colombia",
    description:
      "Hacemos páginas web profesionales para negocios en Colombia y en cualquier país, con diseño propio y pensadas para conseguir clientes. Cotización gratis en menos de 24 horas.",
    images: [
      {
        url: `${DOMAIN}/og.png`,
        width: 1200,
        height: 630,
        alt: "Vanttage | Páginas web profesionales en Cartagena, Colombia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@vanttage",
    creator: "@vanttage",
    title: "Vanttage | Páginas web profesionales en Cartagena, Colombia",
    description:
      "Páginas web y aplicaciones web para negocios de cualquier país. Desde Cartagena, Colombia.",
    images: [`${DOMAIN}/og.png`],
  },

  alternates: {
    canonical: DOMAIN,
  },

  category: "technology",

  /* app/favicon.ico lo inyecta Next automáticamente; aquí solo los extra */
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: "/apple-touch-icon.png",
  },

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
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          <ChatWidget />
        </MotionProvider>
      </body>
    </html>
  );
}
