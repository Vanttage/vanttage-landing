"use client";

import { Plus } from "lucide-react";
import { btnPrimary } from "../_components/ui";

/* Botón del encabezado: avisa a ContactosTable para abrir el modal de nuevo contacto */
export const NUEVO_CONTACTO_EVENT = "portal:nuevo-contacto";

export default function NuevoContactoButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(NUEVO_CONTACTO_EVENT))} className={btnPrimary}>
      <Plus size={16} aria-hidden /> Nuevo contacto
    </button>
  );
}
