/* Franja de logos de clientes.
   Logos en /public/clients (versiones claras para el fondo oscuro).
   La animación es CSS (globals.css → .marquee-track) y se detiene con
   prefers-reduced-motion; en ese caso los logos se muestran en una grilla fija. */

type Client = {
  name: string;
  /** Ruta del logo; sin logo se muestra el nombre en texto */
  src?: string;
  /** Ancho y alto intrínsecos (para la proporción) */
  w?: number;
  h?: number;
  /** Altura visual: los logos anchos van más bajos para que pesen parecido */
  size?: "wide" | "mid" | "tall";
};

const clients: Client[] = [
  {
    name: "SOTEC",
    src: "/clients/sotec-white.png",
    w: 218,
    h: 160,
    size: "tall",
  },
  {
    name: "DAGAR Soluciones",
    src: "/clients/dagar-white.svg",
    w: 419,
    h: 160,
    size: "mid",
  },
  {
    name: "GOYN Barranquilla",
    src: "/clients/goyn-barranquilla-white.png",
    w: 657,
    h: 160,
    size: "wide",
  },
  {
    name: "Transportes UP Cartagena",
    src: "/clients/transportes-up-white.png",
    w: 279,
    h: 160,
    size: "mid",
  },
  {
    name: "Daz Ambiental",
    src: "/clients/daz-ambiental-white.png",
    w: 186,
    h: 160,
    size: "tall",
  },
  {
    name: "Club Hunk Cartagena",
    src: "/clients/club-hunk.png",
    w: 200,
    h: 200,
    size: "tall",
  },
  {
    name: "ALZAK Foundation",
    src: "/clients/alzak-foundation-white.png",
    w: 545,
    h: 160,
    size: "wide",
  },
  {
    name: "R&R Kelab",
    src: "/clients/kelab-white.svg",
    w: 149,
    h: 160,
    size: "tall",
  },
  {
    name: "Andreas Adventures",
    src: "/clients/andreas-adventures-white.svg",
    w: 540,
    h: 160,
    size: "wide",
  },
  {
    name: "EcoTruck",
    src: "/clients/ecotruck-white.svg",
    w: 139,
    h: 160,
    size: "tall",
  },
  {
    name: "Los Gestores",
    src: "/clients/los-gestores.png",
    w: 417,
    h: 160,
    size: "mid",
  },
];

const heightClass: Record<NonNullable<Client["size"]>, string> = {
  wide: "h-8 md:h-10",
  mid: "h-10 md:h-12",
  tall: "h-12 md:h-16",
};

function Logo({ client, hidden }: { client: Client; hidden?: boolean }) {
  if (!client.src) {
    return (
      <span
        aria-hidden={hidden || undefined}
        className="shrink-0 text-xl font-semibold tracking-tight text-zinc-300/80 transition-colors duration-300 hover:text-white md:text-2xl"
      >
        {client.name}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={client.src}
      alt={hidden ? "" : client.name}
      title={client.name}
      width={client.w}
      height={client.h}
      loading="lazy"
      decoding="async"
      className={`${heightClass[client.size ?? "mid"]} w-auto max-w-[180px] shrink-0 object-contain opacity-70 transition-opacity duration-300 hover:opacity-100`}
    />
  );
}

export default function Marquee() {
  return (
    <div className="marquee relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0A0A14] py-10">
      {/* Etiqueta */}
      <div className="mb-8 flex items-center justify-center gap-4 px-4">
        <span className="hidden h-px w-10 sm:block bg-gradient-to-r from-transparent to-white/15 md:w-16" />
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Empresas que confían en nosotros
        </p>
        <span className="hidden h-px w-10 sm:block bg-gradient-to-l from-transparent to-white/15 md:w-16" />
      </div>

      {/* Bordes difuminados */}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0A0A14] to-transparent motion-reduce:hidden md:w-32" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0A0A14] to-transparent motion-reduce:hidden md:w-32" />
      <div className="marquee-track flex w-max items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8">
        {/* Dos copias para el bucle continuo; la segunda es decorativa */}
        {[false, true].map((dup) => (
          <ul
            key={String(dup)}
            aria-hidden={dup || undefined}
            className={`flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6 ${dup ? "motion-reduce:hidden" : ""}`}
          >
            {clients.map((c) => (
              <li key={c.name} className="flex shrink-0 items-center">
                <Logo client={c} hidden={dup} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
