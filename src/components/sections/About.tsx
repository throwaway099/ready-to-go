import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";
import { about } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/space/Reveal";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gradient-stellar">
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="01 // Identity" title="About Me" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bio panel */}
        <Reveal className="glass rounded-3xl p-8 md:row-span-2">
          <div className="mb-4 font-mono text-xs tracking-[0.3em] text-aurora">
            BIOGRAPHY.LOG
          </div>
          {about.bio.map((p, i) => (
            <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <blockquote className="mt-6 border-l-2 border-stellar pl-4 text-sm italic text-starlight">
            "{about.quote}"
          </blockquote>
        </Reveal>

        {/* Education panel */}
        <Reveal delay={0.1} className="glass rounded-3xl p-8">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-aurora">
            <FiBookOpen aria-hidden /> EDUCATION.SYS
          </div>
          <h3 className="font-display text-xl font-semibold text-starlight">
            {about.education.college}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{about.education.degree}</p>
          <div className="mt-4 flex gap-6 font-mono text-xs text-muted-foreground">
            <span>{about.education.year}</span>
            <span>CGPA {about.education.cgpa}</span>
          </div>
        </Reveal>

        {/* Achievements panel */}
        <Reveal delay={0.2} className="glass rounded-3xl p-8">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-aurora">
            <FiAward aria-hidden /> ACHIEVEMENTS.DAT
          </div>
          <ul className="space-y-3">
            {about.achievements.map((a) => (
              <li key={a} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stellar shadow-[0_0_8px_rgba(140,180,255,0.8)]" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        {about.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="glass rounded-3xl p-6 text-center"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                {s.label}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
