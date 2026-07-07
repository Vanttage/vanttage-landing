import Sidebar from "./Sidebar";

/* Envuelve las vistas del CRM con el sidebar fijo + área de contenido */
export default function PortalShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--pbg)] text-[var(--ptext)]">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[var(--pborder)] bg-[var(--pbg)]/80 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-[var(--pfaint)]">{subtitle}</p>}
          </div>
          {actions}
        </header>
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
