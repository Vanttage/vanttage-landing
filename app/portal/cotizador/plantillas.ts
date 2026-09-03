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
          "• Checkout con medios de pago manuales (transferencia), sin pasarelas ni comisiones\n" +
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
    referenciaTexto: "Vanttage · trabajos realizados",
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

/* ─────────── Misión Mapache — diagnóstico gamificado (proyecto de Zulay) ─────────── */
function misionMapache(): Cotizacion {
  return {
    ...base(),
    tipo: "propuesta",
    descuento: 10,
    cliente: "Zulay",
    empresa: "Empresa de capacitación (3 socias)",
    proyecto: "Misión Mapache: diagnóstico interactivo gamificado",
    resumen:
      "Experiencia web gamificada para diagnosticar la percepción del personal sobre la convivencia con la fauna (mapaches), con identidad visual propia y resultados centralizados de forma automática. Temática: “Convivir con la naturaleza”.",
    contexto:
      "Hoy existe un prototipo hecho con ChatGPT que funciona, pero se percibe genérico y con estética de IA, y solo exporta los resultados como un archivo CSV local que cada participante tendría que descargar y enviar manualmente. Se busca una herramienta con identidad propia, tipo juego, y con los datos consolidados automáticamente.",
    objetivo:
      "Crear una experiencia con identidad visual propia (animada, tipo juego) que mida, sin juzgar, la percepción del personal sobre la convivencia con los mapaches, y que centralice los resultados de forma automática para su análisis posterior. Dura unos 5 minutos por participante y se responde desde el celular.",
    beneficios:
      "Una actividad que se ve profesional y llamativa, sin rastro de plataformas de terceros. Los datos llegan en tiempo real al propio Google Sheets del cliente y queda como una herramienta reutilizable para futuras capacitaciones.",
    items: [
      {
        concepto:
          "Diseño y desarrollo completo de Misión Mapache\n" +
          "• Landing con identidad propia (logo del cliente, mascota mapache animada)\n" +
          "• Formulario de registro con autorización de habeas data (Ley 1581 de 2012)\n" +
          "• Juego de 6 situaciones con mapa/camino animado y mascota interactiva\n" +
          "• Pantalla de resultados con puntaje, nivel/insignia y desglose por 6 dimensiones\n" +
          "• Envío automático de resultados a un Google Sheets del cliente\n" +
          "• Sección de contacto + pruebas en móvil y escritorio\n" +
          "• 1 ronda de ajustes posteriores a la entrega",
        valor: 2000000,
        etiqueta: "$2.000.000",
        color: "#7c3aed",
      },
      {
        concepto:
          "Opcional: dominio propio + hosting\n" +
          "• Compra y configuración de dominio (ej. misionmapache.com)\n" +
          "• Hosting anual + certificado SSL\n" +
          "• SEO técnico: metadatos + Open Graph (previsualización bonita al compartir en WhatsApp) + indexación en Google\n" +
          "• URL profesional de la empresa, reutilizable para futuras capacitaciones\n" +
          "(La renovación anual del dominio y el hosting queda a cargo del cliente, aprox. USD 15 a 25 al año)",
        valor: 0,
        etiqueta: "$200.000 · opcional",
        color: "#059669",
      },
    ],
    entrega: "7 a 10 días hábiles desde la aprobación y la entrega del logo/colores",
    formaPago:
      "Para iniciar se requiere el 50% de anticipo. El 50% restante se paga contra entrega. El desarrollo comienza una vez confirmado el anticipo.",
    validez: "15 días",
    notas:
      "Para iniciar necesitamos: el anticipo del 50%, el logo de la empresa, la confirmación final de las 6 preguntas (en revisión), la cuenta de Google donde recibir el Sheet de resultados, los colores corporativos o preferencia de paleta, y el nombre de dominio deseado (solo si toman el opcional). El diseño del mapa/camino del juego se presenta para aprobación antes de desarrollar.",
    firmaEmail: "carforck@gmail.com",
    referenciaTexto: "Vanttage · trabajos realizados",
    referenciaUrl: "https://vanttagetech.com/proyectos",
  };
}

