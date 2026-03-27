"use client";

import { motion } from "framer-motion";

export default function Portfolio() {
  const projects = [
    {
      title: "Sistema de Gestión Empresarial",
      description:
        "Plataforma completa para automatización de procesos internos, analítica avanzada y gestión operativa.",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "/projects/project-1.jpg",
      alt: "Sistema de gestión empresarial",
    },
    {
      title: "Plataforma Analítica",
      description: "Dashboard empresarial con visualización de datos.",
      tech: ["React", "Node.js"],
      image: "/projects/project-2.jpg",
      alt: "Dashboard de analítica de datos",
    },
    {
      title: "Arquitectura Cloud",
      description: "Infraestructura cloud escalable.",
      tech: ["AWS", "Docker"],
      image: "/projects/project-3.jpg",
      alt: "Arquitectura cloud empresarial",
    },
    {
      title: "Sistema de Facturación",
      description: "Solución moderna para finanzas empresariales.",
      tech: ["Next.js", "Stripe"],
      image: "/projects/project-4.jpg",
      alt: "Sistema de facturación empresarial",
    },
    {
      title: "App Mobile Empresarial",
      description: "Aplicación móvil para gestión remota.",
      tech: ["React Native", "Firebase"],
      image: "/projects/project-5.jpg",
      alt: "Aplicación móvil empresarial",
    },
  ];

  const mainProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="portfolio" className="w-full py-28 px-6 relative">
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Header */}

      <div className="max-w-7xl mx-auto text-center mb-20">
        <p className="text-blue-400 text-sm tracking-[0.25em] uppercase mb-4">
          Portafolio
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Proyectos destacados
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Creamos soluciones tecnológicas enfocadas en rendimiento,
          escalabilidad y arquitectura moderna.
        </p>
      </div>

      {/* GRID RESPONSIVE */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6">
        {/* PROYECTO PRINCIPAL */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="group relative lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden border border-white/10 bg-[#0F172A]/60 backdrop-blur p-10"
        >
          {/* Placeholder imagen */}

          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-70" />

          {/* contenido */}

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              {mainProject.title}
            </h3>

            <p className="text-gray-300 max-w-xl mb-6">
              {mainProject.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {mainProject.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PROYECTOS PEQUEÑOS */}

        {otherProjects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0F172A]/60 backdrop-blur p-6"
          >
            {/* Placeholder imagen */}

            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-70" />

            {/* contenido */}

            <div className="relative z-10">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>

              <p className="text-sm text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
