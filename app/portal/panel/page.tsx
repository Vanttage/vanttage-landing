import Link from "next/link";
import { FileText, Users, Inbox, Settings, ArrowRight } from "lucide-react";
import { createClient } from "../_lib/supabase-server";
import LogoutButton from "./LogoutButton";

const modules = [
  {
    icon: FileText,
    title: "Cotizador",
    desc: "Genera cotizaciones con plantilla de marca y expórtalas en PDF.",
    href: "/portal/cotizador",
    ready: false,
  },
  {
    icon: Users,
    title: "Clientes (CRM)",
    desc: "Registra y da seguimiento a clientes y prospectos.",
    href: "/portal/clientes",
    ready: false,
  },
  {
    icon: Inbox,
    title: "Leads del sitio",
    desc: "Contactos que llegan del chat y los formularios de la web.",
    href: "/portal/leads",
    ready: false,
  },
  {
    icon: Settings,
    title: "Ajustes",
    desc: "Datos de la empresa, plantillas y preferencias del portal.",
    href: "/portal/ajustes",
    ready: false,
  },
];

export default async function PanelPage() {
  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!configured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl">
          🔧
        </div>
        <h1 className="text-lg font-semibold">Portal en configuración</h1>
        <p className="mt-2 text-sm text-white/50">
          El portal interno está listo, pero falta conectar la base de datos
          (Supabase). En cuanto se agreguen las credenciales, quedará activo.
        </p>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nombre = user?.email?.split("@")[0] ?? "admin";

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/40">Portal interno · Vanttage</p>
          <h1 className="mt-1 text-2xl font-semibold">
            Hola, <span className="capitalize text-violet-300">{nombre}</span> 👋
          </h1>
        </div>
        <LogoutButton />
      </div>

      {/* Módulos */}
      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map(({ icon: Icon, title, desc, href, ready }) => {
          const inner = (
            <div
              className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition ${
                ready ? "hover:border-violet-400/40 hover:bg-white/[0.05]" : "opacity-70"
              }`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-300">
                <Icon size={20} />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {!ready && (
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                    Próximamente
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{desc}</p>
              {ready && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-violet-300">
                  Abrir <ArrowRight size={14} />
                </span>
              )}
            </div>
          );

          return ready ? (
            <Link key={title} href={href}>
              {inner}
            </Link>
          ) : (
            <div key={title}>{inner}</div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-xs text-white/30">
        Sesión iniciada como {user?.email}
      </p>
    </main>
  );
}
