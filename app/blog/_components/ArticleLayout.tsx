import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import PostCover from "./PostCover";
import ReadingProgress from "./ReadingProgress";
import Toc, { type TocItem } from "./Toc";
import ShareBar from "./ShareBar";
import PostCard from "./PostCard";
import QuoteCta from "./QuoteCta";
import { getPost, posts } from "./posts";

const SITE = "https://vanttagetech.com";

/* Estructura común de los artículos: portada, barra de progreso, índice lateral,
   cuerpo de lectura (~68ch), compartir, "Sigue leyendo" y cierre para cotizar. */
export default function ArticleLayout({
  slug,
  lead,
  toc,
  cta,
  children,
}: {
  slug: string;
  lead: ReactNode;
  toc: TocItem[];
  cta: { title: string; text: string; button?: string };
  children: ReactNode;
}) {
  const post = getPost(slug);
  const url = `${SITE}/blog/${slug}`;
  const others = posts.filter((p) => p.slug !== slug);

  return (
    <main className="min-h-screen bg-transparent text-zinc-300">
      <ReadingProgress targetId="cuerpo" />

      <PostCover
        video={post.video}
        category={post.category}
        title={post.title}
        lead={lead}
        meta={[post.dateLong, `${post.readTime} de lectura`, "Por Vanttage"]}
      />

      <div className="px-4 pb-20 pt-6 sm:px-6 md:pt-10">
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          {/* Índice lateral (escritorio) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-10">
              <Toc items={toc} />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">Compartir</p>
                <ShareBar url={url} title={post.title} compact className="mt-4" />
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            {/* Índice plegable (móvil y tablet) */}
            <details className="group mb-10 rounded-2xl border border-white/10 bg-white/[0.03] lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                En este artículo
                <ChevronDown size={16} aria-hidden className="text-zinc-400 transition-transform group-open:rotate-180" />
              </summary>
              <ol className="border-t border-white/10 px-2 py-2">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="flex min-h-11 items-center rounded-lg px-3 text-[15px] leading-snug text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <article id="cuerpo" className="max-w-[42rem] text-[17px] md:text-lg">
              <div className="space-y-14">{children}</div>

              <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[15px] text-zinc-400">Si te sirvió, compártelo con alguien que lo necesite.</p>
                <ShareBar url={url} title={post.title} />
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Sigue leyendo */}
      <section aria-labelledby="sigue-leyendo" className="border-t border-white/10 px-4 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">Blog</p>
          <h2 id="sigue-leyendo" className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Sigue leyendo
          </h2>
          <ul className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
            {others.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteCta title={cta.title} text={cta.text} button={cta.button} />
    </main>
  );
}
