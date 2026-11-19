import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { breadcrumbSchema } from "@/app/lib/schema";
import ArticleLayout from "../_components/ArticleLayout";
import StatQuote, { type Cite } from "../_components/StatQuote";
import BarChart from "../_components/BarChart";
import AudienceTabs from "../_components/AudienceTabs";
import PostFigure from "../_components/PostFigure";
import InlineLink from "../_components/InlineLink";
import { H2, H3, INTRO, P } from "../_components/prose";

const URL = "https://vanttagetech.com/blog/estadisticas-paginas-web-pymes-2026";
const TITLE = "Datos que muestran por qué tu negocio necesita página web (2026)";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Cifras verificadas y con fuente para marcas personales y pymes: alcance real en redes, credibilidad, ventas en línea, landing pages y la oportunidad del contenido en español.",
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description:
      "Estadísticas con fuente a la vista sobre por qué una marca personal o una pyme necesita página web propia en 2026.",
    url: URL,
    images: [{ url: "https://vanttagetech.com/media/img/product-dashboard.webp", width: 1600, height: 1066 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description:
    "Estadísticas verificadas sobre credibilidad, ventas en línea, landing pages y contenido en español para marcas personales y pymes.",
  image: "https://vanttagetech.com/media/img/product-dashboard.webp",
  author: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  publisher: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  datePublished: "2026-11-18",
  dateModified: "2026-11-18",
  mainEntityOfPage: URL,
};

/* ── Fuentes (una sola vez, se reutilizan en citas, tabla y lista final) ── */
const C = {
  socialinsider: { who: "Socialinsider", work: "Instagram Benchmarks", year: "datos 2025", href: "https://www.socialinsider.io/social-media-benchmarks/instagram" },
  wix: { who: "Wix", work: "The State of Websites Report", year: "2026", href: "https://www.wix.com/data/state-of-websites" },
  dreamhost: { who: "DreamHost", work: "Local Business Trust Index", year: "2026", href: "https://www.dreamhost.com/blog/dreamhost-2026-local-business-trust-index/" },
  ccce: { who: "Cámara Colombiana de Comercio Electrónico", year: "2026", via: "Forbes Colombia", href: "https://forbes.co/tecnologia/comercio-electronico-en-colombia-alcanzo-1454-billones-en-ventas-en-2025" },
  unbounce: { who: "Unbounce", work: "Conversion Benchmark Report", year: "2024", href: "https://unbounce.com/conversion-benchmark-report/" },
  hubspot: { who: "HubSpot", work: "Why You Need to Create More Landing Pages", year: "2012, actualizado 2025", href: "https://blog.hubspot.com/blog/tabid/6307/bid/33756/why-you-yes-you-need-to-create-more-landing-pages.aspx" },
  backlinko: { who: "Backlinko", work: "Google CTR Stats, con datos de Semrush", year: "actualizado 2025", href: "https://backlinko.com/google-ctr-stats" },
  w3techs: { who: "W3Techs", work: "Content languages for websites", year: "noviembre 2026", href: "https://w3techs.com/technologies/overview/content_language" },
  cervantes: { who: "Instituto Cervantes", work: "El español en el mundo", year: "2026", via: "Diario del Sur", href: "https://diariodelsur.com.co/noticias/el-instituto-cervantes-cifra-en-640-millones-los-hablantes-de-espanol" },
  godaddy: { who: "GoDaddy", work: "Encuesta Global de Emprendimiento", year: "2025", via: "Portafolio", href: "https://www.portafolio.co/emprendimiento/digitales-pero-con-obstaculos-asi-navegan-las-pymes-colombianas-en-el-entorno-online-631921" },
  statcounter: { who: "StatCounter", work: "Desktop vs Mobile Market Share Colombia", year: "octubre 2026", href: "https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/colombia" },
  fogg: { who: "Stanford Web Credibility Project (Fogg et al.)", work: "How Do People Evaluate a Web Site's Credibility?", year: "2002", via: "Consumer WebWatch", href: "https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility/" },
  lindgaard: { who: "Lindgaard et al., Carleton University", work: "Behaviour & Information Technology", year: "2006", href: "https://doi.org/10.1080/01449290500330448" },
  verisign: { who: "Verisign", work: "Online Survey", year: "2015", href: "https://blog.verisign.com/getting-online/verisign-2015-online-survey-97-percent-of-smbs-would-recommend-having-a-website-to-other-smbs/" },
} satisfies Record<string, Cite>;

function Src({ c, children }: { c: Cite; children: ReactNode }) {
  return <InlineLink href={c.href}>{children}</InlineLink>;
}

const table: { dato: string; c: Cite }[] = [
  { dato: "0,48% de interacción promedio por publicación de marca en Instagram (sobre seguidores, 2025)", c: C.socialinsider },
  { dato: "13% del tráfico de los sitios Wix viene de redes sociales; 42% de buscadores y 40% directo", c: C.wix },
  { dato: "69% dice que un negocio local necesita web para ser creíble; 39% ha dejado de comprarle a un negocio sin web (1.201 adultos en EE. UU.)", c: C.dreamhost },
  { dato: "46,1% de los participantes juzgó la credibilidad de un sitio en parte por su diseño", c: C.fogg },
  { dato: "50 milisegundos bastan para formarse una impresión visual de una web", c: C.lindgaard },
  { dato: "$145,4 billones de pesos en ventas en línea en Colombia en 2025 (+11,1%) y 684,6 millones de compras", c: C.ccce },
  { dato: "17% de las pymes colombianas opera principalmente desde su propia web; 37% desde redes sociales", c: C.godaddy },
  { dato: "6,6% de conversión mediana en landing pages (más de 41.000 páginas)", c: C.unbounce },
  { dato: "10 a 15 landing pages: 55% más conversiones que menos de 10 (correlación)", c: C.hubspot },
  { dato: "0,63% de quienes buscan en Google hace clic en la segunda página de resultados", c: C.backlinko },
  { dato: "58% del tráfico web en Colombia llegó desde celulares en octubre de 2026", c: C.statcounter },
  { dato: "6,0% de los sitios web está en español frente a 49,5% en inglés", c: C.w3techs },
  { dato: "Unos 640 millones de hablantes de español en el mundo", c: C.cervantes },
];

const citeText = (c: Cite) => `${c.who}${c.work ? `, ${c.work}` : ""} (${c.year})${c.via ? `, vía ${c.via}` : ""}`;

/* ── Contenido de cada pestaña ── */
const personal = (
  <div className="space-y-6">
    <h2 className={H2}>Tus seguidores no son tu audiencia</h2>
    <p className={P}>
      Si eres coach, consultor, fotógrafo, médico o creador de contenido, es probable que Instagram o TikTok sean tu vitrina principal. El problema es que esa vitrina la controla otra empresa, y el algoritmo decide cuántos de tus seguidores ven cada publicación.
    </p>
    <StatQuote
      figure="0,48%"
      text="Fue la interacción promedio de una publicación de marca en Instagram en 2025, medida sobre el total de seguidores. Bajó desde 0,50% en 2024. De cada 1.000 seguidores, menos de 5 dan me gusta o comentan."
      note="Muestra: más de 67 millones de publicaciones de 579.000 cuentas de marca."
      cite={C.socialinsider}
    />
    <p className={P}>
      Una página web con tu dominio es un espacio donde nadie decide por ti quién ve tu trabajo: ahí puedes recoger correos, mostrar tu portafolio completo y recibir solicitudes de clientes. Las redes siguen sirviendo para que te descubran, pero el tráfico grande de un sitio viene de otro lado.
    </p>
    <BarChart
      title="¿De dónde llegan las visitas a un sitio web?"
      bars={[
        { label: "Buscadores", value: 42, display: "42%" },
        { label: "Directo (escriben tu dirección o tienen el enlace)", value: 40, display: "40%" },
        { label: "Redes sociales", value: 13, display: "13%", highlight: true },
      ]}
      max={50}
      note="Promedio de los sitios en la plataforma Wix. En portafolios, blogs y fotografía las redes suben a 18%."
      cite={C.wix}
    />
    <h3 className={H3}>La primera impresión también cuenta para ti</h3>
    <p className={P}>
      Cuando alguien escucha tu nombre y te busca en Google, lo que encuentra define si te escribe o no. Dos estudios clásicos lo midieron. Tienen años encima, y por eso lo decimos al lado de cada cifra.
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      <StatQuote
        figure="50 ms"
        text="Es lo que tarda una persona en formarse una opinión sobre el aspecto de una web. Esa opinión coincide con la que tiene después de mirarla con calma."
        note="Estudio de 2006."
        cite={C.lindgaard}
      />
      <StatQuote
        figure="46,1%"
        text="De los participantes juzgó la credibilidad de un sitio en parte por su diseño visual. Fue el criterio más mencionado."
        note="Estudio de 2002 con 2.684 personas."
        cite={C.fogg}
        delay={0.1}
      />
    </div>
  </div>
);

const pyme = (
  <div className="space-y-6">
    <h2 className={H2}>La web como prueba de que tu negocio existe</h2>
    <p className={P}>
      Antes de comprarle a un negocio que no conoce, la gente lo busca. Si no encuentra una página, duda. Una encuesta reciente lo puso en números:
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      <StatQuote
        figure="69%"
        text="Dice que un negocio local necesita página web para ser creíble."
        note="Encuesta a 1.201 adultos en EE. UU., noviembre de 2025. La hizo una empresa de hosting: tómala como referencia."
        cite={C.dreamhost}
      />
      <StatQuote
        figure="39%"
        text="Ha dejado de visitar o comprarle a un negocio porque no tenía página web."
        note="Misma encuesta."
        cite={C.dreamhost}
        delay={0.1}
      />
    </div>

    <h3 className={H3}>La gente ya compra por internet</h3>
    <p className={P}>
      Colombia sirve de ejemplo de cómo crece el comercio en línea en la región. Allí las ventas por internet se multiplicaron por cuatro desde 2019, mientras pocas pymes tienen un canal propio para recibirlas.
    </p>
    <BarChart
      title="Ventas en línea en Colombia (billones de pesos)"
      bars={[
        { label: "2019", value: 35.8, display: "$35,8" },
        { label: "2024", value: 130.9, display: "$130,9" },
        { label: "2025", value: 145.4, display: "$145,4", highlight: true },
      ]}
      note="En 2025 se hicieron 684,6 millones de compras en línea, 11,1% más en valor que en 2024."
      cite={C.ccce}
    />
    <StatQuote
      figure="17%"
      text="De las pymes colombianas opera principalmente desde su propio sitio web. El 37% se apoya sobre todo en redes sociales."
      note="Encuesta a 3.504 dueños de pequeños negocios en 11 países, enero de 2025."
      cite={C.godaddy}
    />
    <PostFigure
      src="/media/img/product-mobile-payment.webp"
      alt="Persona pagando una compra en línea desde el celular"
      caption="En octubre de 2026, el 58% del tráfico web en Colombia vino de celulares (StatCounter)."
    />

    <h3 className={H3}>Landing pages: una página por cada cosa que vendes</h3>
    <p className={P}>
      Una landing page es una página enfocada en una sola oferta y un solo botón. Sirve para medir si tu web está haciendo su trabajo.
    </p>
    <div className="grid gap-4 sm:grid-cols-2">
      <StatQuote
        figure="6,6%"
        text="Es la tasa mediana de conversión de una landing page. Si de cada 100 visitas menos de 2 te escriben, hay algo por mejorar."
        note="Más de 41.000 landing pages y 464 millones de visitantes."
        cite={C.unbounce}
      />
      <StatQuote
        figure="+55%"
        text="Más conversiones en sitios con 10 a 15 landing pages frente a los que tenían menos de 10."
        note="Dato publicado en 2012 y basado en una correlación, no en una prueba controlada."
        cite={C.hubspot}
        delay={0.1}
      />
    </div>

    <h3 className={H3}>Si no estás en la primera página de Google, casi no existes</h3>
    <StatQuote
      figure="0,63%"
      text="De las personas que buscan en Google hace clic en algo de la segunda página. El primer resultado se lleva en promedio el 27,6% de los clics."
      cite={C.backlinko}
    />

    <h3 className={H3}>La oportunidad de escribir en español</h3>
    <p className={P}>
      Hay mucha gente buscando en español y relativamente poco contenido para responderle. Para cualquier negocio que venda en español, esté en Bogotá, Ciudad de México, Madrid o Miami, eso es terreno ganado.
    </p>
    <BarChart
      title="Idioma de los sitios web del mundo"
      bars={[
        { label: "Inglés", value: 49.5, display: "49,5%" },
        { label: "Español", value: 6.0, display: "6,0%", highlight: true },
      ]}
      max={60}
      note="Sobre los sitios con idioma identificado. Mientras tanto, el Instituto Cervantes estima unos 640 millones de hablantes de español en 2026."
      cite={C.w3techs}
    />
  </div>
);

const discarded: { q: string; a: ReactNode }[] = [
  {
    q: "«El 75% juzga la credibilidad de una empresa por el diseño de su web (Stanford)»",
    a: (
      <>
        No encontramos ese porcentaje en el estudio de Stanford. Lo que reporta el estudio de 2002 es 46,1%, y es el que citamos arriba (
        <Src c={C.fogg}>Fogg et al., 2002</Src>).
      </>
    ),
  },
  {
    q: "«El 84% cree que un negocio con web es más creíble que uno con solo redes sociales»",
    a: (
      <>
        Viene de una <Src c={C.verisign}>encuesta de Verisign de 2015</Src> en Estados Unidos. Preferimos la de DreamHost, que es de finales de 2025.
      </>
    ),
  },
  {
    q: "«El 97% dice que las webs influyen en sus compras», «las pymes con web crecen 15% a 50%», «el 91% visita una tienda física después de ver una web»",
    a: <>Aparecen en recopilaciones sin un estudio original identificable, o con un dato de hace más de quince años. Las dejamos por fuera.</>,
  },
];

const toc = [
  { id: "por-caso", label: "Marca personal o pyme" },
  { id: "tabla", label: "Todos los datos en una tabla" },
  { id: "descartadas", label: "Cifras que circulan y no usamos" },
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
              { name: "Datos sobre páginas web para negocios", path: "/blog/estadisticas-paginas-web-pymes-2026" },
            ]),
          ),
        }}
      />
      <ArticleLayout
        slug="estadisticas-paginas-web-pymes-2026"
        lead="Cifras revisadas una por una, con su fuente y su año, para marcas personales y pymes que todavía dependen solo de redes sociales."
        toc={toc}
        cta={{
          title: "¿Tu negocio o tu marca todavía vive solo en redes?",
          text: "Hacemos páginas web, tiendas virtuales y aplicaciones web para pymes y marcas personales. Trabajamos desde Cartagena con clientes de cualquier país. Cuéntanos qué necesitas y te enviamos una cotización clara.",
          button: "Pedir cotización",
        }}
      >
        {/* Intro */}
        <div className={INTRO}>
          <p>
            En internet circulan muchas estadísticas sobre páginas web. Varias son de hace más de diez años, otras citan un estudio que no dice lo que les atribuyen y algunas no tienen fuente. Para este artículo revisamos cada cifra contra su origen.
          </p>
          <p>
            Debajo de cada dato verás quién lo publicó y de qué año es. Cuando un estudio es viejo o la encuesta es de otro país, lo decimos. Elige tu caso:
          </p>
        </div>

        <div id="por-caso" className="scroll-mt-28">
          <AudienceTabs
            tabs={[
              { label: "Marca personal", content: personal },
              { label: "Pyme", content: pyme },
            ]}
          />
        </div>

        {/* Tabla */}
        <section className="space-y-6 border-t border-white/10 pt-12">
          <h2 id="tabla" className={H2}>Todos los datos en una tabla</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10" tabIndex={0} role="region" aria-label="Tabla de datos y fuentes">
            <table className="w-full min-w-[560px] text-left text-[15px]">
              <caption className="sr-only">Estadísticas citadas en este artículo y su fuente</caption>
              <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-[0.2em] text-zinc-400">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">Dato</th>
                  <th scope="col" className="px-5 py-3 font-medium">Fuente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {table.map((row) => (
                  <tr key={row.dato}>
                    <td className="px-5 py-4 align-top leading-relaxed text-zinc-300">{row.dato}</td>
                    <td className="px-5 py-4 align-top text-sm leading-relaxed">
                      <Src c={row.c}>{citeText(row.c)}</Src>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cifras descartadas */}
        <section className="space-y-6">
          <h2 id="descartadas" className={H2}>Cifras que circulan y no usamos</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {discarded.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 rounded-lg py-4 text-[15px] font-medium leading-snug text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown size={16} className="mt-1 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <p className="pb-5 text-[15px] leading-relaxed text-zinc-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Fuentes */}
        <section className="space-y-4 border-t border-white/10 pt-10">
          <h2 id="fuentes" className="scroll-mt-28 text-xl font-semibold tracking-tight text-white">Fuentes</h2>
          <ol className="list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-zinc-400 marker:text-zinc-500">
            {Object.values(C).map((c) => (
              <li key={c.href}>
                <Src c={c}>{citeText(c)}</Src>
                {c === C.verisign && " (citada solo para explicar por qué no usamos el 84%)"}
              </li>
            ))}
          </ol>
          <p className="text-sm text-zinc-400">Fuentes consultadas el 18 de noviembre de 2026.</p>
        </section>
      </ArticleLayout>
    </>
  );
}
