import Image from "next/image";

/* Imagen de apoyo dentro del artículo, con pie de foto. */
export default function PostFigure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1066,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 720px, 100vw"
        className="h-auto w-full rounded-2xl border border-white/10 object-cover"
      />
      {caption && <figcaption className="mt-3 text-[13px] leading-relaxed text-zinc-400">{caption}</figcaption>}
    </figure>
  );
}
