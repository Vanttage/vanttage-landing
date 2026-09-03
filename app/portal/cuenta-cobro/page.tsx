import { notFound } from "next/navigation";
import CuentaCobro from "./CuentaCobro";

export const dynamic = "force-dynamic";

/*
  La cuenta de cobro es una herramienta interna que se usa en local para generar
  el PDF. Se oculta del despliegue en producción (404) pero sigue disponible en
  local y en previews. Para exponerla en producción, quita este guard.
*/
export default function Page() {
  if (process.env.VERCEL_ENV === "production") notFound();
  return <CuentaCobro />;
}
