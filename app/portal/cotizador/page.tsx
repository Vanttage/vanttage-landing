"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Send, Plus, Trash2, Printer, RotateCcw, Save, PanelLeftClose, FileText, Copy, Sparkles,
  ShoppingCart, Globe, Wrench, GraduationCap, Gamepad2, Landmark, Leaf, ListChecks, MessageSquareText, Loader2,
  type LucideIcon,
} from "lucide-react";
import { PLANTILLAS, plantillaVacia, type Item, type Cotizacion } from "./plantillas";
import PortalShell from "../_components/PortalShell";
import { btnPrimary, btnSecondary, btnGhostIcon, cardCls, kickerCls, Skeleton } from "../_components/ui";

/* Iconos de las plantillas en la pantalla de inicio (sustituyen los emojis de plantillas.ts) */
const PLANTILLA_ICON: Record<string, LucideIcon> = {
  ecommerce: ShoppingCart,
  landing: Globe,
  soporteTI: Wrench,
  cursos: GraduationCap,
  misionMapache: Gamepad2,
  plataformaWeb: Landmark,
  landingDaz: Leaf,
};

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n || 0);

const soloNumero = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;

/* ─────────── Chat guía (guión, no IA) ─────────── */
type Stage =
  | "cliente"
  | "empresa"
  | "proyecto"
  | "resumen"
  | "itemConcepto"
  | "itemValor"
  | "entrega"
  | "formaPago"
  | "validez"
  | "done";

interface Msg {
  from: "bot" | "user";
  text: string;
}

const SALUDO_IA =
  "Cuéntame qué necesitas (cliente, servicio, precios, plazos) y lo voy armando en el documento. Ejemplo: “Propuesta para el Hotel Pestagua: sysadmin mensual 1.200.000, más un plan por intervención”. Si prefieres responder paso a paso, cambia a modo Guiado arriba.";

const PREGUNTAS: Record<Stage, string> = {
  cliente: "Armemos la cotización. ¿Cuál es el nombre del cliente o contacto?",
  empresa: "¿Nombre del negocio o empresa? (si no tiene, escribe “-”)",
  proyecto: "¿Título del proyecto? (Enter para dejar el sugerido)",
  resumen: "Describe brevemente el alcance. (Enter para dejar el sugerido)",
  itemConcepto:
    "Agreguemos los ítems. Escribe un concepto, o “listo” para pasar a las condiciones.",
  itemValor: "¿Valor de ese ítem en COP? (solo números)",
  entrega: "¿Tiempo estimado de entrega?",
  formaPago: "¿Forma de pago?",
  validez: "¿Validez de la cotización?",
  done: "Listo. Revisa el documento: puedes editar cualquier campo directamente y luego descargar el PDF.",
};

