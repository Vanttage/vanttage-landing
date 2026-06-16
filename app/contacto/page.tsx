import type { Metadata } from "next";
import ContactoContent from "./ContactoContent";
import { faqs } from "./faqs";
import { faqPageSchema, breadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Contacto — Vanttage · Hablemos de tu Proyecto",
  description:
    "¿Tienes un proyecto en mente? Escríbenos y te respondemos en menos de 24 horas con una propuesta clara. Agencia web en Cartagena, Colombia.",
  alternates: { canonical: "https://vanttagetech.com/contacto" },
  openGraph: {
    title: "Contacto — Vanttage · Hablemos de tu Proyecto",
    description:
      "Contáctanos para tu página web. Respuesta en menos de 24h con propuesta clara. Sin compromisos.",
    url: "https://vanttagetech.com/contacto",
  },
};

const schemas = [
  faqPageSchema(faqs),
  breadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
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
      <ContactoContent />
    </>
  );
}
