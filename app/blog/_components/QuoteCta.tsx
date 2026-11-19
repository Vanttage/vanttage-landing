import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* Cierre sobrio para cotizar. */
export default function QuoteCta({
  kicker = "Sin compromiso",
  title,
  text,
  button = "Pedir cotización",
}: {
  kicker?: string;
  title: string;
  text: string;
  button?: string;
}) {
  return (
    <section aria-labelledby="cta-cotizar" className="border-t border-white/10 px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">{kicker}</p>
          <h2 id="cta-cotizar" className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300">{text}</p>
        </div>
        <div className="md:justify-self-end">
          <Link
            href="/contacto"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#06060C] transition-colors hover:bg-zinc-200"
          >
            {button} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
