import PortalShell from "./_components/PortalShell";
import { Skeleton } from "./_components/ui";

/* Esqueleto sobrio mientras carga cualquier pantalla del portal */
export default function PortalLoading() {
  return (
    <PortalShell>
      <div role="status" aria-label="Cargando" className="space-y-4">
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[108px] rounded-2xl md:h-[124px]" />
          ))}
        </div>
        <Skeleton className="h-24 rounded-2xl" />
        <div className="space-y-2 pt-6">
          <Skeleton className="h-5 w-48" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
        <span className="sr-only">Cargando</span>
      </div>
    </PortalShell>
  );
}
