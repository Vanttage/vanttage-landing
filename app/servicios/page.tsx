import type { Metadata } from "next";
import ServiciosContent from "./ServiciosContent";
import { faqs } from "./faqs";
import { faqPageSchema, breadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Servicios de páginas web y desarrollo web en Colombia",
  description:
    "Páginas web profesionales, tiendas virtuales, rediseño, mantenimiento, SEO y aplicaciones web a medida. Cotizamos cada proyecto según lo que necesitas. Desde Cartagena, Colombia, para cualquier país.",
  alternates: { canonical: "https://vanttagetech.com/servicios" },
  openGraph: {
    title: "Servicios de páginas web y desarrollo web en Colombia",
    description:
      "Páginas web, tiendas virtuales, SEO y aplicaciones web a medida para negocios de cualquier país, desde Cartagena, Colombia.",
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
