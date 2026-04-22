import Hero from "@/app/components/sections/Hero";
import Problem from "@/app/components/sections/Problem";
import Services from "@/app/components/sections/Services";
import Stack from "@/app/components/sections/Stack";
import Process from "@/app/components/sections/Process";
import Portfolio from "@/app/components/sections/Portafolio";
import About from "@/app/components/sections/About";
import Clients from "@/app/components/sections/Clients";
import CTAFinal from "@/app/components/sections/CTAFinal";
import Contact from "@/app/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Services />
      <Stack />
      <Process />
      <Portfolio />
      <About />
      <Clients />
      <CTAFinal />
      <Contact />
    </main>
  );
}
