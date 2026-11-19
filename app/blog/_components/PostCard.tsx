import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "./posts";

/* Tarjeta de artículo: toda la tarjeta es un enlace. Hover: leve zoom de la imagen. */
export default function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/blog/${post.slug}`} className="group block rounded-2xl outline-offset-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="(min-width: 768px) 560px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em]">
        <span className="font-medium text-violet-300">{post.category}</span>
        <span className="h-1 w-1 rounded-full bg-zinc-600" aria-hidden />
        <span className="text-zinc-400">{post.readTime}</span>
      </p>
      <Heading className="mt-3 flex items-start justify-between gap-4 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
        <span className="transition-colors group-hover:text-violet-200">{post.title}</span>
        <ArrowUpRight
          size={20}
          aria-hidden
          className="mt-1 shrink-0 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transform-none"
        />
      </Heading>
      <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{post.excerpt}</p>
      <p className="mt-4 text-sm text-zinc-400">{post.date}</p>
    </Link>
  );
}
