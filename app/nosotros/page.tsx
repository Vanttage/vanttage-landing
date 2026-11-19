import type { Metadata } from "next";
import NosotrosContent from "./NosotrosContent";

export const metadata: Metadata = {
  title: "Nosotros: equipo de desarrollo web en Cartagena",
  description:
    "Somos Vanttage, un equipo pequeño en Cartagena, Colombia. Hacemos páginas web profesionales con diseño propio, y hablas directamente con quien programa tu proyecto.",
  alternates: { canonical: "https://vanttagetech.com/nosotros" },
  openGraph: {
    title: "Nosotros: equipo de desarrollo web en Cartagena",
    description:
      "Equipo pequeño en Cartagena que hace páginas web y software a medida. Hablas directamente con quien programa tu proyecto.",
    url: "https://vanttagetech.com/nosotros",
  },
};

export default function Page() {
  return <NosotrosContent />;
}