/* ─────────── Plataforma web (proyecto de investigación · Duvan Felipe Muñoz) ─────────── */
function plataformaWeb(): Cotizacion {
  return {
    ...base(),
    tipo: "propuesta",
    cliente: "Duvan Felipe Muñoz",
    proyecto: "Plataforma web: repositorio, divulgación y participación ciudadana",
    resumen:
      "Diseño, desarrollo e implementación de una plataforma web que funcione como repositorio digital, espacio de divulgación científica y mecanismo de participación ciudadana del proyecto, garantizando el acceso público a sus productos de investigación y a los procesos participativos.",
    contexto:
      "El proyecto de investigación “Estrategias sociojurídicas para la gestión comunitaria de los Centros de Producción ante las tensiones entre propiedad privada y patrimonio cultural en el Paisaje Cultural Fortificado de Cartagena de Indias” requiere una plataforma web que centralice y dé acceso público a sus productos de investigación, divulgue sus avances y habilite la participación ciudadana.",
    objetivo:
      "Entregar una plataforma web administrable, responsive y accesible, que sirva como repositorio documental, espacio de divulgación y mecanismo de participación ciudadana del proyecto.",
    beneficios:
      "Acceso público y organizado a los productos de investigación; divulgación de avances y resultados; participación ciudadana mediante formularios; y una plataforma que el propio equipo puede administrar y actualizar.",
    items: [
      {
        concepto:
          "Diseño, desarrollo e implementación de la plataforma web, incluye:\n" +
          "• Banco bibliográfico especializado: repositorio con consulta pública, descarga (según derechos de autor), clasificación por categorías, búsqueda por palabras clave y almacenamiento o redirección a repositorios oficiales\n" +
          "• Módulo de divulgación: noticias, informes y memoria audiovisual/fotográfica (con fecha, lugar y descripción por registro)\n" +
          "• Cartografía social: espacio para visualizar la cartografía construida con las comunidades\n" +
          "• Proyecto de Acuerdo Distrital: visualización, descarga en PDF, formulario de observaciones ciudadanas y almacenamiento organizado de las observaciones\n" +
          "• Información institucional: objetivo, objetivos específicos, entidades, equipo investigador, productos esperados, cronograma y contacto\n" +
          "• Administrable por el equipo (gestor de contenidos), responsive, accesibilidad básica e integración con redes sociales\n" +
          "• Base de datos en la nube (Supabase) para el banco de información y las observaciones\n" +
          "• Optimización SEO y publicación en internet + 1 ronda de ajustes posteriores a la entrega",
        valor: 1500000,
        etiqueta: "$1.500.000",
        color: "#7c3aed",
      },
      {
        concepto:
          "Dominio propio + hosting\n" +
          "• Compra y configuración de dominio\n" +
          "• Hosting anual + certificado SSL\n" +
          "• Configuración base de posicionamiento y previsualización al compartir en redes\n" +
          "(La renovación anual del dominio y el hosting queda a cargo del cliente, aprox. USD 15 a 25 al año)",
        valor: 200000,
        etiqueta: "$200.000",
        color: "#059669",
      },
    ],
    entrega: "4 a 6 semanas desde la aprobación y la entrega de los insumos (matriz de archivos, contenidos, cartografía y documento del acuerdo)",
    formaPago: "50% para iniciar, 50% contra entrega",
    validez: "15 días",
    notas:
      "Esta cotización cubre únicamente la plataforma web; no incluye la producción audiovisual del anexo técnico. El equipo del proyecto suministra los insumos: la matriz con los archivos ya identificados para el banco bibliográfico, los contenidos de divulgación (fecha, lugar y descripción), la cartografía social y el documento del Proyecto de Acuerdo Distrital. Referente de diseño: patrimoniocolombia.org. La base de datos usa el plan gratuito de Supabase, suficiente para el arranque; si el volumen crece se puede escalar. Cambios o módulos nuevos tras la entrega tienen costo adicional.",
    firmaEmail: "carforck@gmail.com",
    referenciaTexto: "Vanttage · trabajos realizados",
    referenciaUrl: "https://vanttagetech.com/proyectos",
  };
}

