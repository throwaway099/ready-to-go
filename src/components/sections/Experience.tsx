import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/space/Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-32">
      <SectionHeading kicker="04 // Flight Log" title="Experience" />

      <div className="relative">
        {/* Timeline beam */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-stellar via-nebula to-transparent md:left-1/2" />

        <div className="space-y-12">
          {experience.map((e, i) => (
            <Reveal key={e.company + e.role} delay={i * 0.1}>
              <div
                className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Node */}
                <motion.span
                  className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-stellar md:left-1/2"
                  style={{ boxShadow: "0 0 16px rgba(140,180,255,0.9)" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
                />
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`glass ml-12 w-full rounded-3xl p-7 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    i % 2 === 0 ? "" : "md:mr-0"
                  }`}
                >
                  <div className="font-mono text-[11px] tracking-[0.25em] text-aurora">
                    {e.duration}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-starlight">
                    {e.role}
                  </h3>
                  <div className="mt-1 text-sm font-medium text-stellar">{e.company}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {e.description}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
