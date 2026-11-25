"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Printer, Plus, Trash2 } from "lucide-react";
import PortalShell from "../_components/PortalShell";
import { btnPrimary } from "../_components/ui";

/* ─────────── Datos de la cuenta de cobro ─────────── */
interface LineItem {
  desc: string;
  valor: number;
}

interface Cuenta {
  consecutivo: string;
  fecha: string;
  refCotizacion: string;
  ciudad: string;
  clienteNombre: string;
  clienteNit: string;
  contacto: string;
  concepto: string;
  items: LineItem[];
  montoLetras: string;
  notaExtra: string;
}

const HOY = new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Bogota" });
const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const soloNumero = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;

const DEFAULT: Cuenta = {
  consecutivo: "CC-2026-004",
  fecha: HOY,
  refCotizacion: "COT-2026-011",
  ciudad: "Cartagena de Indias",
  clienteNombre: "Daz Ambiental Consultorías, Asesorías y Servicios",
  clienteNit: "901.964.412",
  contacto: "Zulay",
  concepto: "Saldo (50% restante) del proyecto Misión Mapache, según cotización COT-2026-011 aprobada por el cliente.",
  items: [
    {
      desc:
        "Saldo (50% restante) del desarrollo de la plataforma web «Misión Mapache: diagnóstico interactivo gamificado».",
      valor: 900000,
    },
    {
      desc: "Saldo (50% restante) del dominio propio + hosting.",
      valor: 100000,
    },
  ],
  montoLetras: "Un millón de pesos m/cte",
  notaExtra:
    "Corresponde al 50% restante del proyecto; el anticipo del 50% ($1.000.000, cuenta CC-2026-001) fue cancelado al inicio, para un valor total de $2.000.000 (desarrollo $1.800.000 con el 10% de descuento aplicado + dominio $200.000). Si requiere facturación electrónica, el valor variaría por el IVA y otros impuestos; manejándolo mediante cuenta de cobro, se mantiene el mismo valor.",
};

const EMISOR = {
  nombre: "Carlos José Carranza Villera",
  cargo: "Asesor · Líder de proyecto",
  documento: "CC 1.238.338.732",
  ciudad: "Cartagena, Colombia",
  contacto: "WhatsApp +57 310 508 0356 · carforck@gmail.com · vanttagetech.com",
  web: "vanttagetech.com",
};

const PAGOS = [
  { medio: "Bancolombia", detalle: "085-938307-06 (Ahorros)" },
  { medio: "Nu", detalle: "68309764 (NuPlaca: XNR732 / @XNR732)" },
  { medio: "Nequi / Daviplata", detalle: "3105080356" },
  { medio: "Bre-B (Llave)", detalle: "1238338732" },
  { medio: "PayPal", detalle: "@CarlosCarranza29" },
];

const NOTAS_LEGALES = [
  "No responsable de IVA (Responsabilidad 49 · RUT DIAN).",
  "No obligado a facturar electrónicamente (persona natural no responsable de IVA).",
  "Documento equivalente a factura para efectos de cobro de servicios personales.",
];

