"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowUpRight } from "lucide-react";
import { notifyTeam, MOISES_WHATSAPP } from "@/app/lib/notify";

/* ─────────── TYPES ─────────── */

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Lead {
  nombre: string;
  whatsapp: string;
  necesidad: string;
}

/* ─────────── CONFIG ─────────── */

const WHATSAPP = `https://wa.me/${MOISES_WHATSAPP}?text=Hola%20Vanttage%2C%20me%20interesa%20una%20p%C3%A1gina%20web%20para%20mi%20negocio`;

const QUICK_REPLIES = [
  { label: "📝 Quiero una cotización", text: "Quiero una cotización para mi proyecto" },
  { label: "🌐 Una página web", text: "Necesito una página web profesional para mi negocio" },
  { label: "🛒 Una tienda online", text: "Quiero una tienda virtual para vender online" },
  { label: "⚙️ Una app a la medida", text: "Necesito una aplicación web a la medida" },
];

const WELCOME: Message = {
  role: "assistant",
  content:
    "¡Hola! 👋 Soy el asistente de **Vanttage**. Cuéntame qué necesitas para tu negocio y con gusto te ayudo. ¿Quieres que un asesor te prepare una **cotización sin costo**?",
};

/* Detecta y extrae la marca interna [LEAD] ... [/LEAD] que emite el asistente */
const LEAD_RE = /\[LEAD\]([\s\S]*?)\[\/LEAD\]/i;

function parseLead(text: string): Lead | null {
  const m = text.match(LEAD_RE);
  if (!m) return null;
  const body = m[1];
  const get = (k: string) =>
    (body.match(new RegExp(`${k}\\s*=\\s*([^;\\]]*)`, "i"))?.[1] ?? "").trim();
  const nombre = get("nombre");
  const whatsapp = get("whatsapp");
  const necesidad = get("necesidad");
  if (!nombre && !whatsapp && !necesidad) return null;
  return { nombre, whatsapp, necesidad };
}

/* Quita la marca [LEAD]...[/LEAD] del texto visible. También oculta un
   fragmento "[LEAD] ..." todavía sin cerrar mientras el mensaje va llegando. */
function stripLead(text: string): string {
  let t = text.replace(LEAD_RE, "");
  const open = t.search(/\[LEAD\]/i);
  if (open !== -1) t = t.slice(0, open);
  return t.replace(/\n{3,}/g, "\n\n").trim();
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────── TYPING DOTS ─────────── */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-violet-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ─────────── MESSAGE BUBBLE ─────────── */

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  /* Renderiza **bold** y saltos de línea */
  const formatted = msg.content
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[10px] font-bold text-white shadow">
          V
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-tr-sm bg-gradient-to-br from-violet-500 to-indigo-500 text-white"
            : "rounded-tl-sm bg-white text-[#0A2540]"
        }`}
      >
        {formatted}
      </div>
    </motion.div>
  );
}

/* ─────────── WIDGET ─────────── */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const [leadWa, setLeadWa] = useState<string | null>(null);
  const leadSentRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Cuando el asistente completa los 3 datos: avisa por correo a AMBOS socios
     y prepara el enlace de WhatsApp (a Moisés) que abrirá el visitante. */
  async function handleLead(lead: Lead) {
    if (leadSentRef.current) return;
    leadSentRef.current = true;

    /* 1) Notifica a los 3 correos del equipo con los datos del lead */
    notifyTeam({
      source: "Chat (lead)",
      name: lead.nombre,
      whatsapp: lead.whatsapp,
      message: lead.necesidad,
    });

    /* 2) Enlace de WhatsApp hacia Moisés con los datos prellenados */
    const texto =
      `Hola Vanttage 👋, soy *${lead.nombre}*.\n` +
      `WhatsApp: ${lead.whatsapp}\n` +
      `Necesito: ${lead.necesidad}`;
    setLeadWa(
      `https://wa.me/${MOISES_WHATSAPP}?text=${encodeURIComponent(texto)}`,
    );
  }

  /* Auto-scroll al último mensaje */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, leadWa]);

  /* Focus input al abrir */
  useEffect(() => {
    if (open) {
      setHasNotif(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("API error");

      /* Leer el stream SSE */
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setLoading(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;

          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            assistantText += delta;

            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: stripLead(assistantText),
              };
              return updated;
            });
          } catch {
            /* chunk incompleto, ignorar */
          }
        }
      }

      /* Al terminar el stream: si el asistente capturó el lead, dispara avisos */
      const lead = parseLead(assistantText);
      if (lead) handleLead(lead);
    } catch {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ocurrió un error al conectarme. Por favor escríbenos directamente por WhatsApp 👇",
        },
      ]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* ── Panel de chat ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-24 right-5 z-50 flex w-[350px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#F8FAFC] shadow-2xl shadow-black/30 sm:right-6"
            style={{ height: 520 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white backdrop-blur">
                V
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Vanttage</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="text-[11px] text-white/70">En línea · Responde en segundos</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {messages.map((msg, i) => (
                <Bubble key={i} msg={msg} />
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-[10px] font-bold text-white">
                    V
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white shadow-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Botón de WhatsApp tras capturar el lead: el visitante abre su
                  WhatsApp con los datos prellenados hacia Moisés */}
              {leadWa && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={leadWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  Enviar mis datos por WhatsApp
                  <ArrowUpRight size={14} />
                </motion.a>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick replies — solo si hay solo el mensaje de bienvenida */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 border-t border-slate-200 bg-white px-4 py-3">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => sendMessage(q.text)}
                    className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[12px] text-violet-600 transition hover:bg-violet-100"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-slate-200 bg-white px-4 py-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  disabled={loading}
                  className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-[#0A2540] outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow transition hover:scale-105 disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </form>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => notifyTeam({ source: "WhatsApp (chat)", once: "wa-chat" })}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 py-2.5 text-[12px] font-medium text-green-700 transition hover:bg-green-100"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-green-600">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Hablar con un asesor por WhatsApp
                <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Botón flotante ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-xl shadow-violet-500/40 sm:right-6"
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Badge de notificación */}
        {hasNotif && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-[10px] font-bold text-white shadow"
          >
            1
          </motion.span>
        )}
      </motion.button>
    </>
  );
}
