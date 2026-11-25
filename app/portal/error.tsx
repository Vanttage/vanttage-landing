"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import PortalShell from "./_components/PortalShell";
import { Notice, btnPrimary, btnSecondary } from "./_components/ui";

/* Error amable para cualquier pantalla del portal */
export default function PortalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PortalShell kicker="Algo falló" title="No pudimos cargar esta pantalla" subtitle="Puede ser un problema de conexión o de la base de datos. Tus datos no se han perdido.">
      <div className="max-w-2xl space-y-5">
        <Notice
          tone="red"
          title="Error al cargar"
          text={error.digest ? `Código de referencia: ${error.digest}` : "Intenta de nuevo en unos segundos."}
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={reset} className={btnPrimary}>
            <RotateCcw size={16} aria-hidden /> Reintentar
          </button>
          <Link href="/portal/dashboard" className={btnSecondary}>
            Ir al dashboard
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}
