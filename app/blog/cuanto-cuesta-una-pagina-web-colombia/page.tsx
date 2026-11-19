import type { Metadata } from "next";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { breadcrumbSchema } from "@/app/lib/schema";
import ArticleLayout from "../_components/ArticleLayout";
import StatQuote, { type Cite } from "../_components/StatQuote";
import BarChart from "../_components/BarChart";
import PostFigure from "../_components/PostFigure";
import Src from "../_components/InlineLink";
import { CARD, H2, H3, INTRO, P, STRONG } from "../_components/prose";

export const metadata: Metadata = {
  title: "¿Cuánto cuesta una página web en Colombia en 2026?",
  description:
    "Guía 2026: de qué depende el precio de una página web en Colombia, qué incluye cada tipo de proyecto (institucional, tienda virtual, rediseño y aplicaciones web) y qué revisar antes de contratar.",
  alternates: { canonical: "https://vanttagetech.com/blog/cuanto-cuesta-una-pagina-web-colombia" },
  openGraph: {
    title: "¿Cuánto cuesta una página web en Colombia en 2026?",
    description:
      "De qué depende el precio, qué incluye cada tipo de proyecto y qué revisar antes de contratar. Una guía para dueños de negocios en Colombia.",
    url: "https://vanttagetech.com/blog/cuanto-cuesta-una-pagina-web-colombia",
    images: [{ url: "https://vanttagetech.com/media/img/team-client-meeting.webp", width: 1600, height: 1068 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "¿Cuánto cuesta una página web en Colombia en 2026?",
  description: "Qué determina el precio de una página web en Colombia y qué incluye cada tipo de proyecto. Guía 2026.",
  author: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  publisher: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  datePublished: "2025-05-01",
  dateModified: "2026-11-18",
  image: "https://vanttagetech.com/media/img/team-client-meeting.webp",
  mainEntityOfPage: "https://vanttagetech.com/blog/cuanto-cuesta-una-pagina-web-colombia",
};

const SRC = {
  godaddy: "https://www.portafolio.co/emprendimiento/digitales-pero-con-obstaculos-asi-navegan-las-pymes-colombianas-en-el-entorno-online-631921",
  ccce: "https://forbes.co/tecnologia/comercio-electronico-en-colombia-alcanzo-1454-billones-en-ventas-en-2025",
} as const;

const CITE = {
  godaddy: { who: "GoDaddy", work: "Encuesta Global de Emprendimiento", year: "2025", via: "Portafolio", href: SRC.godaddy },
  ccce: { who: "Cámara Colombiana de Comercio Electrónico", year: "2026", via: "Forbes Colombia", href: SRC.ccce },
} satisfies Record<string, Cite>;

const projects = [
  { name: "SOTEC", type: "Rediseño web", img: "/previews/sotec.webp", url: "https://www.sotecse.com/" },
  { name: "EcoTruck", type: "Página web", img: "/previews/ecotruck.webp", url: "https://ecotruck-landing.vercel.app/" },
  { name: "MAR · GOYN Barranquilla", type: "Aplicación web", img: "/previews/mar-goyn.webp", url: "https://mar.goynbarranquilla.com/" },
];

const priceCards = [
  {
    type: "Página web institucional / landing page",
    includes: [
      "Diseño hecho para tu marca",
      "Entre 6 y 8 secciones de contenido",
      "Formulario de contacto integrado",
      "SEO básico desde el inicio",
      "Responsive (móvil, tablet, escritorio)",
    ],
    ideal: "Restaurantes, consultorios, empresas de servicios, profesionales.",
  },
  {
    type: "Tienda virtual (e-commerce)",
    includes: [
      "Catálogo de productos con filtros",
      "Pagos online (PSE, Nequi, tarjetas)",
      "Panel de administración propio",
      "Gestión de pedidos y stock",
      "Diseño optimizado para venta",
    ],
    ideal: "Tiendas de ropa, cosméticos, artesanías, productos físicos o digitales.",
  },
  {
    type: "Rediseño de sitio existente",
    includes: [
      "Diseño nuevo desde cero",
      "Migración del contenido actual",
      "Preservación del SEO acumulado",
      "Mejora de velocidad y rendimiento",
      "Sin tiempo de caída del sitio",
    ],
    ideal: "Negocios con web vieja que quieren modernizarse sin perder lo que tienen.",
  },
  {
    type: "Aplicación web a medida",
    includes: [
      "Reservas, CRM, portal de clientes",
      "Base de datos y lógica propia",
      "Roles y permisos de usuario",
      "Integraciones con otros sistemas",
      "Documentación y capacitación",
    ],
    ideal: "Empresas que necesitan automatizar procesos o flujos específicos.",
  },
];

const alerts = [
  "No tienen portafolio con proyectos reales que puedas visitar en línea.",
  "No te explican claramente qué está incluido y qué tiene costo adicional.",
  "No tienes contacto directo con quien hace el trabajo.",
  "Prometen resultados de SEO garantizados en días o semanas.",
  "No incluyen revisiones o cobran por cada ajuste menor.",
  "No hay contrato ni acuerdo escrito de lo que se va a entregar.",
];


const toc = [
  { id: "datos", label: "Dos datos para empezar" },
  { id: "de-que-depende", label: "De qué depende el precio" },
  { id: "que-incluye", label: "Qué incluye cada tipo de proyecto" },
  { id: "paginas-baratas", label: "¿Por qué hay páginas tan baratas?" },
  { id: "senales-alerta", label: "Señales de alerta al contratar" },
  { id: "conclusion", label: "Conclusión" },
  { id: "fuentes", label: "Fuentes" },
];

export default function Post() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Inicio", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: "¿Cuánto cuesta una página web en Colombia?", path: "/blog/cuanto-cuesta-una-pagina-web-colombia" },
            ]),
          ),
        }}
      />
      <ArticleLayout
        slug="cuanto-cuesta-una-pagina-web-colombia"
        lead="De qué depende el precio, qué incluye cada tipo de proyecto y qué revisar antes de pagarle a alguien."
        toc={toc}
        cta={{
          title: "¿Cuánto costaría tu página web?",
          text: "Trabajamos desde Cartagena con negocios de cualquier país. Cuéntanos qué necesitas y te respondemos con un presupuesto claro en menos de 24 horas.",
          button: "Pedir cotización",
        }}
      >
        {/* Intro */}
        <div className={INTRO}>
          <p>
            Es lo primero que casi todos nos preguntan: <strong className={STRONG}>¿cuánto me va a costar?</strong> Es normal preguntarlo. El problema es que en internet encuentras precios muy distintos y casi nadie explica de dónde salen.
          </p>
          <p>
            Esta guía usa a Colombia como referencia de precios y de mercado, aunque lo que explica sirve para cualquier negocio, esté donde esté.
          </p>
        </div>

        {/* Datos */}
        <section className="space-y-6">
          <h2 id="datos" className={H2}>Dos datos para empezar</h2>
          <p className={P}>Antes de hablar de precios, conviene ver por qué vale la pena hacerlo bien:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatQuote
              figure="17%"
              text="De las pymes colombianas opera principalmente desde su propio sitio web. El 37% depende sobre todo de las redes sociales."
              note="Encuesta a 3.504 dueños de pequeños negocios en 11 países, enero de 2025."
              cite={CITE.godaddy}
            />
            <StatQuote
              figure="+11,1%"
              text="Crecieron las ventas en línea en Colombia en 2025, hasta $145,4 billones de pesos y 684,6 millones de compras."
              cite={CITE.ccce}
              delay={0.1}
            />
          </div>
          <BarChart
            title="Ventas en línea en Colombia (billones de pesos)"
            bars={[
              { label: "2019", value: 35.8, display: "$35,8" },
              { label: "2024", value: 130.9, display: "$130,9" },
              { label: "2025", value: 145.4, display: "$145,4", highlight: true },
            ]}
            note="El mercado se multiplicó por cuatro desde 2019. Ese crecimiento se lo llevan los negocios que venden en línea."
            cite={CITE.ccce}
          />
        </section>

        {/* Sección 1 */}
        <section className="space-y-6">
          <h2 id="de-que-depende" className={H2}>De qué depende el precio</h2>
          <p className={P}>Antes de hablar de números, hay que entender qué hace que un proyecto cueste más o menos:</p>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {[
              { t: "Complejidad del diseño", d: "Un diseño propio con animaciones cuesta más que una plantilla, y suele traer más contactos." },
              { t: "Número de secciones o páginas", d: "Una landing de 5 secciones no cuesta igual que un sitio con 10 páginas internas." },
              { t: "Funcionalidades especiales", d: "Pagos en línea, reservas, conexión con WhatsApp: cada función suma al presupuesto." },
              { t: "SEO incluido o no", d: "Muchas agencias entregan la web sin prepararla para Google. Con el tiempo eso sale caro." },
              { t: "Quién hace el trabajo", d: "Un principiante, un intermediario que subcontrata y un equipo con experiencia no cobran lo mismo ni entregan lo mismo." },
            ].map((item, i) => (
              <li key={item.t} className="grid grid-cols-[2.25rem_1fr] gap-2 py-5">
                <span className="pt-0.5 text-sm tabular-nums text-violet-300" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={P}>
                  <strong className={STRONG}>{item.t}.</strong> {item.d}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <PostFigure
          src="/media/img/process-wireframes.webp"
          alt="Bocetos de una página web en un cuaderno junto a un celular"
          caption="Antes de cotizar, conviene tener claro qué secciones y funciones necesita tu página."
        />

        {/* Sección 2: tipos de proyecto */}
        <section className="space-y-6">
          <h2 id="que-incluye" className={H2}>Qué incluye cada tipo de proyecto</h2>
          <p className={P}>
            Cada proyecto se cotiza según su alcance, por eso no manejamos precios fijos. Esto es lo que normalmente incluye cada tipo de proyecto hecho desde cero:
          </p>

          <div className="space-y-4">
            {priceCards.map((card) => (
              <div key={card.type} className={`${CARD} p-6`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{card.type}</h3>
                  <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-violet-300">Cotización a la medida</span>
                </div>
                <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {card.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[15px] leading-snug text-zinc-300">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-300" aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/10 pt-4 text-[15px] leading-relaxed text-zinc-400">
                  <span className="font-medium text-zinc-200">Ideal para:</span> {card.ideal}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos reales */}
        <section className="space-y-5">
          <h3 className={H3}>Así se ven algunos proyectos que hemos entregado</h3>
          <ul className="grid gap-5 sm:grid-cols-3">
            {projects.map((p) => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block rounded-xl outline-offset-4">
                  <span className="block overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={p.img}
                      alt={`Captura de la página de ${p.name}`}
                      width={1200}
                      height={750}
                      sizes="(min-width: 640px) 240px, 100vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                  <span className="mt-3 block text-[15px] font-semibold text-white group-hover:text-violet-200">{p.name}</span>
                  <span className="block text-sm text-zinc-400">{p.type}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Sección 3 */}
        <section className="space-y-6">
          <h2 id="paginas-baratas" className={H2}>¿Por qué encuentro páginas web tan baratas?</h2>
          <p className={P}>Buena pregunta. Existen básicamente tres situaciones:</p>

          <div className="space-y-4">
            {[
              { n: "01", t: "Plantillas genéricas sin personalización", d: "Te dan una plantilla de WordPress con tu logo y tus colores. Sirve para «tener algo», pero no está pensada para tu negocio ni para que la gente te contacte." },
              { n: "02", t: "Diseñadores sin experiencia", d: "Aprenden con tu proyecto. Cobran poco, pero no sabes cómo va a quedar y después casi nunca hay soporte." },
              { n: "03", t: "Intermediarios que subcontratan", d: "Alguien te vende la web pero la hace otra persona. No controlas la calidad ni los tiempos, y si algo falla nadie responde." },
            ].map((item) => (
              <div key={item.n} className={`${CARD} grid grid-cols-[2.25rem_1fr] gap-2 p-6`}>
                <span className="pt-0.5 text-sm tabular-nums text-violet-300" aria-hidden>{item.n}</span>
                <div>
                  <h3 className="font-semibold tracking-tight text-white">{item.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Advertencia */}
          <aside className="flex gap-4 rounded-2xl border border-amber-300/25 bg-amber-300/[0.05] p-6">
            <AlertTriangle size={20} aria-hidden className="mt-0.5 shrink-0 text-amber-300" />
            <div>
              <p className="font-semibold text-amber-200">Ojo con esto</p>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">
                Una web barata que no trae clientes termina saliendo cara: pagas por algo que no funciona y luego pagas otra vez para rehacerlo. Lo vemos mucho con emprendedores que hacen su primera web.
              </p>
            </div>
          </aside>
        </section>

        {/* Sección 4: alertas */}
        <section className="space-y-6">
          <h2 id="senales-alerta" className={H2}>Señales de alerta al contratar una agencia web</h2>
          <p className={P}>Antes de hacer cualquier pago, verifica estos puntos:</p>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {alerts.map((item) => (
              <li key={item} className="flex items-start gap-4 py-4">
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" aria-hidden />
                <span className={P}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Conclusión */}
        <section className="space-y-5">
          <h2 id="conclusion" className={H2}>Conclusión</h2>
          <p className={P}>
            El precio de una página web en Colombia depende de lo que necesitas y de quién hace el trabajo. Con las ventas en línea creciendo 11,1% en 2025 y solo el 17% de las pymes operando desde su propia web, tener una buena página te pone por delante de muchos competidores.
          </p>
          <p className={P}>
            Más que buscar el precio más bajo, busca un equipo que entienda tu negocio, te hable directo y te entregue una web que te traiga clientes.
          </p>
        </section>

        {/* Fuentes */}
        <section className="space-y-4 border-t border-white/10 pt-10">
          <h2 id="fuentes" className="scroll-mt-28 text-xl font-semibold tracking-tight text-white">Fuentes</h2>
          <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-zinc-400 marker:text-zinc-500">
            <li>
              <Src href={SRC.godaddy}>Portafolio (cifras de GoDaddy, Encuesta Global de Emprendimiento 2025), junio 2025</Src>
            </li>
            <li>
              <Src href={SRC.ccce}>Forbes Colombia (cifras de la Cámara Colombiana de Comercio Electrónico): comercio electrónico en Colombia en 2025, febrero 2026</Src>
            </li>
          </ol>
          <p className="text-sm text-zinc-400">Fuentes consultadas el 18 de noviembre de 2026.</p>
        </section>
      </ArticleLayout>
    </>
  );
}
