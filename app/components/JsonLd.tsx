const DOMAIN = "https://vanttage.com";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  name: "Vanttage",
  alternateName: "Vanttage Software Boutique",
  url: DOMAIN,
  logo: {
    "@type": "ImageObject",
    url: `${DOMAIN}/logo/logo.svg`,
    width: 200,
    height: 200,
  },
  description:
    "Agencia de software boutique en Cartagena, Colombia. Desarrollamos sitios web, aplicaciones a medida y automatizaciones que convierten visitas en clientes reales.",
  foundingDate: "2024",
  areaServed: ["Colombia", "Latinoamérica"],
  serviceType: [
    "Desarrollo Web",
    "Software a Medida",
    "Automatización Digital",
    "SEO Técnico",
    "Migración de Stack",
    "Mantenimiento Web",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cartagena",
    addressRegion: "Bolívar",
    addressCountry: "CO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-322-670-6385",
    contactType: "customer service",
    availableLanguage: ["Spanish"],
  },
  sameAs: [
    "https://instagram.com/vanttage",
    "https://linkedin.com/company/vanttage",
  ],
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${DOMAIN}/#localbusiness`,
  name: "Vanttage",
  image: `${DOMAIN}/opengraph-image`,
  url: DOMAIN,
  telephone: "+57-322-670-6385",
  email: "vanttagectg@gmail.com",
  description:
    "Software boutique especializado en desarrollo web, automatización y diseño digital en Cartagena, Colombia.",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cartagena",
    addressRegion: "Bolívar",
    postalCode: "130001",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.391,
    longitude: -75.4794,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Desarrollo Web",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo Web a Medida",
          description: "Sitios y aplicaciones web construidos desde cero con arquitectura moderna.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Migración de Stack Legacy",
          description: "Modernización de plataformas web sin perder SEO ni autoridad de dominio.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Técnico",
          description: "Optimización técnica para posicionamiento en buscadores.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatización de Procesos",
          description: "Flujos automáticos que eliminan tareas manuales y escalan operaciones.",
        },
      },
    ],
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  url: DOMAIN,
  name: "Vanttage",
  description: "Software boutique en Cartagena, Colombia",
  publisher: { "@id": `${DOMAIN}/#organization` },
  inLanguage: "es-CO",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${DOMAIN}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
