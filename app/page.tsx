import Hero from "@/app/components/sections/Hero";
import Marquee from "@/app/components/sections/Marquee";
import Problem from "@/app/components/sections/Problem";
import Services from "@/app/components/sections/Services";
import Portfolio from "@/app/components/sections/Portafolio";
import About from "@/app/components/sections/About";
import CTAFinal from "@/app/components/sections/CTAFinal";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      {/* fundido oscuro → claro */}
      <div aria-hidden className="h-24 bg-gradient-to-b from-[#0A0A14] to-[#F8FAFC]" />
      <Problem />
      {/* fundido claro → oscuro */}
      <div aria-hidden className="h-24 bg-gradient-to-b from-[#F8FAFC] to-[#020617]" />
      <Services />
      <Portfolio />
      {/* fundido oscuro → claro */}
      <div aria-hidden className="h-24 bg-gradient-to-b from-[#020617] to-[#F8FAFC]" />
      <About />
      <CTAFinal />
      <Contact />
    </main>
  );
}
