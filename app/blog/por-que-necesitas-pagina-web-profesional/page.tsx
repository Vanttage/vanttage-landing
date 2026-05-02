import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "5 señales de que tu página web está perdiendo clientes",
  description:
    "Si tu web tarda en cargar, no se ve bien en celular o no aparece en Google, estás perdiendo clientes cada día. 5 señales con datos reales 2024-2025 y cómo solucionarlas.",
  alternates: { canonical: "https://vanttagetech.com/blog/por-que-necesitas-pagina-web-profesional" },
  openGraph: {
    title: "5 señales de que tu página web está perdiendo clientes",
    description:
      "Checklist con datos reales 2025 para saber si tu web está saboteando tu negocio — y qué hacer al respecto.",
    url: "https://vanttagetech.com/blog/por-que-necesitas-pagina-web-profesional",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "5 señales de que tu página web está perdiendo clientes",
  description: "5 señales con datos reales 2024-2025 sobre webs que pierden clientes y cómo solucionarlas.",
  author: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  publisher: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  datePublished: "2025-05-01",
  dateModified: "2025-05-01",
  mainEntityOfPage: "https://vanttagetech.com/blog/por-que-necesitas-pagina-web-profesional",
};

const signals = [
  {
    number: "01",
    title: "Tarda más de 3 segundos en cargar",
    body: "Parece un detalle técnico, pero tiene un impacto brutal en tu negocio. Cada segundo adicional de carga aumenta la tasa de abandono en un 32% (Google, 2024). Y cada mejora de 0.1 segundos en velocidad puede aumentar tus conversiones un 8%, según un estudio de Deloitte con tiendas de retail.",
    stat: "32% más de abandono por cada segundo extra de carga — Google 2024",
    source: "Google / Deloitte, 2024",
    fix: "Una web moderna construida con tecnología actual (Next.js, por ejemplo) carga en menos de 1.5 segundos. La velocidad no es un lujo técnico — es dinero directo.",
  },
  {
    number: "02",
    title: "No se ve bien en el celular",
    body: "En Colombia, el 68% del tráfico web llega desde dispositivos móviles y el 90% de los colombianos navega desde su smartphone (DataReportal, enero 2025). Si tu página se ve rota, el texto es diminuto o los botones son difíciles de tocar, estás expulsando a 7 de cada 10 visitantes antes de que lean tu primera línea.",
    stat: "90% de los colombianos navega desde smartphone — DataReportal 2025",
    source: "DataReportal, enero 2025",
    fix: "Una página responsive bien diseñada se adapta perfectamente a cualquier pantalla. No basta con que «se vea», tiene que funcionar igual de bien en móvil que en computador.",
  },
  {
    number: "03",
    title: "No tiene un llamado a la acción claro",
    body: "Tu visitante llega, ve información, y luego… ¿qué hace? Si no hay un botón claro que diga «Llámanos», «Pide tu cita» o «Escríbenos», el usuario se va sin hacer nada — no porque no le interese, sino porque no le dijiste qué hacer. Las páginas con un CTA claro y visible convierten hasta 3 veces más que las que no lo tienen.",
    stat: "Las páginas con CTA claro convierten hasta 3× más",
    source: "HubSpot Research, 2024",
    fix: "Cada sección debe tener un objetivo y un botón visible. El visitante no debería tener que buscar cómo contactarte — debería tropezarse con la opción en cada scroll.",
  },
  {
    number: "04",
    title: "El diseño se ve desactualizado",
    body: "Una web vieja manda el mensaje equivocado. Los usuarios tardan apenas 50 milisegundos en formarse una primera impresión visual de tu sitio (Universidad de Carleton, estudio Lindgaard). Y el 75% juzga la credibilidad de un negocio basándose en cómo se ve su página web (Universidad de Stanford). Un diseño del 2015 genera desconfianza — aunque tu servicio sea excelente.",
    stat: "50 milisegundos para la primera impresión visual — Universidad de Carleton",
    source: "Lindgaard et al. / Stanford University",
    fix: "No se trata de estar a la moda. Se trata de transmitir profesionalismo y confianza desde el primer instante. El diseño es el traje con que tu negocio recibe a cada cliente.",
  },
  {
    number: "05",
    title: "No apareces en Google cuando te buscan",
    body: "El 91.5% de los usuarios nunca pasa de la primera página de Google (2025). Si alguien en tu ciudad busca «restaurante en Cartagena» o «abogado en Medellín» y tu página no aparece, simplemente no existes para ese cliente. Y con el 88% de los adultos colombianos comprando o buscando servicios en línea, cada día sin visibilidad en Google es un día regalando clientes a tu competencia.",
    stat: "91.5% de usuarios nunca pasa de la primera página de Google — 2025",
    source: "Backlinko / Reputation911, 2025",
    fix: "El SEO básico bien implementado (velocidad, estructura, palabras clave locales) ya te pone por encima de la mayoría de tu competencia local. No necesitas un presupuesto enorme para empezar a aparecer.",
  },
];

