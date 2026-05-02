import type { Metadata } from "next";
import ServiciosContent from "./ServiciosContent";

export const metadata: Metadata = {
  title: "Servicios — Vanttage · Desarrollo Web Colombia",
  description:
    "Páginas web profesionales, tiendas virtuales, rediseño, mantenimiento, SEO y aplicaciones a medida. Diseño único, precios claros, resultados reales. Cartagena, Colombia.",
  alternates: { canonical: "https://vanttagetech.com/servicios" },
  openGraph: {
    title: "Servicios — Vanttage · Desarrollo Web Colombia",
    description:
      "Todo lo que necesita tu negocio en internet. Páginas web, tiendas, SEO y apps a medida desde Cartagena, Colombia.",
    url: "https://vanttagetech.com/servicios",
  },
};

export default function Page() {
  return <ServiciosContent />;
}
