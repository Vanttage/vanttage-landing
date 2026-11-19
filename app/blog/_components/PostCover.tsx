import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BgVideo from "@/app/components/BgVideo";

/* Portada de artículo: título editorial y debajo un encuadre ancho con video o imagen.
   BgVideo ya respeta reduced motion y ahorro de datos (se queda en el póster). */
export default function PostCover({
  video,
  image,
  category,
  title,
  lead,
  meta,
}: {
  /** Ruta base del video sin extensión (debe existir `${video}-poster.webp`) */
  video?: string;
  image?: string;
  category: string;
  title: string;
  lead: ReactNode;
  meta: string[];
}) {
  return (
    <header className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 md:pt-36">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.12), transparent)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl">
        <nav aria-label="Ruta" className="text-sm text-zinc-400">
          <Link
            href="/blog"
            className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden /> Blog
          </Link>
        </nav>
        <div className="mt-6 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">{category}</p>
          <h1 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">{lead}</p>
          <p className="mt-8 text-sm leading-relaxed text-zinc-400">
            {meta.map((m, i) => (
              <span key={m}>
                {i > 0 && <span className="px-2 text-zinc-600" aria-hidden>·</span>}
                <span className="whitespace-nowrap">{m}</span>
              </span>
            ))}
          </p>
        </div>
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:aspect-[21/9]">
          {video ? (
            <BgVideo src={video} />
          ) : image ? (
            <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06060C]/50 via-transparent to-transparent" aria-hidden />
        </div>
      </div>
    </header>
  );
}
