import { Badge, type Tone } from "../_components/ui";

const tones: Record<string, Tone> = {
  Chat: "violet",
  Formulario: "blue",
  WhatsApp: "green",
  Correo: "amber",
  Landing: "pink",
  cotizador: "violet",
  manual: "neutral",
};

const labels: Record<string, string> = { cotizador: "Cotizador", manual: "Manual" };

export default function OrigenBadge({ origen }: { origen: string | null }) {
  const o = origen || "manual";
  return <Badge tone={tones[o] ?? "neutral"}>{labels[o] ?? o}</Badge>;
}
