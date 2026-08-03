/* ─────────── Tipos del cotizador ─────────── */
export interface Item {
  concepto: string;
  valor: number;
  etiqueta?: string;
  color?: string;
}

export interface Cotizacion {
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
  /* Marca: "vanttage" (por defecto, con logo) o "personal" (sin logo Vanttage) */
  marca?: "vanttage" | "personal";
  marcaNombre?: string;
  marcaTagline?: string;
  titulo?: string;
  contacto?: string;
  /* Modo propuesta: layout narrativo con secciones + precio por bloque */
  tipo?: "cotizacion" | "propuesta";
  objetivo?: string;
  contexto?: string;
  beneficios?: string;
  firmaTexto?: string;
  firmaCC?: string;
  firmaEmail?: string;
  referenciaTexto?: string;
  referenciaUrl?: string;
}

export const HOY = new Date().toLocaleDateString("es-CO", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const MEDIOS_PAGO =
  "Carlos Carranza V. · CC 1238338732\n" +
  "Bancolombia: 085-938307-06 (Ahorros)\n" +
  "Nu: 68309764 (NuPlaca: XNR732 / @XNR732)\n" +
  "Nequi / Daviplata: 3105080356\n" +
  "Bre-B (Llave): 1238338732\n" +
  "PayPal: @CarlosCarranza29\n" +
  "Envía el comprobante o captura al confirmar la transferencia. ¡Gracias! 🙏";

/* Campos comunes a todas las plantillas (datos del asesor, medios de pago, etc.) */
function base(): Cotizacion {
  return {
    numero: "COT-" + new Date().getFullYear() + "-001",
    fecha: HOY,
    cliente: "",
    empresa: "",
    proyecto: "",
    resumen: "",
    items: [],
    entrega: "3 a 4 semanas",
    formaPago: "50% para iniciar, 50% contra entrega",
    validez: "15 días",
    notas: "",
    mediosPago: MEDIOS_PAGO,
    asesor: "Carlos Carranza",
    asesorCargo: "Asesor · Líder de proyecto",
    descuento: 0,
  };
}

/* Empezar de 0: documento en blanco con un ítem vacío para comenzar */
export function plantillaVacia(): Cotizacion {
  return { ...base(), items: [{ concepto: "", valor: 0 }] };
}

/* ─────────── Tienda virtual / e-commerce (basada en la cotización de Mileidys) ─────────── */
function ecommerce(): Cotizacion {
  return {
    ...base(),
    proyecto: "Tienda virtual (e-commerce) a la medida",
    resumen:
      "Desarrollo de una tienda virtual profesional y a la medida, con panel de administración propio, carrito de compras y pagos por transferencia (sin pasarelas ni comisiones).",
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
    notas:
      "Las modificaciones de diseño, nuevas funciones o cambios después de la entrega tienen costo adicional. Ofrecemos un plan de soporte y mantenimiento mensual con cambios, actualizaciones y acompañamiento continuo (valor a convenir según necesidades).",
  };
}

/* ─────────── Página web / landing profesional ─────────── */
function landing(): Cotizacion {
  return {
    ...base(),
    proyecto: "Página web profesional (landing page)",
    resumen:
      "Desarrollo de una página web profesional y a la medida, con diseño único, optimización para Google (SEO) y formulario de contacto para captar clientes.",
    items: [
      {
        concepto:
          "Desarrollo de la página web profesional, incluye:\n" +
          "• Diseño único adaptado a tu marca (logo, colores, estilo)\n" +
          "• Secciones: inicio, servicios, nosotros, portafolio y contacto\n" +
          "• Formulario de contacto que llega a tu correo/WhatsApp\n" +
          "• Optimización SEO para aparecer en Google\n" +
          "• Responsive (celular, tablet y PC)\n" +
          "• Publicación en internet",
        valor: 1200000,
      },
      { concepto: "Hosting + dominio .com por 1 año (incluido)", valor: 0 },
      { concepto: "Soporte y garantía por 1 mes tras la entrega (incluido)", valor: 0 },
    ],
    entrega: "2 a 3 semanas",
    notas:
      "Cambios de diseño o nuevas secciones después de la entrega tienen costo adicional. Disponible plan de mantenimiento mensual (actualizaciones, cambios y posicionamiento en Google).",
  };
}

/* ─────────── Propuesta de servicios TI / soporte (basada en la propuesta de Casa Pestagua) ─────────── */
function soporteTI(): Cotizacion {
  return {
    ...base(),
    tipo: "propuesta",
    proyecto: "Propuesta de servicios TI y soporte tecnológico",
    resumen:
      "Acompañamiento tecnológico integral: soporte, mantenimiento e innovación para mantener su operación funcionando sin interrupciones.",
    contexto:
      "Su operación depende cada vez más de equipos, redes y herramientas digitales. Sin un soporte técnico constante, las fallas se vuelven costosas en tiempo, dinero y continuidad del servicio.",
    objetivo:
      "Garantizar el funcionamiento continuo de la infraestructura tecnológica con mantenimiento preventivo, soporte oportuno y acompañamiento estratégico en la toma de decisiones.",
    beneficios:
      "Menos interrupciones, respuesta rápida ante fallas, equipos más duraderos y decisiones tecnológicas acompañadas por un profesional de confianza.",
    items: [
      {
        concepto:
          "Soporte y mantenimiento TI mensual\n" +
          "• Mantenimiento preventivo y predictivo de equipos e impresoras\n" +
          "• Soporte remoto y presencial\n" +
          "• Gestión de respaldos y seguridad de la información\n" +
          "• Administración de cuentas y herramientas (Google Workspace, etc.)\n" +
          "• Acompañamiento y asesoría tecnológica",
        valor: 0,
        etiqueta: "$1.200.000 / mes",
        color: "#7c3aed",
      },
      {
        concepto:
          "Servicio por intervención (a demanda)\n" +
          "• Atención puntual sin plan mensual\n" +
          "• Se cobra por visita/hora según el caso\n" +
          "• Cada intervención con su soporte que evidencia el proceso realizado",
        valor: 0,
        etiqueta: "Por intervención",
        color: "#2563eb",
      },
      {
        concepto:
          "Automatización y digitalización de procesos\n" +
          "• Digitación y organización de la información\n" +
          "• Automatización de tareas repetitivas\n" +
          "• Cuentas de cobro, reportes y desarrollos a la medida",
        valor: 0,
        etiqueta: "Desde $800.000",
        color: "#059669",
      },
    ],
    entrega: "Visitas presenciales quincenales (viernes/sábado) según coordinación",
    formaPago: "Pago mensual anticipado o por intervención según la modalidad elegida",
    validez: "30 días",
    notas:
      "Cada intervención cuenta con su soporte que evidencia el proceso realizado, como garantía del servicio. Se maneja total confidencialidad y buen uso de la información. Aclaración de no exclusividad: de forma simultánea se prestan servicios a otras entidades y empresas, lo cual se informa para efectos de disponibilidad y coordinación.",
    firmaEmail: "carforck@gmail.com",
    referenciaTexto: "Vanttage — trabajos realizados",
    referenciaUrl: "https://vanttagetech.com/proyectos",
  };
}

/* ─────────── Capacitación / cursos (basada en la cotización de cursos) ─────────── */
function cursos(): Cotizacion {
  return {
    ...base(),
    proyecto: "Capacitación y formación tecnológica",
    resumen:
      "Programa de capacitación práctica y personalizada en herramientas tecnológicas, adaptado al nivel y las necesidades del equipo.",
    items: [
      {
        concepto:
          "Curso / capacitación (temario y horas por definir):\n" +
          "• Sesiones prácticas y personalizadas\n" +
          "• Material de apoyo\n" +
          "• Acompañamiento durante el proceso\n" +
          "• Certificado de participación",
        valor: 0,
      },
    ],
    entrega: "Según cronograma acordado",
    validez: "15 días",
    notas: "El valor final depende del temario, la cantidad de sesiones y el número de participantes.",
  };
}

export interface Plantilla {
  id: string;
  nombre: string;
  desc: string;
  emoji: string;
  tipo: "cotizacion" | "propuesta";
  build: () => Cotizacion;
}

export const PLANTILLAS: Plantilla[] = [
  { id: "ecommerce", nombre: "Tienda virtual (e-commerce)", desc: "Catálogo, carrito, pagos y panel de administración.", emoji: "🛒", tipo: "cotizacion", build: ecommerce },
  { id: "landing", nombre: "Página web / landing", desc: "Sitio profesional con SEO y formulario de contacto.", emoji: "🌐", tipo: "cotizacion", build: landing },
  { id: "soporteTI", nombre: "Servicios TI / soporte", desc: "Propuesta de mantenimiento, soporte e innovación.", emoji: "🛠️", tipo: "propuesta", build: soporteTI },
  { id: "cursos", nombre: "Capacitación / cursos", desc: "Formación práctica y personalizada.", emoji: "🎓", tipo: "cotizacion", build: cursos },
];

/* Se conserva para la acción "Reiniciar" y compatibilidad */
export const DEFAULT: Cotizacion = ecommerce();
