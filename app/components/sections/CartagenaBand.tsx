/* Banda "Hecho en Cartagena": video de la bahía con el texto encima. */

import BgVideo from "@/app/components/BgVideo";

export default function CartagenaBand() {
  return (
    <section
      aria-labelledby="cartagena-title"
      className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-[#06060C] md:min-h-[520px]"
    >
      <div className="absolute inset-0 -z-10">
        <BgVideo src="/media/video/cartagena" />
        {/* Oscurece para que el texto se lea y funde con las secciones vecinas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060C] via-[#06060C]/55 to-[#06060C]/70" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#06060C] to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-14 md:pb-20">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-orange-200/90">
          Cartagena de Indias · Colombia
        </p>
        <h2
          id="cartagena-title"
          className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
        >
          Hecho en Cartagena, para negocios de cualquier lugar.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">
          Somos un equipo pequeño de la Costa Caribe. Si estás cerca, nos puedes
          visitar. Si estás en otro país, trabajamos igual por videollamada y WhatsApp.
        </p>
      </div>
    </section>
  );
}
