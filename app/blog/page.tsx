import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Consejos de Diseño Web y SEO para tu Negocio",
  description:
    "Guías prácticas sobre páginas web, precios, diseño y posicionamiento en Google para dueños de negocios en Colombia. Sin tecnicismos.",
  alternates: { canonical: "https://vanttagetech.com/blog" },
  openGraph: {
    title: "Blog Vanttage — Consejos de Diseño Web para tu Negocio",
    description:
      "Aprende sobre páginas web, SEO y presencia digital para tu negocio en Colombia. Contenido práctico y sin tecnicismos.",
    url: "https://vanttagetech.com/blog",
  },
};

export default function Page() {
  return <BlogIndex />;
}
