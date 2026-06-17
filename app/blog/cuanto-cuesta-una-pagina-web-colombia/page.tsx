import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { breadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "¿Cuánto cuesta una página web en Colombia en 2025?",
  description:
    "Guía 2025: qué determina el precio de una página web en Colombia, qué incluye cada tipo de proyecto (institucional, tienda virtual, rediseño y apps) y cómo no caer en manos equivocadas.",
  alternates: { canonical: "https://vanttagetech.com/blog/cuanto-cuesta-una-pagina-web-colombia" },
  openGraph: {
    title: "¿Cuánto cuesta una página web en Colombia en 2025?",
    description:
      "Qué determina el precio, qué incluye cada tipo de proyecto y señales de alerta al contratar. Guía honesta para dueños de negocios colombianos.",
    url: "https://vanttagetech.com/blog/cuanto-cuesta-una-pagina-web-colombia",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "¿Cuánto cuesta una página web en Colombia en 2025?",
  description: "Qué determina el precio de una página web en Colombia y qué incluye cada tipo de proyecto. Guía 2025.",
  author: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  publisher: { "@type": "Organization", name: "Vanttage", url: "https://vanttagetech.com" },
  datePublished: "2025-05-01",
  dateModified: "2025-05-01",
  mainEntityOfPage: "https://vanttagetech.com/blog/cuanto-cuesta-una-pagina-web-colombia",
};

const priceCards = [
  {
    type: "Página web institucional / landing page",
    includes: [
      "Diseño 100% adaptado a tu marca",
      "Hasta 6–8 secciones de contenido",
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
      <main className="min-h-screen bg-[#F8FAFC]">

        {/* ── Header ── */}
        <section className="relative overflow-hidden bg-[#061729] px-6 pb-20 pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-[10%] top-[10%] h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.16), transparent)" }} />
            <div className="absolute -right-[5%] bottom-0 h-[300px] w-[300px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.12), transparent)" }} />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
              <ArrowLeft size={15} /> Volver al blog
            </Link>
            <span className="inline-block rounded-full bg-violet-500/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-400">
              Precios &amp; Presupuesto
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              ¿Cuánto cuesta una página web en Colombia en 2025?
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              La guía honesta que nadie te da: qué determina el precio, qué incluye cada tipo de proyecto y cómo no caer en manos equivocadas.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/35">
              <span>Mayo 2025</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>6 min de lectura</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Por Vanttage</span>
            </div>
          </div>
        </section>

        {/* ── Cuerpo ── */}
        <article className="px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-10">

            {/* Intro */}
            <div className="space-y-4 text-lg leading-relaxed text-[#475569]">
              <p>
                Es la pregunta que casi todos hacen antes de contactar a una agencia:{" "}
                <strong className="text-[#0A2540]">¿cuánto me va a costar?</strong> Y tiene todo el sentido preguntarla. El problema es que en internet encuentras respuestas que varían muchísimo de un lado a otro — y ninguna te explica el porqué.
              </p>
              <p>
                Dato que pocos mencionan: según cifras de 2024, <strong className="text-[#0A2540]">solo el 17% de las PYMEs en Colombia tiene sitio web propio</strong>. El 83% que no tiene — o tiene algo que no funciona — está regalando clientes a sus competidores que sí invierten en presencia digital.
              </p>
            </div>

            {/* Stat destacado */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-lg shadow-violet-500/20">
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <TrendingUp size={22} className="mt-0.5 shrink-0 text-white/80" />
                <div>
                  <p className="font-semibold">El e-commerce en Colombia creció un 26.7% en 2024</p>
                  <p className="mt-1 text-sm text-white/70">
                    Llegando a $26.300 millones de dólares en ventas online. Los negocios con presencia digital capturaron ese crecimiento. Los que no tienen web — no.
                    <span className="ml-2 text-white/40 text-xs">— Impacto TIC / CCCE, 2025</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Sección 1 */}
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-[#0A2540]">Los factores que realmente determinan el precio</h2>
              <p className="leading-relaxed text-[#475569]">Antes de hablar de números, hay que entender qué hace que un proyecto cueste más o menos:</p>
              <ul className="space-y-3">
                {[
                  { t: "Complejidad del diseño", d: "Diseño único y animaciones vale más que una plantilla. Pero también convierte mejor." },
                  { t: "Número de secciones o páginas", d: "Una landing de 5 secciones no cuesta igual que un sitio con 10 páginas internas." },
                  { t: "Funcionalidades especiales", d: "Pagos en línea, reservas, integraciones con WhatsApp — cada función suma al presupuesto." },
                  { t: "SEO incluido o no", d: "Muchas agencias entregan la web sin optimización para Google. Es un error costoso a largo plazo." },
                  { t: "Quién hace el trabajo", d: "Un principiante, un intermediario que subcontrata o un equipo especializado no tienen el mismo precio ni el mismo resultado." },
                ].map((item) => (
                  <li key={item.t} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-violet-400" />
                    <span className="text-[#475569]"><strong className="text-[#0A2540]">{item.t}:</strong> {item.d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Sección 2 — Precios */}
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-[#0A2540]">Qué incluye cada tipo de proyecto</h2>
              <p className="leading-relaxed text-[#475569]">Cada proyecto se cotiza a la medida según su alcance — por eso no manejamos precios fijos. Esto es lo que normalmente incluye cada tipo de proyecto profesional (no plantillas ni productos genéricos):</p>

              <div className="space-y-4">
                {priceCards.map((card) => (
                  <div key={card.type} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                    <div className="p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-semibold text-[#0A2540]">{card.type}</h3>
                        <span className="shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                          Cotización a la medida
                        </span>
                      </div>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {card.includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-sm text-[#64748B]">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 rounded-xl bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#64748B]">
                        <strong className="text-[#0A2540]">Ideal para:</strong> {card.ideal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Sección 3 */}
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-[#0A2540]">¿Por qué encuentro páginas web tan baratas?</h2>
              <p className="leading-relaxed text-[#475569]">Buena pregunta. Existen básicamente tres situaciones:</p>

              <div className="space-y-4">
                {[
                  { n: "01", t: "Plantillas genéricas sin personalización", d: "Te dan una plantilla de WordPress con tu logo y colores. Funciona para «tener algo», pero no está diseñada para tu negocio ni pensada para convertir visitantes en clientes." },
                  { n: "02", t: "Diseñadores sin experiencia", d: "Aprenden trabajando en tu proyecto. El precio es bajo, el resultado es impredecible y el soporte futuro prácticamente no existe." },
                  { n: "03", t: "Intermediarios que subcontratan", d: "Alguien te vende la web pero la hace otra persona. Pierdes control de la calidad y los tiempos — y si algo falla, nadie responde." },
                ].map((item) => (
                  <div key={item.n} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-bold text-white">
                      {item.n}
                    </span>
                    <div>
                      <p className="font-semibold text-[#0A2540]">{item.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Callout advertencia */}
              <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium text-amber-800">Ten esto muy claro</p>
                  <p className="mt-1 text-sm leading-relaxed text-amber-700">
                    Una web barata que no genera resultados no es un ahorro — es un costo doble. Primero pagas por algo que no funciona y luego pagas de nuevo para rehacerlo bien. El error más común de los emprendedores colombianos al digitalizar su negocio.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Sección 4 — Alertas */}
            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-[#0A2540]">Señales de alerta al contratar una agencia web</h2>
              <p className="leading-relaxed text-[#475569]">Antes de hacer cualquier pago, verifica estos puntos:</p>
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <ul className="space-y-3">
                  {alerts.map((item) => (
                    <li key={item} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                      <span className="text-sm text-[#475569]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Conclusión */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#0A2540]">Conclusión</h2>
              <p className="leading-relaxed text-[#475569]">
                El precio de una página web en Colombia depende directamente de lo que necesitas y de a quién le confías el trabajo. Con el e-commerce colombiano creciendo al 26.7% anual y solo el 17% de PYMEs con presencia digital, nunca hubo mejor momento para invertir en tu web.
              </p>
              <p className="leading-relaxed text-[#475569]">
                Lo más importante no es encontrar el precio más bajo. Es encontrar el equipo que entienda tu negocio, trabaje contigo directamente y entregue algo que realmente traiga clientes.
              </p>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-center shadow-2xl shadow-violet-500/25">
              <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">Sin compromiso</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">¿Cuánto costaría tu página web?</h3>
                <p className="mx-auto mt-3 max-w-sm text-white/70">
                  Cuéntanos qué necesitas y te respondemos con un presupuesto claro en menos de 24 horas.
                </p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-violet-600 shadow-lg transition hover:scale-[1.04]"
                >
                  Pedir cotización gratis <ArrowRight size={14} />
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
