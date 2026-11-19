/* Datos de los artículos del blog. Los usa el índice y el bloque "Sigue leyendo". */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Fecha corta para tarjetas */
  date: string;
  /** Fecha para la portada del artículo */
  dateLong: string;
  readTime: string;
  cover: string;
  coverAlt: string;
  /** Ruta base del video de portada (sin extensión) */
  video: string;
};

export const posts: Post[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-colombia",
    title: "¿Cuánto cuesta una página web en Colombia en 2026?",
    excerpt:
      "La pregunta que más nos hacen. Te explicamos de qué depende el precio, qué incluye cada tipo de proyecto y qué revisar antes de contratar.",
    category: "Precios y presupuesto",
    date: "Actualizado nov. 2026",
    dateLong: "Actualizado en noviembre de 2026",
    readTime: "6 min",
    cover: "/media/img/team-client-meeting.webp",
    coverAlt: "Reunión con un cliente para definir el alcance de una página web",
    video: "/media/video/hero-keyboard",
  },
  {
    slug: "por-que-necesitas-pagina-web-profesional",
    title: "5 señales de que tu página web está perdiendo clientes",
    excerpt:
      "Si tu web tarda en cargar, no se ve bien en el celular o no aparece en Google, estás perdiendo clientes que ya te estaban buscando.",
    category: "Consejos y estrategia",
    date: "Actualizado nov. 2026",
    dateLong: "Actualizado en noviembre de 2026",
    readTime: "5 min",
    cover: "/media/video/slide-web-poster.webp",
    coverAlt: "Página web abierta en la pantalla de un computador",
    video: "/media/video/slide-web",
  },
  {
    slug: "estadisticas-paginas-web-pymes-2026",
    title: "Datos que muestran por qué tu negocio necesita página web (2026)",
    excerpt:
      "Cifras verificadas, con su fuente y su año, para marcas personales y pymes: alcance en redes, credibilidad, ventas en línea en Colombia y la oportunidad de escribir en español.",
    category: "Datos y estadísticas",
    date: "Nov. 2026",
    dateLong: "Noviembre de 2026",
    readTime: "7 min",
    cover: "/media/img/product-dashboard.webp",
    coverAlt: "Panel con gráficos y estadísticas de un sitio web",
    video: "/media/video/slide-apps",
  },
];

export const getPost = (slug: string) => {
  const p = posts.find((x) => x.slug === slug);
  if (!p) throw new Error(`Artículo no encontrado: ${slug}`);
  return p;
};
