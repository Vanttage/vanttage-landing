<div align="center">

<br />

<img src="public/logo/logo.svg" alt="Vanttage" width="64" />

<h1>Vanttage — Landing Page</h1>

<p>Software boutique en Cartagena, Colombia.<br />Código limpio · Diseño premium · Resultados medibles.</p>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-violet)](LICENSE)

<br />

</div>

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 App Router |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| 3D / WebGL | Three.js · @react-three/fiber · @react-three/drei |
| Formulario | EmailJS v4 |
| Tipografía | Syne + DM Sans (Google Fonts) |
| Deploy | Vercel + Hostinger DNS |

---

## Secciones

| Sección | Descripción |
|---------|-------------|
| `Hero` | Headline principal + partículas Three.js |
| `Marquee` | Banda de logos de clientes |
| `Problem` | Agitación del problema con métricas |
| `Services` | Carrusel horizontal de 6 servicios |
| `Portfolio` | Proyectos con métricas reales |
| `About` | Filosofía + animaciones únicas por pilar |
| `CTAFinal` | Llamada a la acción con stats |
| `Contact` | Formulario con EmailJS + 3 estados |

---

## Setup local

```bash
# 1. Clonar
git clone https://github.com/Vanttage/Landing-Vanttage.git
cd Landing-Vanttage

# 2. Instalar dependencias
npm install

# 3. Variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de EmailJS

# 4. Dev server
npm run dev
# → http://localhost:3000
```

---

## Variables de entorno

Crea `.env.local` en la raíz con:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

Obtén las credenciales en [dashboard.emailjs.com](https://dashboard.emailjs.com).

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servidor de producción local
npm run lint     # ESLint
```

---

## Estructura

```
Landing-Vanttage/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroScene.tsx       ← Three.js particle constellation
│   │   │   ├── Marquee.tsx
│   │   │   ├── Problem.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portafolio.tsx
│   │   │   ├── About.tsx
│   │   │   ├── CTAFinal.tsx
│   │   │   └── Contact.tsx
│   │   └── JsonLd.tsx              ← Structured data (Organization, LocalBusiness, WebSite)
│   ├── opengraph-image.tsx         ← OG image dinámico (Edge Runtime)
│   ├── twitter-image.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
│   └── logo/
├── next.config.ts                  ← Security headers + image optimization
├── .env.local                      ← No incluido en git
└── .env.example
```

---

## SEO

- Metadata API de Next.js (OG + Twitter cards dinámicos)
- JSON-LD: `Organization`, `ProfessionalService`, `WebSite` con `SearchAction`
- `robots.txt` y `sitemap.xml` generados automáticamente
- Headers de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- Geo tags `CO-BOL` / Cartagena
- Imágenes en formato AVIF + WebP
- Fuentes con `display: swap`

---

## Deploy

**Vercel** (recomendado):

1. Conectar el repo en [vercel.com](https://vercel.com)
2. Agregar las variables de entorno en Settings → Environment Variables
3. Vercel detecta Next.js automáticamente

**DNS (Hostinger):**

Agrega los registros que Vercel te entrega en el panel de Hostinger → Dominio → DNS.

---

## Licencia

Copyright © 2024–2025 Vanttage. Todos los derechos reservados.  
Ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**[vanttage.com](https://vanttage.com)** · Cartagena, Colombia

</div>
