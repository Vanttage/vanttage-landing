import Hero from "@/app/components/sections/Hero";
import Services from "@/app/components/sections/Services";
import Portfolio from "@/app/components/sections/Portafolio";
import Clients from "@/app/components/sections/Clients";
import Contact from "@/app/components/sections/Contact";
import Problem from "./components/sections/Problem";
import Process from "./components/sections/Process";
import CTAFinal from "./components/sections/CTAFinal";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Services />
      <Process />
      <Portfolio />
      <Clients />
      <CTAFinal />
      <Contact />
    </main>
  );
}
