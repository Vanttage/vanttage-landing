import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog: consejos de diseño web y SEO para tu negocio",
  description:
    "Guías prácticas sobre páginas web, precios, diseño y posicionamiento en Google para dueños de negocios, en palabras sencillas.",
  alternates: { canonical: "https://vanttagetech.com/blog" },
  openGraph: {
    title: "Blog de Vanttage: consejos de diseño web para tu negocio",
    description:
      "Artículos sobre páginas web, SEO y precios para negocios, explicados sin lenguaje técnico.",
    url: "https://vanttagetech.com/blog",
  },
};

export default function Page() {
  return <BlogIndex />;
}
