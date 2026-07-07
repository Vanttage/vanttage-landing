import { redirect } from "next/navigation";

/* /portal → dashboard del CRM */
export default function PortalIndex() {
  redirect("/portal/dashboard");
}
