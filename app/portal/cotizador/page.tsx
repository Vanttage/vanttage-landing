"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Send, Plus, Trash2, Printer, RotateCcw, Save } from "lucide-react";

/* ─────────── Tipos ─────────── */
interface Item {
  concepto: string;
  valor: number;
}
interface Cotizacion {
  numero: string;
  fecha: string;
  cliente: string;
  empresa: string;
  proyecto: string;
  resumen: string;
  items: Item[];
  entrega: string;
  formaPago: string;
  validez: string;
  notas: string;
  mediosPago: string;
  asesor: string;
  asesorCargo: string;
  descuento: number;
}

/* ─────────── Datos por defecto (tienda de camisetas) ─────────── */
const HOY = new Date().toLocaleDateString("es-CO", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const DEFAULT: Cotizacion = {
  numero: "COT-" + new Date().getFullYear() + "-001",
  fecha: HOY,
  cliente: "Mileidys Ramírez",
  empresa: "",
  proyecto: "Tienda virtual (e-commerce) para venta de camisetas y más",
  resumen:
    "Desarrollo de una tienda virtual profesional y a la medida para comercializar tus camisetas y demás productos, con panel de administración propio, carrito de compras y pagos por transferencia (sin pasarelas ni comisiones).",
  items: [
    {
      concepto:
        "Desarrollo completo de la tienda virtual (e-commerce), incluye:\n" +
        "• Diseño único adaptado a tu marca (logo, colores, estilo)\n" +
        "• Catálogo de productos con fotos, precios y variantes (tallas/colores)\n" +
        "• Carrito de compras para acumular varios productos\n" +
        "• Checkout con medios de pago manuales (transferencia) — sin pasarelas ni comisiones\n" +
        "• Panel de administración para que tú edites productos, imágenes y precios\n" +
        "• Optimización SEO para aparecer en Google\n" +
        "• Base de datos en la nube (Supabase) para tus productos y pedidos\n" +
        "• Responsive (celular, tablet y PC) + publicación en internet",
      valor: 2000000,
    },
    { concepto: "Hosting + dominio .com por 1 año (incluido)", valor: 0 },
    { concepto: "Soporte y garantía por 1 mes tras la entrega (incluido)", valor: 0 },
  ],
  entrega: "3 a 4 semanas",
  formaPago: "50% para iniciar, 50% contra entrega",
  validez: "15 días",
  notas:
    "Las modificaciones de diseño, nuevas funciones o cambios en la tienda después de la entrega tienen costo adicional. Ofrecemos un plan de soporte y mantenimiento mensual que incluye cambios, actualizaciones y acompañamiento continuo (valor mensual a convenir según necesidades).",
  mediosPago:
    "Carlos Carranza V. · CC 1238338732\n" +
    "Bancolombia: 085-938307-06 (Ahorros)\n" +
    "Nu: 68309764 (NuPlaca: XNR732 / @XNR732)\n" +
    "Nequi / Daviplata: 3105080356\n" +
    "Bre-B (Llave): 1238338732\n" +
    "PayPal: @CarlosCarranza29\n" +
    "Envía el comprobante o captura al confirmar la transferencia. ¡Gracias! 🙏",
  asesor: "Carlos Carranza",
  asesorCargo: "Asesor · Líder de proyecto",
  descuento: 30,
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

const PREGUNTAS: Record<Stage, string> = {
  cliente: "¡Hola! 👋 Armemos la cotización. ¿Nombre del cliente o contacto?",
  empresa: "¿Nombre del negocio o empresa? (si no tiene, escribe “-”)",
  proyecto: "¿Título del proyecto? (Enter para dejar el sugerido)",
  resumen: "Describe brevemente el alcance. (Enter para dejar el sugerido)",
  itemConcepto:
    "Agreguemos los ítems. Escribe un concepto, o “listo” para pasar a las condiciones.",
  itemValor: "¿Valor de ese ítem en COP? (solo números)",
  entrega: "¿Tiempo estimado de entrega?",
  formaPago: "¿Forma de pago?",
  validez: "¿Validez de la cotización?",
  done: "✅ ¡Listo! Revisa la plantilla a la derecha. Puedes editar cualquier campo directamente y luego descargar el PDF.",
};

export default function CotizadorPage() {
  const [data, setData] = useState<Cotizacion>(DEFAULT);
  const [stage, setStage] = useState<Stage>("cliente");
  const [tmpConcepto, setTmpConcepto] = useState("");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: PREGUNTAS.cliente }]);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const set = (patch: Partial<Cotizacion>) => setData((d) => ({ ...d, ...patch }));
  const bot = (text: string) => setMsgs((m) => [...m, { from: "bot", text }]);
  const goto = (s: Stage) => {
    setStage(s);
    bot(PREGUNTAS[s]);
  };

  function handleSend() {
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
        bot(`Añadido: ${nuevo.concepto} — ${fmt(soloNumero(val))}`);
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

  function reset() {
    setData(DEFAULT);
    setStage("cliente");
    setTmpConcepto("");
    setMsgs([{ from: "bot", text: PREGUNTAS.cliente }]);
  }

  const subtotal = data.items.reduce((s, i) => s + (i.valor || 0), 0);
  const descuentoMonto = Math.round((subtotal * (data.descuento || 0)) / 100);
  const total = subtotal - descuentoMonto;

  async function guardar() {
    setSaving(true);
    setSavedMsg("");
    try {
      const res = await fetch("/api/portal/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos: data, subtotal, total }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSavedMsg(json.error === "DB no configurada" ? "Falta conectar la BD" : "Error al guardar");
      } else {
        set({ numero: json.numero });
        setSavedMsg(`Guardada ✓ ${json.numero}`);
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

  return (
    <div className="flex h-screen flex-col print:block print:h-auto">
      {/* Toolbar */}
      <header className="no-print flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div>
          <p className="text-sm font-semibold">Cotizador · Vanttage</p>
          <p className="text-xs text-white/40">Chat a la izquierda · plantilla editable a la derecha</p>
        </div>
        <div className="flex items-center gap-2">
          {savedMsg && <span className="text-xs text-emerald-400">{savedMsg}</span>}
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70 hover:bg-white/5"
          >
            <RotateCcw size={13} /> Reiniciar
          </button>
          <button
            onClick={guardar}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
          >
            <Save size={14} /> {saving ? "Guardando…" : "Guardar"}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/25"
          >
            <Printer size={14} /> Descargar PDF
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 print:block print:min-h-0">
        {/* ── CHAT (izquierda) ── */}
        <aside className="no-print flex w-[360px] shrink-0 flex-col border-r border-white/10 bg-[#0A0A14]">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "rounded-tr-sm bg-gradient-to-br from-violet-500 to-indigo-500 text-white"
                      : "rounded-tl-sm bg-white/5 text-white/80"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={stage === "done"}
              placeholder={stage === "done" ? "Cotización lista ✓" : "Escribe aquí..."}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-violet-400/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={stage === "done"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </form>
        </aside>

        {/* ── PLANTILLA (derecha) ── */}
        <main className="flex-1 overflow-y-auto bg-[#0f0f18] p-6 print:block print:overflow-visible print:bg-white print:p-0">
          <div
            className="quote-paper relative mx-auto max-w-[820px] overflow-hidden rounded-2xl bg-white p-10 text-[#0A2540] shadow-2xl print:max-w-full print:overflow-visible print:rounded-none print:p-6 print:shadow-none"
          >
            {/* Marca de agua sutil (logo grande de fondo) */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center print:fixed">
              <Image
                src="/logo/logo.png"
                alt=""
                width={560}
                height={560}
                className="w-[68%] max-w-[560px] object-contain opacity-[0.045]"
              />
            </div>

            {/* Contenido por encima de la marca de agua */}
            <div className="relative z-10">
            {/* Encabezado */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-4">
                <Image src="/logo/logo.png" alt="Vanttage" width={72} height={72} className="h-16 w-16 object-contain" />
                <div>
                  <p className="text-2xl font-bold tracking-tight">Vanttage</p>
                  <p className="text-xs text-gray-500">Software Boutique · Cartagena, Colombia</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-violet-600">COTIZACIÓN</p>
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
            <div className="mt-6 grid grid-cols-2 gap-4">
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
                <p className="text-xs text-gray-500">Vanttage · vanttagetech.com</p>
              </div>
            </div>

            {/* Proyecto */}
            <div className="mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">Proyecto</p>
              <EditText
                value={data.proyecto}
                onChange={(v) => set({ proyecto: v })}
                className="text-base font-semibold"
              />
              <EditArea
                value={data.resumen}
                onChange={(v) => set({ resumen: v })}
                className="mt-1 text-sm leading-relaxed text-gray-600"
              />
            </div>

            {/* Tabla de ítems */}
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
                      className="no-print text-gray-300 opacity-0 transition group-hover:opacity-100 hover:text-red-500"
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

              {/* Subtotal + descuento + total */}
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

            {/* Footer */}
            <div className="mt-8 break-inside-avoid border-t border-gray-200 pt-5 text-center text-xs text-gray-500">
              <p className="font-medium text-[#0A2540]">¿Aprobamos y arrancamos? 🚀</p>
              <p className="mt-1">
                WhatsApp +57 310 508 0356 · vanttagectg@gmail.com · vanttagetech.com
              </p>
              <p className="mt-1 text-gray-600">
                Cartagena, Colombia · Diseño único, código limpio, resultados reales.
              </p>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
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
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded border border-transparent bg-transparent px-1 py-0.5 outline-none hover:border-gray-200 focus:border-violet-300 print:hover:border-transparent ${className}`}
    />
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
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      className={`w-full resize-none overflow-hidden rounded border border-transparent bg-transparent px-1 py-0.5 outline-none hover:border-gray-200 focus:border-violet-300 print:hover:border-transparent ${className}`}
    />
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
