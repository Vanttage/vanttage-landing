import { redirect } from "next/navigation";

/* /portal → el middleware decide: con sesión va al panel, sin sesión al login */
export default function PortalIndex() {
  redirect("/portal/panel");
}
