import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HeroCircuit from "@/components/ui/HeroCircuit";

const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"));

export default function Home() {
  return (
    <>
      {/* Site-wide moving circuit traces, fixed behind every section */}
      <div
        aria-hidden="true"
        className="hero-circuit-layer pointer-events-none fixed inset-0 -z-20 opacity-40 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_50%,black,transparent)] sm:opacity-70 sm:[mask-image:radial-gradient(ellipse_110%_100%_at_50%_50%,black,transparent)]"
      >
        <HeroCircuit />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
