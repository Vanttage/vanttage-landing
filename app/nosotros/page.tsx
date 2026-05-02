import type { Metadata } from "next";
import NosotrosContent from "./NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros — Vanttage · Agencia Web Cartagena",
  description:
    "Somos Vanttage, un equipo boutique en Cartagena, Colombia. Creamos páginas web profesionales con trato directo, diseño único y resultados reales para tu negocio.",
  alternates: { canonical: "https://vanttagetech.com/nosotros" },
  openGraph: {
    title: "Nosotros — Vanttage · Agencia Web Cartagena",
    description:
      "Equipo boutique en Cartagena especializado en desarrollo web y software a medida. Diseño único, trato directo, resultados reales.",
    url: "https://vanttagetech.com/nosotros",
  },
};

export default function Page() {
  return <NosotrosContent />;
}
