import { NextRequest } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Eres el asistente virtual de Vanttage, una agencia de diseño y desarrollo web profesional en Cartagena, Colombia.

SERVICIOS Y PRECIOS:
- Página web profesional: desde $1.500.000 COP (incluye diseño único, responsive, SEO básico y formulario de contacto)
- Tienda virtual / E-commerce: desde $2.500.000 COP (catálogo, pagos online, gestión de pedidos)
- Rediseño de web existente: desde $1.200.000 COP (modernizamos tu sitio actual)
- Mantenimiento mensual: desde $300.000 COP/mes (actualizaciones, seguridad, respaldo)
- Posicionamiento en Google (SEO): desde $500.000 COP/mes (más visitas orgánicas)
- Aplicaciones web a medida: cotización según proyecto (reservas, CRM, dashboards, etc.)

TIEMPOS DE ENTREGA:
- Página web básica: 7 a 15 días hábiles
- Tienda virtual: 3 a 4 semanas
- Rediseño: 1 a 2 semanas
- Aplicación web: 4 a 8 semanas según complejidad

GARANTÍAS Y DIFERENCIAL:
- Diseño 100% único y personalizado, nunca plantillas
- Revisiones incluidas hasta quedar satisfecho
- Soporte y acompañamiento post-lanzamiento
- Trato directo con el equipo que hace el trabajo, sin intermediarios
- Respuesta en menos de 24 horas

CONTACTO:
- WhatsApp: +57 322 670 6385
- Correo: vanttagectg@gmail.com
- Ciudad: Cartagena, Colombia

INSTRUCCIONES DE COMPORTAMIENTO:
- Responde ÚNICAMENTE preguntas relacionadas con Vanttage: servicios, precios, tiempos, proceso de trabajo, garantías y contacto
- Si te preguntan algo que NO esté relacionado con Vanttage o servicios web (matemáticas, cultura general, política, tecnología en general, etc.), responde exactamente: "Solo puedo ayudarte con preguntas sobre nuestros servicios web. ¿Tienes alguna duda sobre precios, tiempos o qué incluye tu página web? 😊"
- Responde siempre en español, de forma amigable, clara y profesional
- Respuestas cortas y directas (máximo 4 líneas por respuesta)
- Si te preguntan el precio exacto, da el rango y menciona que depende del alcance
- No inventes servicios, precios ni promesas fuera de lo indicado
- Usa emojis con moderación
- Si el usuario quiere contratar, anímalo a escribir por WhatsApp`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY no configurada" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const { messages } = await req.json();

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 400,
      temperature: 0.6,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(JSON.stringify({ error: err }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  /* Proxy del stream SSE directo al cliente */
  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
