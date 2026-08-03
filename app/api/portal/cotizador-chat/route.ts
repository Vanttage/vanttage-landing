import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

/* Paleta para categorías de servicio (modo propuesta) */
const PALETA = "#7c3aed (violeta), #2563eb (azul), #059669 (verde), #d97706 (ámbar), #dc2626 (rojo), #0891b2 (cian)";

const SYSTEM = `Eres el asistente interno de Carlos (Vanttage Tech, Cartagena, Colombia) para ARMAR cotizaciones y propuestas comerciales a partir de lo que él escribe en lenguaje natural.

Tu trabajo: leer el mensaje del usuario + el estado actual del documento (que te paso como JSON) y devolver SIEMPRE un único objeto JSON con esta forma exacta:
{
  "reply": "respuesta breve y cálida en español (máx 3 líneas), confirmando lo que entendiste y sugiriendo el siguiente dato si falta algo",
  "patch": { ...solo los campos que cambian... }
}

CAMPOS válidos dentro de "patch" (incluye SOLO los que el usuario mencionó o que puedas inferir con seguridad; nunca inventes precios):
- tipo: "cotizacion" | "propuesta"  (usa "propuesta" si es un servicio/plan narrativo; "cotizacion" si es una lista simple de ítems con precio)
- cliente: string (nombre de la persona o tercero)
- empresa: string
- proyecto: string (título corto del trabajo)
- resumen: string (1-3 frases)
- items: array de { "concepto": string, "valor": number, "etiqueta"?: string, "color"?: string }
    · En cotización: usa "valor" numérico (COP, sin puntos ni símbolos, ej 1200000).
    · En propuesta: cada ítem es un bloque de servicio; puedes usar "etiqueta" (ej "$1.200.000 / mes" o "Por intervención") y "color" de esta paleta: ${PALETA}. Asigna un color distinto por categoría temática.
    · Devuelve SIEMPRE el array COMPLETO de items (los actuales + los nuevos/editados), no solo el nuevo.
- entrega: string (tiempo de entrega)
- formaPago: string
- validez: string (validez de la oferta)
- notas: string
- descuento: number (porcentaje 0-100)
- contexto: string (solo propuesta: situación/diagnóstico del cliente)
- objetivo: string (solo propuesta)
- beneficios: string (solo propuesta)

ESTILO (para que quede IGUAL a las cotizaciones/propuestas que ya están en el sistema):
- Tono profesional, cálido y claro, tratando al cliente de "tú" o "usted" según el contexto.
- El "concepto" de un ítem suele ser un título seguido de viñetas con "• " y saltos de línea (\\n). Ejemplo real:
  "Desarrollo completo de la tienda virtual (e-commerce), incluye:\\n• Diseño único adaptado a tu marca\\n• Catálogo con fotos, precios y variantes\\n• Carrito y checkout (transferencia, sin comisiones)\\n• Panel de administración\\n• Optimización SEO\\n• Responsive + publicación"
- Ítems incluidos sin costo van con valor 0 y el texto acaba en "(incluido)": ej "Hosting + dominio .com por 1 año (incluido)".
- Condiciones típicas: entrega "3 a 4 semanas"; formaPago "50% para iniciar, 50% contra entrega"; validez "15 días".
- Notas típicas: aclarar que cambios/funciones nuevas tras la entrega tienen costo, y mencionar plan de soporte/mantenimiento mensual.
- En PROPUESTA: contexto = diagnóstico de la situación del cliente; objetivo = qué se busca lograr; beneficios = valor que recibe. Los servicios se agrupan por categoría, cada una con su color y su etiqueta de precio (ej "$1.200.000 / mes" o "Por intervención").

REGLAS:
- Responde SOLO con el JSON. Nada de texto fuera del JSON.
- Si el usuario NO da un dato, no lo incluyas en patch (deja "patch": {} si no hay nada que cambiar y solo conversas).
- Precios: solo los que el usuario indique explícitamente. Si no da precio, deja "valor": 0 o una "etiqueta" tipo "Por definir".
- Montos en COP para el mercado de Cartagena 2026. No conviertas monedas.
- Sé conservador: es mejor preguntar en "reply" que inventar.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY no configurada" }, { status: 503 });
  }

  const { messages, estado } = await req.json().catch(() => ({ messages: [], estado: {} }));
  if (!Array.isArray(messages)) {
    return NextResponse.json({ error: "messages inválido" }, { status: 400 });
  }

  const contexto = `Estado actual del documento (JSON): ${JSON.stringify(estado ?? {})}`;

  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "system", content: contexto },
      ...messages,
    ],
    response_format: { type: "json_object" },
    max_tokens: 1500,
    temperature: 0.3,
  });

  let res: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body,
    });
    if (res.ok) break;
    if ((res.status === 429 || res.status >= 500) && attempt < 2) {
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      continue;
    }
    break;
  }

  if (!res || !res.ok) {
    const err = res ? await res.text() : "sin respuesta del proveedor";
    return NextResponse.json({ error: err }, { status: res?.status ?? 502 });
  }

  const json = await res.json();
  const content: string = json?.choices?.[0]?.message?.content ?? "{}";

  let parsed: { reply?: string; patch?: Record<string, unknown> } = {};
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = { reply: content, patch: {} };
  }

  const reply = typeof parsed.reply === "string" && parsed.reply.trim()
    ? parsed.reply.trim()
    : "Listo, lo tomé en cuenta.";
  const patch = parsed.patch && typeof parsed.patch === "object" ? parsed.patch : {};

  return NextResponse.json({ reply, patch });
}
