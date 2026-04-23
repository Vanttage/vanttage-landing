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
      <Problem />
      <Services />
      <Portfolio />
      <About />
      <CTAFinal />
      <Contact />
    </main>
  );
}
