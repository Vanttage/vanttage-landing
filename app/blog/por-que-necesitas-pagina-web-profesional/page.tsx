import type { Metadata } from "next";
import type { ReactNode } from "react";
import ArticleLayout from "../_components/ArticleLayout";
import StatQuote, { type Cite } from "../_components/StatQuote";
import BarChart from "../_components/BarChart";
import PostFigure from "../_components/PostFigure";
import Checklist from "../_components/Checklist";
import Src from "../_components/InlineLink";
import { H2, INTRO, P, STRONG } from "../_components/prose";

export const metadata: Metadata = {
  title: "5 señales de que tu página web está perdiendo clientes",
  description:
    "Si tu web tarda en cargar, no se ve bien en el celular o no aparece en Google, estás perdiendo clientes. 5 señales con datos verificados y su fuente, y cómo corregirlas.",
  alternates: { canonical: "https://vanttagetech.com/blog/por-que-necesitas-pagina-web-profesional" },
  openGraph: {
    title: "5 señales de que tu página web está perdiendo clientes",
    description:
      "Una lista con datos verificados para saber si tu web te está haciendo perder clientes, y qué hacer. Actualizado en 2026.",
    url: "https://vanttagetech.com/blog/por-que-necesitas-pagina-web-profesional",
    images: [{ url: "https://vanttagetech.com/media/video/slide-web-poster.webp" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "5 señales de que tu página web está perdiendo clientes",
  description: "5 señales, con datos verificados y su fuente, de que una web está perdiendo clientes y cómo corregirlas.",
  author: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  publisher: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  datePublished: "2025-05-01",
  dateModified: "2026-11-18",
  image: "https://vanttagetech.com/media/video/slide-web-poster.webp",
  mainEntityOfPage: "https://vanttagetech.com/blog/por-que-necesitas-pagina-web-profesional",
};

const SRC = {
  deloitte: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html",
  statcounter: "https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/colombia",
  datareportal: "https://datareportal.com/reports/digital-2026-colombia",
  unbounce: "https://unbounce.com/conversion-benchmark-report/",
  lindgaard: "https://doi.org/10.1080/01449290500330448",
  fogg: "https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility/",
  dreamhost: "https://www.dreamhost.com/blog/dreamhost-2026-local-business-trust-index/",
  backlinko: "https://backlinko.com/google-ctr-stats",
  godaddy: "https://www.portafolio.co/emprendimiento/digitales-pero-con-obstaculos-asi-navegan-las-pymes-colombianas-en-el-entorno-online-631921",
  ccce: "https://forbes.co/tecnologia/comercio-electronico-en-colombia-alcanzo-1454-billones-en-ventas-en-2025",
} as const;

const CITE = {
  deloitte: { who: "Deloitte para Google", work: "Milliseconds Make Millions", year: "2020", href: SRC.deloitte },
  statcounter: { who: "StatCounter", work: "Desktop vs Mobile Market Share Colombia", year: "octubre 2026", href: SRC.statcounter },
  unbounce: { who: "Unbounce", work: "Conversion Benchmark Report", year: "2024", href: SRC.unbounce },
  lindgaard: { who: "Lindgaard et al., Carleton University", work: "Behaviour & Information Technology", year: "2006", href: SRC.lindgaard },
  backlinko: { who: "Backlinko", work: "Google CTR Stats, con datos de Semrush", year: "actualizado 2025", href: SRC.backlinko },
} satisfies Record<string, Cite>;

const signals: {
  number: string;
  title: string;
  body: ReactNode;
  figure: string;
  statText: string;
  note?: string;
  cite: Cite;
  extra?: ReactNode;
  fix: string;
}[] = [
  {
    number: "01",
    title: "Tarda más de 3 segundos en cargar",
    body: (
      <>
        Parece un detalle técnico, pero pesa en las ventas. En un estudio que{" "}
        <Src href={SRC.deloitte}>Deloitte hizo para Google (2020)</Src> con 37 marcas de Europa y Estados Unidos, mejorar 0,1 segundos la velocidad del sitio móvil en todas las páginas del recorrido subió 8,4% las conversiones en tiendas de retail y 9,2% el valor promedio del pedido.
      </>
    ),
    figure: "+8,4%",
    statText: "Subieron las conversiones en tiendas de retail cuando el sitio móvil mejoró 0,1 segundos su velocidad en todo el recorrido.",
    note: "37 marcas de Europa y EE. UU., más de 30 millones de sesiones.",
    cite: CITE.deloitte,
    extra: (
      <PostFigure
        src="/media/img/team-developer.webp"
        alt="Desarrollador revisando el código de una página web en su pantalla"
        caption="La velocidad depende sobre todo de cómo está construida la página. El hosting influye menos."
      />
    ),
    fix: "Una web hecha con tecnología actual (Next.js, por ejemplo) puede cargar en menos de 1,5 segundos. Cada segundo que le quitas a la carga se nota en los contactos que recibes.",
  },
  {
    number: "02",
    title: "No se ve bien en el celular",
    body: (
      <>
        En octubre de 2026, el 58% del tráfico web en Colombia llegó desde teléfonos móviles, según{" "}
        <Src href={SRC.statcounter}>StatCounter</Src>, y el país ya suma 41,7 millones de usuarios de internet (
        <Src href={SRC.datareportal}>DataReportal, Digital 2026</Src>). Si tu página se ve rota, el texto es diminuto o los botones son difíciles de tocar, pierdes a más de la mitad de tus visitantes antes de que lean la primera línea.
      </>
    ),
    figure: "58%",
    statText: "Del tráfico web en Colombia llegó desde teléfonos móviles en octubre de 2026. En el mundo, la cifra fue de 59,9% ese mismo mes.",
    cite: CITE.statcounter,
    extra: (
      <PostFigure
        src="/media/img/product-mobile-payment.webp"
        alt="Persona usando una tienda en línea desde su celular"
      />
    ),
    fix: "Una página responsive bien hecha se adapta a cualquier pantalla. Además de verse bien, tiene que ser igual de fácil de usar en el celular que en el computador.",
  },
  {
    number: "03",
    title: "No tiene un llamado a la acción claro",
    body: (
      <>
        Tu visitante llega, ve información, y luego ¿qué hace? Si no hay un botón claro que diga «Llámanos», «Pide tu cita» o «Escríbenos», se va sin hacer nada. Muchas veces sí le interesaba, pero nadie le dijo qué hacer. Como referencia, el{" "}
        <Src href={SRC.unbounce}>Conversion Benchmark Report 2024 de Unbounce</Src>, con más de 41.000 landing pages analizadas, ubica la conversión mediana en 6,6%. Si tu web está muy por debajo, el llamado a la acción suele ser parte del problema.
      </>
    ),
    figure: "6,6%",
    statText: "Es la tasa mediana de conversión de una landing page. Úsala como punto de comparación para tu propia web.",
    note: "Más de 41.000 landing pages y 464 millones de visitantes.",
    cite: CITE.unbounce,
    fix: "Cada sección debe tener un objetivo y un botón visible. El visitante no debería buscar cómo contactarte: la opción tiene que estar a la mano mientras baja por la página.",
  },
  {
    number: "04",
    title: "El diseño se ve desactualizado",
    body: (
      <>
        Una web vieja manda el mensaje equivocado. Las personas se forman una impresión visual de un sitio en 50 milisegundos (
        <Src href={SRC.lindgaard}>Lindgaard et al., Carleton University, 2006</Src>), y en un estudio de{" "}
        <Src href={SRC.fogg}>Stanford de 2002</Src> el 46,1% de los participantes juzgó la credibilidad de un sitio en parte por su diseño. Son estudios con años encima, y una encuesta reciente apunta a lo mismo: el 69% de los adultos consultados por{" "}
        <Src href={SRC.dreamhost}>DreamHost en Estados Unidos (2026)</Src> dice que un negocio local necesita web para ser creíble.
      </>
    ),
    figure: "50 ms",
    statText: "Bastan para que una persona se forme una impresión visual de una web, y esa impresión coincide con la que tiene después de mirarla con calma.",
    note: "Estudio de 2006.",
    cite: CITE.lindgaard,
    fix: "La idea es que tu negocio se vea serio y confiable desde que la persona abre la página. El diseño es lo primero que ve tu cliente.",
  },
  {
    number: "05",
    title: "No apareces en Google cuando te buscan",
    body: (
      <>
        Según el{" "}
        <Src href={SRC.backlinko}>estudio de CTR de Backlinko</Src> (datos de Semrush, actualizado en 2025), solo el 0,63% de las personas que buscan en Google hace clic en algo de la segunda página, y el primer resultado se lleva en promedio el 27,6% de los clics. Si alguien en tu ciudad busca «restaurante en Cartagena» o «abogado en Medellín» y tu página no aparece arriba, ese cliente nunca se entera de que existes.
      </>
    ),
    figure: "0,63%",
    statText: "De las personas que buscan en Google hace clic en algún resultado de la segunda página.",
    cite: CITE.backlinko,
    extra: (
      <BarChart
        title="Porcentaje de clics en Google"
        bars={[
          { label: "Primer resultado", value: 27.6, display: "27,6%", highlight: true },
          { label: "Toda la segunda página", value: 0.63, display: "0,63%" },
        ]}
        max={30}
        cite={CITE.backlinko}
      />
    ),
    fix: "El SEO básico bien implementado (velocidad, estructura, palabras clave locales) ya te pone por encima de la mayoría de tu competencia local. No necesitas un presupuesto enorme para empezar a aparecer.",
  },
];

const sources = [
  { label: "Deloitte (encargado por Google): Milliseconds Make Millions, 2020", href: SRC.deloitte },
  { label: "StatCounter: Desktop vs Mobile vs Tablet Market Share Colombia, octubre 2026", href: SRC.statcounter },
  { label: "DataReportal: Digital 2026 Colombia (datos de octubre de 2025)", href: SRC.datareportal },
  { label: "Unbounce: Conversion Benchmark Report 2024", href: SRC.unbounce },
  { label: "Lindgaard, G. et al.: Attention web designers: You have 50 milliseconds to make a good first impression! Behaviour & Information Technology, 2006", href: SRC.lindgaard },
  { label: "Fogg, B.J. et al.: How Do People Evaluate a Web Site's Credibility? Stanford y Consumer WebWatch, 2002", href: SRC.fogg },
  { label: "DreamHost: 2026 Local Business Trust Index (1.201 adultos en EE. UU., noviembre de 2025)", href: SRC.dreamhost },
  { label: "Backlinko: Google CTR Stats (actualizado en abril de 2025)", href: SRC.backlinko },
  { label: "Portafolio (cifras de GoDaddy, Encuesta Global de Emprendimiento 2025), junio 2025", href: SRC.godaddy },
  { label: "Forbes Colombia (cifras de la Cámara Colombiana de Comercio Electrónico), febrero 2026", href: SRC.ccce },
];

const toc = [
  ...signals.map((s) => ({ id: `senal-${s.number}`, label: s.title })),
  { id: "renovar", label: "¿Cuándo renovar tu página?" },
  { id: "fuentes", label: "Fuentes" },
];

export default function Post() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        slug="por-que-necesitas-pagina-web-profesional"
        lead="Una lista con datos verificados para saber si tu web te está ayudando a vender o te está haciendo perder clientes."
        toc={toc}
        cta={{
          title: "Revisamos tu página web sin costo",
          text: "Mándanos el enlace de tu web actual y te decimos qué está fallando y cómo lo arreglaríamos. Trabajamos desde Cartagena con clientes de cualquier país.",
          button: "Quiero que revisen mi web",
        }}
      >
        {/* Intro */}
        <div className={INTRO}>
          <p>
            Tener página web ayuda, pero lo que cuenta es tener una que <strong className={STRONG}>funcione de verdad</strong>: que aparezca en Google, que se entienda rápido y que la gente termine escribiéndote.
          </p>
          <p>
            Un ejemplo de lo que está en juego: en Colombia, solo el 17% de las pymes opera principalmente desde su propio sitio web (
            <Src href={SRC.godaddy}>GoDaddy, Encuesta Global de Emprendimiento 2025</Src>), mientras los colombianos hicieron 684,6 millones de compras en línea en 2025 (
            <Src href={SRC.ccce}>Cámara Colombiana de Comercio Electrónico</Src>). Ahí, entre los que buscan y los negocios que no aparecen, se pierden muchos clientes. Estas son las 5 señales más comunes, con datos, de que tu web te está haciendo perder ventas sin que lo notes.
          </p>
        </div>

        {/* Señales */}
        {signals.map((signal) => (
          <section key={signal.number} className="space-y-6 border-t border-white/10 pt-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">Señal {signal.number}</p>
              <h2 id={`senal-${signal.number}`} className={`${H2} mt-3`}>
                {signal.title}
              </h2>
            </div>

            <p className={P}>{signal.body}</p>

            <StatQuote figure={signal.figure} text={signal.statText} note={signal.note} cite={signal.cite} />

            {signal.extra}

            <div className="border-l-2 border-violet-300/60 pl-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">Cómo solucionarlo</p>
              <p className={`${P} mt-2`}>{signal.fix}</p>
            </div>
          </section>
        ))}

        {/* ¿Cuándo renovar? */}
        <section className="space-y-5 border-t border-white/10 pt-12">
          <h2 id="renovar" className={H2}>¿Cuándo es el momento de renovar tu página?</h2>
          <p className={P}>
            Si reconociste 2 o más señales de esta lista, tu web actual te está costando clientes cada semana. Renovarla suele ser más rápido y más barato de lo que la gente cree.
          </p>
          <p className={P}>
            Un buen rediseño te deja una web que recibe clientes a cualquier hora, también cuando estás cerrado. Y con las ventas en línea en crecimiento (en Colombia subieron 11,1% en 2025, según la{" "}
            <Src href={SRC.ccce}>CCCE</Src>), cada mes que esperas lo aprovecha tu competencia.
          </p>
        </section>

        <Checklist
          items={[
            "¿Carga en menos de 3 segundos en tu celular?",
            "¿Se ve y funciona bien en una pantalla pequeña?",
            "¿Hay un botón o forma de contacto visible en cada sección?",
            "¿El diseño se ve serio y da confianza?",
            "¿Apareces en Google cuando alguien busca tu servicio en tu ciudad?",
          ]}
        />

        {/* Fuentes */}
        <section className="space-y-4 border-t border-white/10 pt-10">
          <h2 id="fuentes" className="scroll-mt-28 text-xl font-semibold tracking-tight text-white">Fuentes</h2>
          <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-zinc-400 marker:text-zinc-500">
            {sources.map((src) => (
              <li key={src.href}>
                <Src href={src.href}>{src.label}</Src>
              </li>
            ))}
          </ol>
          <p className="text-sm text-zinc-400">Fuentes consultadas el 18 de noviembre de 2026.</p>
        </section>
      </ArticleLayout>
    </>
  );
}
