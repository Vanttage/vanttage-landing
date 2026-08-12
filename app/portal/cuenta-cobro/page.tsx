"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";

/* ─────────── Datos de la cuenta de cobro ─────────── */
interface Cuenta {
  consecutivo: string;
  fecha: string;
  refCotizacion: string;
  ciudad: string;
  clienteNombre: string;
  clienteNit: string;
  contacto: string;
  concepto: string;
  porcentaje: string;
  valorDesarrolloBruto: string;
  descuentoPct: string;
  descuentoMonto: string;
  valorDominio: string;
  valorTotalProyecto: string;
  anticipoDesarrollo: string;
  anticipoDominio: string;
  montoNumeros: string;
  montoLetras: string;
}

const HOY = new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });

const DEFAULT: Cuenta = {
  consecutivo: "CC-2026-001",
  fecha: HOY,
  refCotizacion: "COT-2026-011",
  ciudad: "Cartagena de Indias",
  clienteNombre: "Daz Ambiental Consultorías, Asesorías y Servicios",
  clienteNit: "901.964.412",
  contacto: "Zulay",
  concepto:
    "Anticipo del cincuenta por ciento (50%) para el inicio del proyecto “Misión Mapache: diagnóstico interactivo gamificado”, incluyendo el desarrollo y el dominio propio con hosting, según cotización COT-2026-011 aprobada por el cliente.",
  porcentaje: "50%",
  valorDesarrolloBruto: "$2.000.000",
  descuentoPct: "10%",
  descuentoMonto: "– $200.000",
  valorDominio: "$200.000",
  valorTotalProyecto: "$2.000.000",
  anticipoDesarrollo: "$900.000",
  anticipoDominio: "$100.000",
  montoNumeros: "$1.000.000",
  montoLetras: "Un millón de pesos m/cte",
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
  "No responsable de IVA (Responsabilidad 49 — RUT DIAN).",
  "No obligado a facturar electrónicamente (persona natural no responsable de IVA).",
  "Documento equivalente a factura para efectos de cobro de servicios personales.",
];

export default function CuentaCobroPage() {
  const [d, setD] = useState<Cuenta>(DEFAULT);
  const set = (patch: Partial<Cuenta>) => setD((prev) => ({ ...prev, ...patch }));

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
    <div className="min-h-screen bg-[#0b0b13] text-white print:min-h-0 print:bg-white">
      {/* Toolbar */}
      <header className="no-print flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/cotizaciones"
            title="Volver"
            aria-label="Volver"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <p className="text-sm font-semibold">Cuenta de cobro · Vanttage</p>
            <p className="text-xs text-white/40">Edita los campos y descarga el PDF (una página)</p>
          </div>
        </div>
        <button
          onClick={descargarPdf}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/25 sm:px-4"
        >
          <Printer size={14} /> <span className="hidden sm:inline">Descargar </span>PDF
        </button>
      </header>

      {/* Documento */}
      <main className="overflow-y-auto p-3 sm:p-6 print:overflow-visible print:p-0">
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
                <p className="text-right text-[11px] text-gray-400">Ref. cotización: <Edit value={d.refCotizacion} onChange={(v) => set({ refCotizacion: v })} className="inline text-gray-500" inline /></p>
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Debe a</p>
                <Edit value={d.clienteNombre} placeholder="Nombre o razón social" onChange={(v) => set({ clienteNombre: v })} className="text-sm font-semibold" />
                <div className="text-xs text-gray-500">
                  NIT/C.C.: <Edit value={d.clienteNit} placeholder="Pendiente" onChange={(v) => set({ clienteNit: v })} className="inline" inline />
                </div>
                <div className="text-xs text-gray-500">
                  Contacto: <Edit value={d.contacto} onChange={(v) => set({ contacto: v })} className="inline" inline />
                </div>
              </div>
            </div>

            {/* Concepto */}
            <div className="mt-6 break-inside-avoid">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">Por concepto de</p>
              <EditArea value={d.concepto} onChange={(v) => set({ concepto: v })} className="mt-1 text-sm leading-relaxed text-gray-700 text-justify" />

              {/* Desglose: valor del proyecto (con dominio) + anticipo del 50% */}
              <div className="mt-3 rounded-xl bg-violet-50/70 px-4 py-3 text-[13px] text-gray-600">
                <div className="flex items-center justify-between py-0.5">
                  <span>Desarrollo del proyecto (Misión Mapache)</span>
                  <Edit value={d.valorDesarrolloBruto} onChange={(v) => set({ valorDesarrolloBruto: v })} className="text-right font-medium text-[#0A2540]" inline />
                </div>
                <div className="flex items-center justify-between py-0.5 text-emerald-700">
                  <span>Descuento aplicado (<Edit value={d.descuentoPct} onChange={(v) => set({ descuentoPct: v })} className="text-emerald-700" inline />) según cotización</span>
                  <Edit value={d.descuentoMonto} onChange={(v) => set({ descuentoMonto: v })} className="text-right font-medium text-emerald-700" inline />
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>Dominio propio + hosting</span>
                  <Edit value={d.valorDominio} onChange={(v) => set({ valorDominio: v })} className="text-right font-medium text-[#0A2540]" inline />
                </div>
                <div className="mt-1 flex items-center justify-between border-t border-violet-200 pt-1.5 font-semibold text-[#0A2540]">
                  <span>Total del proyecto</span>
                  <Edit value={d.valorTotalProyecto} onChange={(v) => set({ valorTotalProyecto: v })} className="text-right font-semibold text-[#0A2540]" inline />
                </div>
                <p className="mt-2 text-[12px] text-gray-500">
                  La presente cuenta de cobro corresponde al anticipo del{" "}
                  <Edit value={d.porcentaje} onChange={(v) => set({ porcentaje: v })} className="font-semibold text-[#0A2540]" inline /> del proyecto:
                </p>
                <div className="flex items-center justify-between py-0.5">
                  <span>50% del desarrollo</span>
                  <Edit value={d.anticipoDesarrollo} onChange={(v) => set({ anticipoDesarrollo: v })} className="text-right font-medium text-[#0A2540]" inline />
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>50% del dominio</span>
                  <Edit value={d.anticipoDominio} onChange={(v) => set({ anticipoDominio: v })} className="text-right font-medium text-[#0A2540]" inline />
                </div>
              </div>
            </div>

            {/* Valor destacado */}
            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#0A2540] px-5 py-4 text-white break-inside-avoid">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Valor a pagar</p>
                <Edit value={d.montoLetras} onChange={(v) => set({ montoLetras: v })} className="text-xs text-white/80" dark />
              </div>
              <Edit value={d.montoNumeros} onChange={(v) => set({ montoNumeros: v })} inline className="text-2xl font-bold" dark />
            </div>

            {/* Datos de pago */}
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
                  Envía el comprobante al confirmar la transferencia (puedes subirlo a la carpeta compartida del proyecto en Drive).
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
      </main>
    </div>
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
    // Ancho ajustado al contenido para que fluya dentro del texto
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
