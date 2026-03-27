'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
  { name: 'Servicios', id: 'services' },
  { name: 'Proyectos', id: 'portfolio' },
  { name: 'Stack', id: 'stack' },
  { name: 'Contacto', id: 'contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  // 1. Mostrar/Ocultar Navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 40); 
  });

  // 2. Lógica de Detección de Sección (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Detecta cuando la sección está en el centro
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4"
          initial={{ y: -50, opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, scale: 0.98, filter: "blur(5px)" }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <nav className="relative flex items-center gap-6 px-6 py-3 bg-[#020617]/85 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            
            {/* Brillo de escaneo sutil y lento */}
            <motion.div 
              className="absolute inset-0 z-0 pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(30,167,255,0.05), transparent)',
              }}
            />

            {/* LOGO */}
            <div className="relative z-10 flex items-center gap-3 pr-5 border-r border-white/10">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#1EA7FF] rounded-lg opacity-20 animate-pulse" />
                <span className="text-[#1EA7FF] font-syne font-black text-xl">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne font-bold text-[13px] tracking-[0.12em] uppercase text-white leading-none">Vanttage</span>
                <span className="text-[7px] text-[#1EA7FF] font-mono tracking-[0.2em] mt-1.5 opacity-80">CORE_v1.0</span>
              </div>
            </div>

            {/* MENU LINKS con Indicador Móvil Automático */}
            <ul className="relative z-10 flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id} className="relative">
                  <a 
                    href={`#${link.id}`}
                    className={`
                      relative z-10 px-4 py-2 font-dm-sans text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-500
                      ${activeSection === link.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
                    `}
                  >
                    {link.name}
                  </a>
                  
                  {/* Este es el fondo que "persigue" a la sección activa */}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-white/5 border-b border-[#1EA7FF] rounded-xl"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="relative z-10 group overflow-hidden px-5 py-2 rounded-full border border-[#1EA7FF]/40 bg-[#1EA7FF]/5 transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 font-syne font-bold text-[10px] uppercase tracking-wider text-white">Get Started</span>
              <div className="absolute inset-0 bg-[#1EA7FF]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}