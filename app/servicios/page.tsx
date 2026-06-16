import type { Metadata } from "next";
import ServiciosContent from "./ServiciosContent";
import { faqs } from "./faqs";
import { faqPageSchema, breadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Servicios — Vanttage · Desarrollo Web Colombia",
  description:
    "Páginas web profesionales, tiendas virtuales, rediseño, mantenimiento, SEO y aplicaciones a medida. Diseño único, cotizaciones a la medida y resultados reales. Cartagena, Colombia.",
  alternates: { canonical: "https://vanttagetech.com/servicios" },
  openGraph: {
    title: "Servicios — Vanttage · Desarrollo Web Colombia",
    description:
      "Todo lo que necesita tu negocio en internet. Páginas web, tiendas, SEO y apps a medida desde Cartagena, Colombia.",
    url: "https://vanttagetech.com/servicios",
  },
};

const schemas = [
  faqPageSchema(faqs),
  breadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
  ]),
];

export default function Page() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <ServiciosContent />
    </>
  );
}
