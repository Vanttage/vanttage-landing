import type { Metadata } from "next";
import ProyectosContent from "./ProyectosContent";

export const metadata: Metadata = {
  title: "Proyectos: portafolio de páginas web en Colombia",
  description:
    "Mira los proyectos que hemos hecho: páginas web, tiendas virtuales, migraciones y aplicaciones web a medida para empresas en Colombia y Estados Unidos.",
  alternates: { canonical: "https://vanttagetech.com/proyectos" },
  openGraph: {
    title: "Proyectos: portafolio de páginas web en Colombia",
    description:
      "Páginas web y aplicaciones web que Vanttage ha hecho para empresas en Colombia y Estados Unidos.",
    url: "https://vanttagetech.com/proyectos",
  },
};

export default function Page() {
  return <ProyectosContent />;
}