export default function Post() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#F8FAFC]">

        {/* ── Header ── */}
        <section className="relative overflow-hidden bg-[#061729] px-6 pb-20 pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-violet-500/15 blur-[140px]" />
            <div className="absolute -right-[5%] bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
              <ArrowLeft size={15} /> Volver al blog
            </Link>
            <span className="inline-block rounded-full bg-violet-500/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-400">
              Consejos &amp; Estrategia
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              5 señales de que tu página web está perdiendo clientes
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              Un checklist con datos reales 2025 para saber si tu web está trabajando para ti — o en tu contra.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/35">
              <span>Mayo 2025</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>5 min de lectura</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Por Vanttage</span>
            </div>
          </div>
        </section>

        {/* ── Artículo ── */}
        <article className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-10">

            {/* Intro */}
            <div className="space-y-4 text-lg leading-relaxed text-[#475569]">
              <p>
                Tener una página web no es suficiente. Tener una que{" "}
                <strong className="text-[#0A2540]">funcione de verdad</strong> — que aparezca en Google, convenza al visitante y lo lleve a contactarte — es otra historia completamente diferente.
              </p>
              <p>
                En Colombia, solo el 17% de las PYMEs tiene sitio web propio (GoDaddy, 2025), mientras el 88% de los adultos colombianos ya busca y compra en línea. Esa brecha es exactamente donde se pierden los clientes. Estas son las 5 señales más comunes — con datos reales — de que tu web está saboteando tu negocio sin que lo notes.
              </p>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Señales */}
            <div className="space-y-12">
              {signals.map((signal) => (
                <div key={signal.number} className="space-y-4">

                  {/* Número + título */}
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white shadow-md shadow-violet-500/25">
                      {signal.number}
                    </span>
                    <h2 className="mt-1.5 text-xl font-semibold text-[#0A2540] md:text-2xl">
                      {signal.title}
                    </h2>
                  </div>

                  {/* Cuerpo */}
                  <p className="leading-relaxed text-[#475569]">{signal.body}</p>

                  {/* Stat — gradiente */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 shadow-md shadow-violet-500/20">
                    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative flex items-start gap-3">
                      <TrendingUp size={16} className="mt-0.5 shrink-0 text-white/70" />
                      <div>
                        <p className="text-sm font-semibold text-white">{signal.stat}</p>
                        <p className="mt-0.5 text-[11px] text-white/50">Fuente: {signal.source}</p>
                      </div>
                    </div>
                  </div>

                  {/* Fix */}
                  <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" />
                    <p className="text-sm leading-relaxed text-[#475569]">
                      <strong className="text-[#0A2540]">Cómo solucionarlo: </strong>
                      {signal.fix}
                    </p>
                  </div>

                  <div className="h-px bg-gray-200" />
                </div>
              ))}
            </div>

            {/* ¿Cuándo renovar? */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0A2540]">¿Cuándo es el momento de renovar tu página?</h2>
              <p className="leading-relaxed text-[#475569]">
                Si identificaste 2 o más señales en esta lista, tu web actual te está costando clientes reales cada semana. La buena noticia: modernizarla es más rápido y accesible de lo que imaginas.
              </p>
              <p className="leading-relaxed text-[#475569]">
                Un rediseño bien hecho no es solo una web nueva — es una herramienta de ventas que trabaja por ti las 24 horas del día. Y con el e-commerce colombiano creciendo un 26.7% en 2024, cada mes que esperas es mercado que se lleva la competencia.
              </p>
            </div>

            {/* Checklist */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />
              <div className="p-6">
                <p className="font-semibold text-[#0A2540]">Evalúa tu web ahora mismo:</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "¿Carga en menos de 3 segundos en tu celular?",
                    "¿Se ve y funciona perfectamente en pantalla pequeña?",
                    "¿Hay un botón o forma de contacto visible en cada sección?",
                    "¿El diseño transmite profesionalismo y confianza?",
                    "¿Apareces en Google cuando alguien busca tu servicio en tu ciudad?",
                  ].map((q) => (
                    <li key={q} className="flex items-center gap-3 border-b border-gray-100 pb-3 text-sm text-[#475569] last:border-0 last:pb-0">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-violet-200 bg-violet-50 text-[10px] font-bold text-violet-400">
                        ?
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm text-[#64748B]">
                  Si respondiste <strong className="text-[#0A2540]">NO</strong> a alguna de estas preguntas, estás perdiendo clientes hoy.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-center shadow-2xl shadow-violet-500/25">
              <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">Sin compromiso</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Revisamos tu página web gratis</h3>
                <p className="mx-auto mt-3 max-w-sm text-white/70">
                  Cuéntanos cuál es tu web actual y te decimos exactamente qué está fallando y cómo solucionarlo.
                </p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-violet-600 shadow-lg transition hover:scale-[1.04]"
                >
                  Quiero que revisen mi web <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Volver */}
            <div className="border-t border-gray-200 pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-violet-500 transition hover:text-violet-700">
                <ArrowLeft size={14} /> Ver todos los artículos
              </Link>
            </div>

          </div>
        </article>
      </main>
    </>
  );
}
