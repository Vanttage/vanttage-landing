"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const groups = [
  {
    title: "Frontend",
    color: "elec",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion"],
  },
  {
    title: "Backend",
    color: "elec",
    items: ["Node.js", "Express", "Prisma ORM", "PostgreSQL", "REST & GraphQL"],
  },
  {
    title: "Infraestructura",
    color: "gold",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions CI/CD", "Cloudflare"],
  },
  {
    title: "Plataformas",
    color: "gold",
    items: ["WordPress", "Shopify", "Strapi", "Sanity CMS", "Supabase"],
  },
];

const tickerItems = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind", "Vercel", "AWS",
  "Docker", "GraphQL", "Prisma", "Stripe", "Shopify", "Sanity", "Framer Motion",
];

export default function Stack() {
  return (
    <section id="stack" className="section-shell scroll-mt-24 overflow-hidden bg-[#0A2540]">
      <div className="divider-top" />
      <div className="elec-glow -left-20 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 opacity-40" />

      <div className="section-inner">
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
          >
            <p className="section-kicker mb-5">Stack tecnológico</p>
            <h2 className="section-title">
              Tecnología elegida
              <br />
              <span
                className="text-transparent"
                style={{
                  background: "linear-gradient(90deg, #1EA7FF, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                por criterio.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            viewport={{ once: true }}
            className="section-copy max-w-lg"
          >
            Cada herramienta entra porque resuelve un problema real: rendimiento,
            mantenibilidad o escalabilidad. Sin hype, sin complicaciones innecesarias.
          </motion.p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((g, i) => (
            <motion.article
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-7"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-white">{g.title}</h3>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{
                    color: g.color === "gold" ? "#D4AF37" : "#1EA7FF",
                  }}
                >
                  0{i + 1}
                </span>
              </div>
              <div
                className="mt-4 h-px w-10"
                style={{ background: g.color === "gold" ? "#D4AF37" : "#1EA7FF" }}
              />

              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-[#94A3B8] transition-colors hover:border-[#1EA7FF]/25 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 overflow-hidden"
        >
          <div className="flex gap-8 whitespace-nowrap" style={{ animation: "tickerMove 22s linear infinite" }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#334155]"
              >
                {item}
                <span className="ml-8 text-[#1EA7FF]/30">✦</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes tickerMove {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
