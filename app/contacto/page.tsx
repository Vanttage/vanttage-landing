import type { Metadata } from "next";
import ContactoContent from "./ContactoContent";
import { faqs } from "./faqs";
import { faqPageSchema, breadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Contacto: cotiza tu página web en Cartagena",
  description:
    "¿Tienes un proyecto en mente? Escríbenos y en menos de 24 horas te respondemos con una propuesta. Hacemos páginas web desde Cartagena, Colombia, para clientes de cualquier país.",
  alternates: { canonical: "https://vanttagetech.com/contacto" },
  openGraph: {
    title: "Contacto: cotiza tu página web en Cartagena",
    description:
      "Escríbenos sobre tu página web. Te respondemos en menos de 24 horas con una propuesta, y preguntar no te compromete.",
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