export default function CuentaCobro() {
  const [d, setD] = useState<Cuenta>(DEFAULT);
  const set = (patch: Partial<Cuenta>) => setD((prev) => ({ ...prev, ...patch }));
  const editItem = (i: number, patch: Partial<LineItem>) =>
    setD((prev) => ({ ...prev, items: prev.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) }));
  const addItem = () => setD((prev) => ({ ...prev, items: [...prev.items, { desc: "Nuevo concepto", valor: 0 }] }));
  const delItem = (i: number) => setD((prev) => ({ ...prev, items: prev.items.filter((_, idx) => idx !== i) }));

  const total = d.items.reduce((s, it) => s + (it.valor || 0), 0);

  function descargarPdf() {
    const prev = document.title;
    const nombre = `${d.consecutivo || "Cuenta de cobro"} - ${d.clienteNombre || d.contacto || "Cliente"}`
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

  return (
    <PortalShell
      variant="app"
      title="Cuenta de cobro"
      subtitle="Edita los campos y descarga el PDF (una página)"
      backHref="/portal/cotizaciones"
      backLabel="Volver a Cotizaciones"
      actions={
        <button type="button" onClick={descargarPdf} aria-label="Descargar PDF" className={`${btnPrimary} w-11 px-0 sm:w-auto sm:px-5`}>
          <Printer size={16} aria-hidden /> <span className="hidden sm:inline">Descargar PDF</span>
        </button>
      }
    >
      {/* Documento */}
      <div className="min-h-0 flex-1 overflow-y-auto bg-[var(--pcanvas)] p-3 sm:p-6 lg:p-8 print:overflow-visible print:bg-white print:p-0">
        <div className="quote-paper relative mx-auto max-w-[820px] overflow-hidden rounded-2xl bg-white p-5 text-[#0A2540] shadow-2xl sm:p-8 md:p-10 print:max-w-full print:rounded-none print:p-6 print:shadow-none">
          {/* Marca de agua */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <Image src="/logo/logo.png" alt="" width={560} height={560} className="w-[68%] max-w-[560px] object-contain opacity-[0.045]" />
          </div>

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
                <p className="text-lg font-semibold text-violet-600">CUENTA DE COBRO</p>
                <Edit value={d.consecutivo} onChange={(v) => set({ consecutivo: v })} className="text-right text-xs text-gray-500" />
                <Edit value={d.fecha} onChange={(v) => set({ fecha: v })} className="text-right text-xs text-gray-500" />
                {(d.refCotizacion || "").trim() && (
                  <p className="text-right text-[11px] text-gray-400">
                    Ref. cotización: <Edit value={d.refCotizacion} onChange={(v) => set({ refCotizacion: v })} className="text-gray-500" inline />
                  </p>
                )}
              </div>
            </div>

            {/* Emisor / Deudor */}
            <div className="mt-6 grid grid-cols-2 gap-6 break-inside-avoid">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">De</p>
                <p className="text-sm font-semibold">{EMISOR.nombre}</p>
                <p className="text-xs text-violet-600">{EMISOR.cargo}</p>
                <p className="text-xs text-gray-500">{EMISOR.documento} · {EMISOR.ciudad}</p>
                <p className="mt-1 text-xs text-gray-500">{EMISOR.contacto}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Para</p>
                <Edit value={d.clienteNombre} placeholder="Nombre o razón social" onChange={(v) => set({ clienteNombre: v })} className="text-sm font-semibold" />
                <div className="text-xs text-gray-500">
                  NIT/C.C.: <Edit value={d.clienteNit} placeholder="Pendiente" onChange={(v) => set({ clienteNit: v })} inline />
                </div>
                <div className="text-xs text-gray-500">
                  Contacto: <Edit value={d.contacto} onChange={(v) => set({ contacto: v })} inline />
                </div>
              </div>
            </div>

            {/* Concepto + conceptos con valor */}
            <div className="mt-6 break-inside-avoid">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">Por concepto de</p>
              <EditArea value={d.concepto} onChange={(v) => set({ concepto: v })} className="mt-1 text-sm leading-relaxed text-gray-700 text-justify" />

              <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                {d.items.map((it, i) => (
                  <div key={i} className="group flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-2.5 last:border-0">
                    <EditArea value={it.desc} onChange={(v) => editItem(i, { desc: v })} className="flex-1 text-sm leading-relaxed text-gray-700 text-justify" />
                    <div className="flex items-center gap-2 pt-0.5">
                      <input
                        value={it.valor ? it.valor.toLocaleString("es-CO") : ""}
                        onChange={(e) => editItem(i, { valor: soloNumero(e.target.value) })}
                        placeholder="0"
                        className="w-28 rounded border border-transparent bg-transparent py-0.5 text-right text-sm font-semibold text-[#0A2540] outline-none hover:border-gray-200 focus:border-violet-300"
                      />
                      <button onClick={() => delItem(i)} className="no-print text-gray-300 opacity-0 transition group-hover:opacity-100 hover:text-red-500" aria-label="Eliminar concepto">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="no-print mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700">
                <Plus size={14} /> Agregar concepto
              </button>

              {(d.notaExtra || "").trim() && (
                <div className="mt-3 rounded-xl bg-violet-50/70 px-4 py-2 text-[13px] leading-relaxed text-gray-600">
                  <EditArea value={d.notaExtra} onChange={(v) => set({ notaExtra: v })} className="text-[13px] leading-relaxed text-gray-600 text-justify" />
                </div>
              )}
            </div>

            {/* Valor destacado */}
            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#0A2540] px-5 py-4 text-white break-inside-avoid">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Valor a pagar</p>
                <Edit value={d.montoLetras} onChange={(v) => set({ montoLetras: v })} className="text-xs text-white/80" dark />
              </div>
              <span className="shrink-0 text-2xl font-bold">{fmt(total)}</span>
            </div>

            {/* Datos de pago + notas */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1.2fr_1fr] break-inside-avoid">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Datos de pago</p>
                <p className="mt-1 text-xs font-medium text-[#0A2540]">Carlos Carranza V. · CC 1238338732</p>
                <div className="mt-2 space-y-1">
                  {PAGOS.map((p) => (
                    <div key={p.medio} className="flex justify-between text-xs text-gray-600">
                      <span className="text-gray-500">{p.medio}</span>
                      <span className="font-medium text-[#0A2540]">{p.detalle}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-gray-400">
                  Envía el comprobante al confirmar la transferencia.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">Notas</p>
                <ul className="mt-1 space-y-1">
                  {NOTAS_LEGALES.map((n) => (
                    <li key={n} className="text-[11px] leading-snug text-gray-500">• {n}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Firma */}
            <div className="mt-8 break-inside-avoid">
              <div className="w-64">
                <div className="border-t border-gray-400 pt-2">
                  <p className="text-sm font-semibold">{EMISOR.nombre}</p>
                  <p className="text-xs text-gray-500">CC 1.238.338.732</p>
                  <p className="text-xs text-violet-600">Asesor · Líder de proyecto — Vanttage</p>
                </div>
              </div>
            </div>

            {/* Pie */}
            <div className="mt-8 break-inside-avoid border-t border-gray-200 pt-4 text-center text-[11px] text-gray-400">
              {d.ciudad} · {d.fecha} · Vanttage · {EMISOR.web}
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

/* ─────────── Editores (invisibles hasta hover; imprimen su valor) ─────────── */
function Edit({
  value,
  onChange,
  placeholder,
  className = "",
  inline = false,
  dark = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  inline?: boolean;
  dark?: boolean;
}) {
  const border = dark ? "hover:border-white/30 focus:border-white/50" : "hover:border-gray-200 focus:border-violet-300";
  const common = `rounded border border-transparent bg-transparent px-0.5 outline-none ${border} ${className}`;
  if (inline) {
    const len = Math.max((value || placeholder || "").length, 3);
    return (
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        lang="es"
        spellCheck
        style={{ width: `${len + 1}ch` }}
        className={`inline align-baseline ${common}`}
      />
    );
  }
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      lang="es"
      spellCheck
      className={`block w-full ${common}`}
    />
  );
}

function EditArea({ value, onChange, className = "" }: { value: string; onChange: (v: string) => void; className?: string }) {
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
      lang="es"
      spellCheck
      className={`block w-full resize-none overflow-hidden rounded border border-transparent bg-transparent px-0.5 outline-none hover:border-gray-200 focus:border-violet-300 ${className}`}
    />
  );
}