export default function CotizadorPage() {
  const [data, setData] = useState<Cotizacion>(plantillaVacia);
  const [stage, setStage] = useState<Stage>("cliente");
  const [tmpConcepto, setTmpConcepto] = useState("");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: SALUDO_IA }]);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(true);
  const [iaMode, setIaMode] = useState(true);
  const [iaBusy, setIaBusy] = useState(false);
  const [elegido, setElegido] = useState(false);
  const [booted, setBooted] = useState(false);
  const [previas, setPrevias] = useState<{ id: string; numero: string | null; cliente_nombre: string | null; proyecto: string | null }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  /* Si viene ?id=..., carga esa cotización guardada para editarla (salta el selector) */
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) { setBooted(true); return; }
    (async () => {
      try {
        const res = await fetch(`/api/portal/cotizaciones/${id}`);
        if (!res.ok) return;
        const row = await res.json();
        if (row?.datos) {
          setData(row.datos as Cotizacion);
          setEditingId(row.id);
          setElegido(true);
          setStage("done");
          setMsgs([{ from: "bot", text: `Editando ${row.numero || "cotización"}. Modifica el documento y pulsa Guardar.` }]);
        }
      } catch {
        /* ignora */
      } finally {
        setBooted(true);
      }
    })();
  }, []);

  /* Cargar cotizaciones previas para la opción "Duplicar una anterior" del selector */
  useEffect(() => {
    if (elegido) return;
    (async () => {
      try {
        const r = await fetch("/api/portal/cotizaciones");
        if (r.ok) {
          const j = await r.json();
          setPrevias((j.cotizaciones ?? []).slice(0, 8));
        }
      } catch {
        /* ignora */
      }
    })();
  }, [elegido]);

  /* Elegir punto de partida en el selector */
  function usarPlantilla(build: () => Cotizacion, nombre: string) {
    setData(build());
    setElegido(true);
    setStage("done");
    setMsgs([{ from: "bot", text: iaMode ? `Cargué la plantilla “${nombre}”. Dime el cliente y ajusta lo que necesites (o edita a la derecha).` : SALUDO_IA }]);
  }
  function empezarVacio() {
    setData(plantillaVacia());
    setElegido(true);
    setStage("done");
    setMsgs([{ from: "bot", text: iaMode ? SALUDO_IA : PREGUNTAS.cliente }]);
    if (!iaMode) setStage("cliente");
  }
  async function duplicarPrevia(id: string) {
    try {
      const res = await fetch(`/api/portal/cotizaciones/${id}`);
      if (!res.ok) return;
      const row = await res.json();
      if (row?.datos) {
        setData({ ...(row.datos as Cotizacion), numero: "COT-" + new Date().getFullYear() + "-001" });
        setElegido(true);
        setStage("done");
        setMsgs([{ from: "bot", text: "Dupliqué esa cotización. Es una copia nueva: cambia el cliente y guarda para asignarle su propio número." }]);
      }
    } catch {
      /* ignora */
    }
  }

  const set = (patch: Partial<Cotizacion>) => setData((d) => ({ ...d, ...patch }));
  const bot = (text: string) => setMsgs((m) => [...m, { from: "bot", text }]);
  const goto = (s: Stage) => {
    setStage(s);
    bot(PREGUNTAS[s]);
  };

  /* Aplica el patch de la IA sobre el documento (items se reemplaza por el array completo) */
  function aplicarPatch(patch: Record<string, unknown>) {
    if (!patch || typeof patch !== "object") return;
    setData((d) => {
      const next: Cotizacion = { ...d };
      for (const [k, v] of Object.entries(patch)) {
        if (v === undefined || v === null) continue;
        if (k === "items" && Array.isArray(v)) {
          next.items = (v as unknown[])
            .filter((x) => x && typeof x === "object")
            .map((x) => {
              const it = x as Record<string, unknown>;
              return {
                concepto: String(it.concepto ?? ""),
                valor: Number(it.valor) || 0,
                ...(it.etiqueta ? { etiqueta: String(it.etiqueta) } : {}),
                ...(it.color ? { color: String(it.color) } : {}),
              } as Item;
            });
        } else if (k === "descuento") {
          next.descuento = Number(v) || 0;
        } else if (k in next) {
          // @ts-expect-error asignación dinámica de campos string conocidos
          next[k] = v;
        }
      }
      return next;
    });
  }

  /* Chat con IA: interpreta texto libre y llena el documento */
  async function handleSendIA() {
    const val = input.trim();
    if (!val || iaBusy) return;
    setInput("");
    const historial = [...msgs, { from: "user" as const, text: val }];
    setMsgs((m) => [...m, { from: "user", text: val }]);
    setIaBusy(true);
    try {
      const payload = historial.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));
      const r = await fetch("/api/portal/cotizador-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload, estado: data }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        bot(e?.error?.includes("GROQ") ? "La IA no está configurada (falta GROQ_API_KEY). Puedes usar el modo Guiado." : "No pude procesar eso. Intenta de nuevo.");
        return;
      }
      const { reply, patch } = await r.json();
      if (patch && Object.keys(patch).length) aplicarPatch(patch);
      bot(reply || "Listo.");
    } catch {
      bot("Error de conexión. Intenta otra vez.");
    } finally {
      setIaBusy(false);
    }
  }

  function handleSend() {
    if (iaMode) return void handleSendIA();
    const val = input.trim();
    setInput("");
    // Permitir "Enter vacío" solo donde hay sugerido
    if (!val && !["proyecto", "resumen"].includes(stage)) return;
    if (val) setMsgs((m) => [...m, { from: "user", text: val }]);

    switch (stage) {
      case "cliente":
        set({ cliente: val });
        goto("empresa");
        break;
      case "empresa":
        set({ empresa: val });
        goto("proyecto");
        break;
      case "proyecto":
        if (val) set({ proyecto: val });
        goto("resumen");
        break;
      case "resumen":
        if (val) set({ resumen: val });
        goto("itemConcepto");
        break;
      case "itemConcepto":
        if (val.toLowerCase() === "listo") {
          goto("entrega");
        } else {
          setTmpConcepto(val);
          goto("itemValor");
        }
        break;
      case "itemValor": {
        const nuevo: Item = { concepto: tmpConcepto, valor: soloNumero(val) };
        setData((d) => ({ ...d, items: [...d.items, nuevo] }));
        setTmpConcepto("");
        bot(`Añadido: ${nuevo.concepto}, ${fmt(soloNumero(val))}`);
        goto("itemConcepto");
        break;
      }
      case "entrega":
        set({ entrega: val });
        goto("formaPago");
        break;
      case "formaPago":
        set({ formaPago: val });
        goto("validez");
        break;
      case "validez":
        set({ validez: val });
        goto("done");
        break;
      default:
        break;
    }
  }

  /* Nombre del PDF = "CÓDIGO - Cliente" (el navegador usa document.title al guardar) */
  function descargarPdf() {
    const prev = document.title;
    const nombre = `${data.numero || "Cotizacion"} - ${data.cliente || "Cliente"}`
      .replace(/[\\/:*?"<>|]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    document.title = nombre;
    const restore = () => {
      document.title = prev;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
  }

  function reset() {
    setData(plantillaVacia());
    setEditingId(null);
    setElegido(false);
    setStage("cliente");
    setTmpConcepto("");
    setMsgs([{ from: "bot", text: iaMode ? SALUDO_IA : PREGUNTAS.cliente }]);
  }

  /* Cambiar entre IA y Guiado sin perder el documento */
  function cambiarModo(ia: boolean) {
    setIaMode(ia);
    setStage(ia ? "done" : "cliente");
    setMsgs([{ from: "bot", text: ia ? SALUDO_IA : PREGUNTAS.cliente }]);
  }

  const subtotal = data.items.reduce((s, i) => s + (i.valor || 0), 0);
  const descuentoMonto = Math.round((subtotal * (data.descuento || 0)) / 100);
  const total = subtotal - descuentoMonto;
  const esPropuesta = data.tipo === "propuesta";

  async function guardar() {
    setSaving(true);
    setSavedMsg("");
    try {
      const editing = !!editingId;
      const url = editing ? `/api/portal/cotizaciones/${editingId}` : "/api/portal/cotizaciones";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos: data, subtotal, total }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSavedMsg(json.error === "DB no configurada" ? "Falta conectar la BD" : "Error al guardar");
      } else if (editing) {
        setSavedMsg("Cambios guardados");
      } else {
        set({ numero: json.numero });
        setEditingId(json.id);
        setSavedMsg(`Guardada como ${json.numero}`);
      }
    } catch {
      setSavedMsg("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  /* ─────────── Editores de la plantilla ─────────── */
  const editItem = (idx: number, patch: Partial<Item>) =>
    setData((d) => ({
      ...d,
      items: d.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)),
    }));
  const addItem = () =>
    setData((d) => ({ ...d, items: [...d.items, { concepto: "Nuevo ítem", valor: 0 }] }));
  const delItem = (idx: number) =>
    setData((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }));

  const savedOk = savedMsg.startsWith("Guardada") || savedMsg.startsWith("Cambios");
  const tituloDoc = editingId ? `Editar ${data.numero || "cotización"}` : "Nueva cotización";

  /* Evita el parpadeo del selector mientras se resuelve si viene ?id (edición) */
  if (!booted) {
    return (
      <PortalShell kicker="Cotizador" title="Nueva cotización" subtitle="Cargando" backHref="/portal/cotizaciones" backLabel="Cotizaciones">
        <div className="grid gap-3 sm:grid-cols-2" aria-busy="true" aria-label="Cargando">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </PortalShell>
    );
  }

  /* ─────────── Pantalla de inicio: elegir punto de partida ─────────── */
  if (!elegido) {
    return (
      <PortalShell
        kicker="Cotizador"
        title="Nueva cotización"
        subtitle="Elige cómo empezar: en blanco, desde una plantilla o duplicando una anterior."
        backHref="/portal/cotizaciones"
        backLabel="Cotizaciones"
      >
        <div className="max-w-5xl">
          {/* Empezar de 0 */}
          <button
            type="button"
            onClick={empezarVacio}
            className={`${cardCls} group mb-10 flex w-full items-center gap-4 p-5 text-left transition-colors hover:border-[var(--paccent-line)] hover:bg-[var(--pcardhover)]`}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--paccent-soft)] text-[var(--paccent)]">
              <Sparkles size={20} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium">Empezar en blanco</span>
              <span className="mt-0.5 block text-sm text-[var(--pmuted)]">Documento vacío. Funciona bien si lo armas con el chat de IA.</span>
            </span>
            <Plus size={18} className="shrink-0 text-[var(--pfaint)] transition-colors group-hover:text-[var(--ptext)]" aria-hidden />
          </button>

          {/* Plantillas */}
          <h2 className={`${kickerCls} mb-4 flex items-center gap-2`}>
            <FileText size={13} aria-hidden /> Plantillas de servicios
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PLANTILLAS.map((p) => {
              const Icon = PLANTILLA_ICON[p.id] ?? FileText;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => usarPlantilla(p.build, p.nombre)}
                  className={`${cardCls} group flex h-full flex-col items-start gap-4 p-5 text-left transition-colors hover:border-[var(--paccent-line)] hover:bg-[var(--pcardhover)]`}
                >
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--pborder)] text-[var(--pmuted)] transition-colors group-hover:text-[var(--paccent)]">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        color: p.tipo === "propuesta" ? "var(--pt-blue)" : "var(--pt-violet)",
                        background: `color-mix(in srgb, ${p.tipo === "propuesta" ? "var(--pt-blue)" : "var(--pt-violet)"} 12%, transparent)`,
                      }}
                    >
                      {p.tipo === "propuesta" ? "Propuesta" : "Cotización"}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{p.nombre}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--pmuted)]">{p.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Duplicar una anterior */}
          {previas.length > 0 && (
            <>
              <h2 className={`${kickerCls} mb-4 mt-10 flex items-center gap-2`}>
                <Copy size={13} aria-hidden /> Duplicar una anterior
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {previas.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => duplicarPrevia(c.id)}
                    className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-[var(--pborder)] bg-[var(--pcard)] px-4 py-3 text-left transition-colors hover:border-[var(--paccent-line)] hover:bg-[var(--pcardhover)]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{c.cliente_nombre || "Sin cliente"}</span>
                      <span className="block truncate text-xs text-[var(--pfaint)]">{c.proyecto || "Sin título"}</span>
                    </span>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--paccent)]">{c.numero || "Sin número"}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell
      variant="app"
      title={tituloDoc}
      subtitle={data.cliente ? `${data.cliente}${data.empresa && data.empresa !== "-" ? ` · ${data.empresa}` : ""}` : "Chat a la izquierda, documento editable a la derecha"}
      backHref="/portal/cotizaciones"
      backLabel="Volver a Cotizaciones"
      actions={
        <>
          {savedMsg && (
            <span
              role="status"
              className="hidden max-w-[220px] truncate text-xs font-medium lg:inline"
              style={{ color: savedOk ? "var(--pt-green)" : "var(--pt-red)" }}
            >
              {savedMsg}
            </span>
          )}
          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            aria-pressed={chatOpen}
            aria-label={chatOpen ? "Ocultar chat" : "Mostrar chat"}
            title={chatOpen ? "Ocultar chat" : "Mostrar chat"}
            className={btnGhostIcon}
          >
            {chatOpen ? <PanelLeftClose size={18} aria-hidden /> : <MessageSquareText size={18} aria-hidden />}
          </button>
          <button type="button" onClick={reset} aria-label="Reiniciar" title="Reiniciar" className={btnGhostIcon}>
            <RotateCcw size={17} aria-hidden />
          </button>
          <button type="button" onClick={guardar} disabled={saving} aria-label="Guardar" className={`${btnSecondary} w-11 px-0 sm:w-auto sm:px-4`}>
            {saving ? <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden /> : <Save size={16} aria-hidden />}
            <span className="hidden sm:inline">{saving ? "Guardando" : "Guardar"}</span>
          </button>
          <button type="button" onClick={descargarPdf} aria-label="Descargar PDF" className={`${btnPrimary} w-11 px-0 sm:w-auto sm:px-5`}>
            <Printer size={16} aria-hidden /> <span className="hidden sm:inline">PDF</span>
          </button>
        </>
      }
    >
      {savedMsg && (
        <p
          role="status"
          className="no-print border-b border-[var(--pborder)] px-4 py-2 text-xs font-medium lg:hidden"
          style={{ color: savedOk ? "var(--pt-green)" : "var(--pt-red)" }}
        >
          {savedMsg}
        </p>
      )}
      <div className="relative flex min-h-0 flex-1 print:block print:min-h-0">
        {/* ── Backdrop (solo móvil, cuando el chat está abierto) ── */}
        {chatOpen && (
          <div
            onClick={() => setChatOpen(false)}
            className="no-print fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            aria-hidden
          />
        )}

        {/* ── CHAT (izquierda): panel fijo en escritorio, cajón deslizable en móvil ── */}
        <aside
          aria-label="Asistente de cotización"
          className={`no-print fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-[360px] flex-col border-r border-[var(--pborder)] bg-[var(--psidebar)] transition-transform duration-300 ease-out motion-reduce:transition-none md:static md:z-auto md:w-[340px] md:max-w-none md:shrink-0 xl:w-[360px] ${
            chatOpen ? "translate-x-0" : "-translate-x-full md:hidden"
          }`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--pborder)] px-3 py-2.5">
            <div role="group" aria-label="Modo del asistente" className="flex rounded-full border border-[var(--pborder)] bg-[var(--pinput)] p-1 text-sm">
              <button
                type="button"
                onClick={() => cambiarModo(true)}
                aria-pressed={iaMode}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 font-medium transition-colors ${iaMode ? "bg-[var(--pbtn-bg)] text-[var(--pbtn-fg)]" : "text-[var(--pmuted)] hover:text-[var(--ptext)]"}`}
              >
                <Sparkles size={14} aria-hidden /> IA
              </button>
              <button
                type="button"
                onClick={() => cambiarModo(false)}
                aria-pressed={!iaMode}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 font-medium transition-colors ${!iaMode ? "bg-[var(--pbtn-bg)] text-[var(--pbtn-fg)]" : "text-[var(--pmuted)] hover:text-[var(--ptext)]"}`}
              >
                <ListChecks size={14} aria-hidden /> Guiado
              </button>
            </div>
            <button type="button" onClick={() => setChatOpen(false)} className={`${btnGhostIcon} md:hidden`} aria-label="Cerrar chat">
              <PanelLeftClose size={18} aria-hidden />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-[var(--pbtn-bg)] text-[var(--pbtn-fg)]"
                      : "rounded-bl-md border border-[var(--pborder)] bg-[var(--pcard)] text-[var(--ptext)]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {iaBusy && (
              <div className="flex justify-start" aria-label="El asistente está escribiendo">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-[var(--pborder)] bg-[var(--pcard)] px-3.5 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--pfaint)] [animation-delay:-0.3s] motion-reduce:animate-none" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--pfaint)] [animation-delay:-0.15s] motion-reduce:animate-none" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--pfaint)] motion-reduce:animate-none" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-[var(--pborder)] p-3"
          >
            <label htmlFor="cotizador-chat-input" className="sr-only">
              Mensaje para el asistente
            </label>
            <input
              id="cotizador-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={iaMode ? iaBusy : stage === "done"}
              lang="es"
              spellCheck
              autoComplete="on"
              autoCapitalize="sentences"
              enterKeyHint="send"
              placeholder={
                iaMode
                  ? iaBusy
                    ? "Pensando…"
                    : "Describe la cotización o propuesta…"
                  : stage === "done"
                    ? "Cotización lista"
                    : "Escribe aquí…"
              }
              className="min-h-11 flex-1 rounded-full border border-[var(--pborder)] bg-[var(--pinput)] px-4 text-sm text-[var(--ptext)] outline-none placeholder:text-[var(--pfaint)] focus:border-[var(--paccent-line)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={iaMode ? iaBusy : stage === "done"}
              aria-label="Enviar mensaje"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--pbtn-bg)] text-[var(--pbtn-fg)] transition-colors hover:bg-[var(--pbtn-hover)] disabled:opacity-40"
            >
              <Send size={16} aria-hidden />
            </button>
          </form>
        </aside>

        {/* ── DOCUMENTO (derecha) ── */}
        <div className="min-w-0 flex-1 overflow-y-auto bg-[var(--pcanvas)] p-3 sm:p-6 lg:p-8 print:block print:overflow-visible print:bg-white print:p-0">
          <div
            className="quote-paper relative mx-auto max-w-[820px] overflow-hidden rounded-2xl bg-white p-5 text-[#0A2540] shadow-2xl sm:p-8 md:p-10 print:max-w-full print:overflow-visible print:rounded-none print:p-6 print:shadow-none"
          >
            {/* Marca de agua sutil (logo grande de fondo) — solo modo Vanttage */}
            {data.marca !== "personal" && (
              <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center print:fixed">
                <Image
                  src="/logo/logo.png"
                  alt=""
                  width={560}
                  height={560}
                  className="w-[68%] max-w-[560px] object-contain opacity-[0.045]"
                />
              </div>
            )}

            {/* Contenido por encima de la marca de agua */}
            <div className="relative z-10">
            {/* Encabezado */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-6">
              {data.marca === "personal" ? (
                <div>
                  <p className="text-2xl font-bold tracking-tight">{data.marcaNombre || "Carlos Carranza"}</p>
                  <p className="text-xs text-gray-500">{data.marcaTagline || "Soluciones Tecnológicas · Cartagena, Colombia"}</p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Image src="/logo/logo.png" alt="Vanttage" width={72} height={72} className="h-16 w-16 object-contain" />
                  <div>
                    <p className="text-2xl font-bold tracking-tight">Vanttage</p>
                    <p className="text-xs text-gray-500">Software Boutique · Cartagena, Colombia</p>
                  </div>
                </div>
              )}
              <div className="text-right">
                <p className="text-lg font-semibold text-violet-600">{data.titulo || "COTIZACIÓN"}</p>
                <EditText
                  value={data.numero}
                  onChange={(v) => set({ numero: v })}
                  className="text-right text-xs text-gray-500"
                />
                <EditText
                  value={data.fecha}
                  onChange={(v) => set({ fecha: v })}
                  className="text-right text-xs text-gray-500"
                />
              </div>
            </div>

            {/* Cliente */}
            <div className="mt-6 grid grid-cols-2 gap-4 break-inside-avoid">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">Cliente</p>
                <EditText
                  value={data.cliente}
                  placeholder="Nombre del cliente"
                  onChange={(v) => set({ cliente: v })}
                  className="text-sm font-medium"
                />
                <EditText
                  value={data.empresa}
                  placeholder="Empresa"
                  onChange={(v) => set({ empresa: v })}
                  className="text-sm text-gray-500"
                />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">Emitida por</p>
                <EditText
                  value={data.asesor}
                  onChange={(v) => set({ asesor: v })}
                  className="text-right text-sm font-semibold"
                />
                <EditText
                  value={data.asesorCargo}
                  onChange={(v) => set({ asesorCargo: v })}
                  className="text-right text-xs text-violet-600"
                />
                {data.marca !== "personal" && (
                  <p className="text-xs text-gray-500">Vanttage · vanttagetech.com</p>
                )}
              </div>
            </div>

            {/* Proyecto */}
            <div className="mt-6 break-inside-avoid">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                {esPropuesta ? "Propuesta" : "Proyecto"}
              </p>
              <EditText
                value={data.proyecto}
                onChange={(v) => set({ proyecto: v })}
                className="text-base font-semibold"
              />
              <EditArea
                value={data.resumen}
                onChange={(v) => set({ resumen: v })}
                className="mt-1 text-sm leading-relaxed text-gray-600 text-justify"
              />
            </div>

            {/* Secciones narrativas (solo propuesta) */}
            {esPropuesta && (
              <>
                <div className="mt-6 break-inside-avoid">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Contexto y situación</p>
                  <EditArea
                    value={data.contexto ?? ""}
                    onChange={(v) => set({ contexto: v })}
                    className="mt-1 text-sm leading-relaxed text-gray-600 text-justify"
                  />
                </div>
                <div className="mt-4 break-inside-avoid">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Objetivo de la propuesta</p>
                  <EditArea
                    value={data.objetivo ?? ""}
                    onChange={(v) => set({ objetivo: v })}
                    className="mt-1 text-sm leading-relaxed text-gray-600 text-justify"
                  />
                </div>
              </>
            )}

            {esPropuesta ? (
              /* ── PROPUESTA: servicios como tarjetas con etiqueta de precio ── */
              <div className="mt-6">
                <p className="mb-3 break-after-avoid text-[10px] font-semibold uppercase tracking-wider text-violet-600">Servicios propuestos</p>
                <div className="space-y-3">
                  {data.items.map((it, i) => {
                    const c = it.color || "#7c3aed";
                    return (
                    <div
                      key={i}
                      className={`group break-inside-avoid rounded-xl border border-gray-200 p-4 ${i === 0 ? "break-before-avoid" : ""}`}
                      style={{ borderLeftWidth: 4, borderLeftColor: c }}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                        <EditArea
                          value={it.concepto}
                          onChange={(v) => editItem(i, { concepto: v })}
                          className="min-w-0 flex-1 text-sm leading-relaxed text-justify"
                        />
                        <div className="flex flex-row-reverse items-center justify-end gap-1.5 sm:flex-col sm:items-end">
                          <input
                            value={it.etiqueta ?? (it.valor ? fmt(it.valor) : "")}
                            onChange={(e) => editItem(i, { etiqueta: e.target.value })}
                            placeholder="Precio"
                            style={{ borderColor: `${c}55`, background: `${c}14`, color: c }}
                            className="w-32 rounded-full border px-3 py-1 text-right text-xs font-semibold outline-none sm:w-40"
                          />
                          <button
                            onClick={() => delItem(i)}
                            aria-label="Eliminar servicio"
                            className="no-print text-gray-300 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
                <button
                  onClick={addItem}
                  className="no-print mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700"
                >
                  <Plus size={14} /> Agregar servicio
                </button>

                {/* Beneficios */}
                <div className="mt-6 break-inside-avoid">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Beneficios</p>
                  <EditArea
                    value={data.beneficios ?? ""}
                    onChange={(v) => set({ beneficios: v })}
                    className="mt-1 text-sm leading-relaxed text-gray-600 text-justify"
                  />
                </div>

                {/* Inversión: subtotal + descuento + total (solo si hay valores numéricos) */}
                {subtotal > 0 && (
                  <div className="mt-6 space-y-1.5 break-inside-avoid">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-violet-600">Inversión</p>
                    {/* Subtotal y descuento: en PDF solo salen si hay descuento (evita "Descuento 0%") */}
                    <div className={`flex items-center justify-between px-5 text-sm text-gray-500 ${data.descuento ? "" : "print:hidden"}`}>
                      <span>Subtotal</span>
                      <span>{fmt(subtotal)}</span>
                    </div>
                    <div className={`flex items-center justify-between px-5 text-sm text-gray-500 ${data.descuento ? "" : "print:hidden"}`}>
                      <span className="flex items-center gap-1.5">
                        Descuento
                        <input
                          value={data.descuento || 0}
                          onChange={(e) => set({ descuento: soloNumero(e.target.value) })}
                          className="w-10 rounded border border-transparent bg-transparent text-right outline-none hover:border-gray-200 focus:border-violet-300 print:hover:border-transparent"
                        />
                        %
                      </span>
                      <span className="text-emerald-600">– {fmt(descuentoMonto)}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between rounded-xl bg-[#0A2540] px-5 py-3 text-white">
                      <span className="text-sm font-medium">Total</span>
                      <span className="text-lg font-bold">{fmt(total)}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── COTIZACIÓN: tabla + total ── */
              <div className="mt-6">
                <div className="grid grid-cols-[1fr_auto] gap-2 border-b-2 border-[#0A2540] pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  <span>Concepto</span>
                  <span className="text-right">Valor</span>
                </div>
                {data.items.map((it, i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-[1fr_auto] items-start gap-2 border-b border-gray-100 py-2.5"
                  >
                    <EditArea
                      value={it.concepto}
                      onChange={(v) => editItem(i, { concepto: v })}
                      className="text-sm leading-relaxed"
                    />
                    <div className="flex items-center justify-end gap-2 pt-0.5">
                      <input
                        value={it.valor ? it.valor.toLocaleString("es-CO") : ""}
                        onChange={(e) => editItem(i, { valor: soloNumero(e.target.value) })}
                        placeholder="0"
                        className="w-28 rounded border border-transparent bg-transparent py-0.5 text-right text-sm font-medium outline-none hover:border-gray-200 focus:border-violet-300 print:hover:border-transparent"
                      />
                      <button
                        onClick={() => delItem(i)}
                        aria-label="Eliminar ítem"
                        className="no-print text-gray-300 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addItem}
                  className="no-print mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700"
                >
                  <Plus size={14} /> Agregar ítem
                </button>

                <div className="mt-4 space-y-1.5 break-inside-avoid">
                  <div className="flex items-center justify-between px-5 text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      Descuento
                      <input
                        value={data.descuento || 0}
                        onChange={(e) => set({ descuento: soloNumero(e.target.value) })}
                        className="w-10 rounded border border-transparent bg-transparent text-right outline-none hover:border-gray-200 focus:border-violet-300 print:hover:border-transparent"
                      />
                      %
                    </span>
                    <span className="text-emerald-600">– {fmt(descuentoMonto)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between rounded-xl bg-[#0A2540] px-5 py-3 text-white">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-lg font-bold">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Condiciones */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm break-inside-avoid">
              <Condicion label="Entrega" value={data.entrega} onChange={(v) => set({ entrega: v })} />
              <Condicion label="Forma de pago" value={data.formaPago} onChange={(v) => set({ formaPago: v })} />
              <Condicion label="Validez" value={data.validez} onChange={(v) => set({ validez: v })} />
            </div>

            {/* Observaciones */}
            <div className="mt-6 break-inside-avoid">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                Observaciones
              </p>
              <EditArea
                value={data.notas}
                onChange={(v) => set({ notas: v })}
                className="mt-1 text-[13px] leading-relaxed text-gray-600"
              />
            </div>

            {/* Datos de pago */}
            <div className="mt-4 break-inside-avoid rounded-xl border border-violet-100 bg-violet-50/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-600">
                💳 Datos de pago
              </p>
              <EditArea
                value={data.mediosPago}
                onChange={(v) => set({ mediosPago: v })}
                className="mt-1 text-[13px] leading-relaxed text-[#0A2540]"
              />
            </div>

            {/* Referencias · trabajos realizados (solo propuesta) */}
            {esPropuesta && (
              <div className="mt-6 break-inside-avoid rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">
                  Referencias · Trabajos realizados
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {data.referenciaTexto ||
                    "Portafolio de desarrollos y proyectos realizados con Vanttage:"}{" "}
                  <a
                    href={data.referenciaUrl || "https://vanttagetech.com/proyectos"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-violet-600 underline"
                  >
                    {(data.referenciaUrl || "https://vanttagetech.com/proyectos").replace(/^https?:\/\//, "")}
                  </a>
                </p>
              </div>
            )}

            {/* Firma (solo propuesta) */}
            {esPropuesta && (
              <div className="mt-8 break-inside-avoid">
                <div>
                  <p className="text-lg font-bold text-[#0A2540]">{data.asesor}</p>
                  {data.firmaEmail && <p className="text-xs text-gray-600">{data.firmaEmail}</p>}
                  <p className="text-xs text-gray-500">{data.asesorCargo}</p>
                  {data.firmaCC && <p className="text-xs text-gray-500">C.C. {data.firmaCC}</p>}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 break-inside-avoid border-t border-gray-200 pt-5 text-center text-xs text-gray-500">
              <p className="font-medium text-[#0A2540]">¿Avanzamos? 🚀</p>
              <p className="mt-1">
                {data.contacto ||
                  "WhatsApp +57 310 508 0356 · vanttagectg@gmail.com · vanttagetech.com"}
              </p>
              <p className="mt-1 text-gray-600">
                {data.marca === "personal"
                  ? "Cartagena, Colombia · Soluciones tecnológicas a la medida."
                  : "Cartagena, Colombia · Diseño único, código limpio, resultados reales."}
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

/* ─────────── Campos editables (se ven como texto, editan al vuelo) ─────────── */
function EditText({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        lang="es"
        spellCheck
        autoCapitalize="sentences"
        className={`w-full rounded border border-transparent bg-transparent px-1 py-0.5 outline-none hover:border-gray-200 focus:border-violet-300 print:hidden ${className}`}
      />
      {/* Versión estática para PDF (el input se recorta al paginar) */}
      <div className={`hidden px-1 py-0.5 print:block ${className}`}>{value}</div>
    </>
  );
}

function EditArea({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
        lang="es"
        spellCheck
        autoCapitalize="sentences"
        className={`w-full resize-none overflow-hidden rounded border border-transparent bg-transparent px-1 py-0.5 outline-none hover:border-gray-200 focus:border-violet-300 print:hidden ${className}`}
      />
      {/* Versión estática para PDF: texto que fluye y pagina sin recortarse */}
      <div className={`hidden whitespace-pre-wrap px-1 py-0.5 print:block ${className}`}>{value}</div>
    </>
  );
}

function Condicion({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">{label}</p>
      <EditArea value={value} onChange={onChange} className="mt-0.5 text-[13px] leading-snug text-[#0A2540]" />
    </div>
  );
}
