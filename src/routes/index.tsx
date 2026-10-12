import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { UniverseBackground } from "@/components/space/UniverseBackground";
import { OrbCursor } from "@/components/space/OrbCursor";
import { BootSequence } from "@/components/space/BootSequence";
import { Navbar } from "@/components/space/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { profile } from "@/data/portfolio";

const title = `${profile.name} — ${profile.tagline}`;
const description = `Portfolio of ${profile.name}: ${profile.tagline}. Projects, skills, experience and contact — a cinematic deep-space experience.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.tagline,
          email: profile.email,
          address: profile.location,
          sameAs: Object.values(profile.socials).filter(Boolean),
        }),
      },
    ],
  }),
  component: Index,
});

/**
 * Scroll-driven atmosphere: the page backdrop glides from white through
 * light grey, blue, dark blue and deep space into galaxy black.
 */
function ScrollAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Stops: white → light grey → blue → dark blue → deep space → galaxy black
    const stops: [number, [number, number, number]][] = [
      [0.0, [250, 250, 252]],
      [0.18, [232, 234, 240]],
      [0.38, [62, 92, 168]],
      [0.58, [22, 34, 78]],
      [0.78, [12, 14, 34]],
      [1.0, [4, 5, 12]],
    ];
    let raf = 0;
    let ticking = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      let i = 0;
      while (i < stops.length - 2 && p > stops[i + 1]![0]) i++;
      const [p0, c0] = stops[i]!;
      const [p1, c1] = stops[i + 1]!;
      const t = Math.min(1, Math.max(0, (p - p0) / (p1 - p0)));
      const r = Math.round(lerp(c0[0], c1[0], t));
      const g = Math.round(lerp(c0[1], c1[1], t));
      const b = Math.round(lerp(c0[2], c1[2], t));
      el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      // Light sections need dark text; flip a class at the midpoint
      document.documentElement.classList.toggle("light-atmosphere", p < 0.3);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("light-atmosphere");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 -z-10 transition-colors duration-150"
    />
  );
}

function Index() {
  const [booted, setBooted] = useState(false);

  // Lenis smooth scroll — flying through space
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.05 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <ScrollAtmosphere />
      <UniverseBackground />
      <OrbCursor />
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
