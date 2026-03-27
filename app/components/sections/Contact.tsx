"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="w-full py-28 px-6 bg-[#020617]">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-20"
      >
        <p className="text-blue-400 text-sm tracking-[0.25em] uppercase mb-4">
          CONTACTO
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Hablemos de tu proyecto
        </h2>

        <p className="text-gray-400 text-lg">
          Creamos soluciones de software modernas, escalables y seguras para
          empresas que quieren crecer con tecnología.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="flex items-start gap-4">
            <Phone className="text-[#1EA7FF]" size={26} />
            <div>
              <p className="font-semibold">Teléfono</p>
              <p className="text-gray-400">+57 322 670 6385</p>
              <p className="text-gray-400">+57 310 508 0356</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-[#1EA7FF]" size={26} />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-400">vanttagectg@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-[#1EA7FF]" size={26} />
            <div>
              <p className="font-semibold">Ubicación</p>
              <p className="text-gray-400">Cartagena, Colombia</p>
            </div>
          </div>

          <p className="text-gray-500 pt-6 leading-relaxed">
            Nuestro equipo te ayudará a diseñar, desarrollar e implementar
            soluciones digitales a medida para tu empresa.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <input
            type="text"
            placeholder="Nombre"
            className="bg-[#0F172A] border border-[#1f2937] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1EA7FF] transition"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="bg-[#0F172A] border border-[#1f2937] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1EA7FF] transition"
          />

          <textarea
            rows={5}
            placeholder="Cuéntanos sobre tu proyecto..."
            className="bg-[#0F172A] border border-[#1f2937] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1EA7FF] transition"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 bg-[#1EA7FF] hover:bg-[#0D8AE6] text-black font-semibold py-3 rounded-xl transition"
          >
            Enviar mensaje
            <Send size={18} />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