/* ─────────── Landing principal de Daz Ambiental (mismo dominio, Misión Mapache como proyecto) ─────────── */
function landingDaz(): Cotizacion {
  return {
    ...base(),
    tipo: "propuesta",
    descuento: 20,
    cliente: "Zulay",
    empresa: "Daz Ambiental Consultorías, Asesorías y Servicios",
    proyecto: "Página web principal de Daz Ambiental",
    resumen:
      "Desarrollo de la página web principal de Daz Ambiental, con identidad propia y todas sus secciones, integrando Misión Mapache como uno de sus proyectos dentro del sitio, sobre el dominio existente dazambiental.com.",
    contexto:
      "Daz Ambiental requiere una página web institucional propia que presente la empresa, sus servicios y sus proyectos de forma profesional, aprovechando el dominio dazambiental.com que ya tienen y donde vive Misión Mapache.",
    objetivo:
      "Entregar la página web principal de Daz Ambiental, con identidad propia, editable y responsive, con Misión Mapache integrada como uno de los proyectos dentro del menú del sitio.",
    beneficios:
      "Una presencia web institucional unificada bajo dazambiental.com, que agrupa la información de la empresa y sus proyectos (incluido Misión Mapache) en un solo lugar profesional y administrable.",
    items: [
      {
        concepto:
          "Desarrollo de la página web principal de Daz Ambiental, incluye:\n" +
          "• Diseño único con la identidad de Daz Ambiental (logo, colores, estilo)\n" +
          "• Secciones: Inicio, Quiénes somos, Servicios, Proyectos y Contacto\n" +
          "• Sección Proyectos con Misión Mapache integrada como subpágina dentro del menú\n" +
          "• Formulario de contacto que llega al correo/WhatsApp\n" +
          "• Optimización SEO y posicionamiento en Google (metadatos y Open Graph para compartir)\n" +
          "• Responsive (celular, tablet y PC)\n" +
          "• Publicación sobre el dominio existente dazambiental.com\n" +
          "• 1 ronda de ajustes posteriores a la entrega",
        valor: 2000000,
        etiqueta: "$2.000.000",
        color: "#7c3aed",
      },
      {
        concepto:
          "Dominio + hosting\n" +
          "• Se publica sobre el dominio existente dazambiental.com (ya contratado)\n" +
          "• Sin costo adicional de dominio ni hosting nuevos",
        valor: 0,
        etiqueta: "Incluido (dominio existente)",
        color: "#059669",
      },
    ],
    entrega: "2 a 3 semanas desde la aprobación y la entrega del logo, colores y contenidos",
    formaPago: "50% para iniciar, 50% contra entrega",
    validez: "15 días",
    notas:
      "Se integra Misión Mapache como uno de los proyectos dentro del sitio, sobre el dominio dazambiental.com que ya está contratado (sin costo adicional de dominio ni hosting). Los contenidos (textos, fotos, información de servicios y proyectos) los suministra el cliente. Cambios o secciones nuevas después de la entrega tienen costo adicional. Disponible un plan de mantenimiento mensual (actualizaciones, cambios y posicionamiento continuo).",
    firmaEmail: "carforck@gmail.com",
    referenciaTexto: "Vanttage · trabajos realizados",
    referenciaUrl: "https://vanttagetech.com/proyectos",
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
  { id: "misionMapache", nombre: "Misión Mapache", desc: "Diagnóstico web gamificado para Zulay (juego + datos a Google Sheets).", emoji: "🦝", tipo: "propuesta", build: misionMapache },
  { id: "plataformaWeb", nombre: "Plataforma web (repositorio)", desc: "Repositorio + divulgación + participación ciudadana, administrable, con Supabase.", emoji: "🏛️", tipo: "propuesta", build: plataformaWeb },
  { id: "landingDaz", nombre: "Landing Daz Ambiental", desc: "Web principal de Daz Ambiental con Misión Mapache como proyecto (dominio existente).", emoji: "🌿", tipo: "propuesta", build: landingDaz },
];

/* Se conserva para la acción "Reiniciar" y compatibilidad */
export const DEFAULT: Cotizacion = ecommerce();
