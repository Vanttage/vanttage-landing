import type { Metadata } from "next";
import ProyectosContent from "./ProyectosContent";

export const metadata: Metadata = {
  title: "Proyectos — Vanttage · Portafolio Web Colombia",
  description:
    "Conoce los proyectos que hemos desarrollado: páginas web, tiendas virtuales, migraciones y aplicaciones a medida para empresas en Colombia.",
  alternates: { canonical: "https://vanttagetech.com/proyectos" },
  openGraph: {
    title: "Proyectos — Vanttage · Portafolio Web Colombia",
    description:
      "Portafolio de sitios web y aplicaciones desarrolladas por Vanttage para empresas en Colombia.",
    url: "https://vanttagetech.com/proyectos",
  },
};

export default function Page() {
  return <ProyectosContent />;
}
