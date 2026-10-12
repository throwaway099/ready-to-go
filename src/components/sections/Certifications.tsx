import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { certifications } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/space/Reveal";

export function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="05 // Credentials" title="Certifications" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -8, rotateX: 4 }}
              className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_16px_60px_rgba(110,150,255,0.15)]"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-stellar/10 blur-2xl transition-all duration-500 group-hover:bg-stellar/25" />
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-stellar/30 bg-stellar/10 text-stellar transition-transform duration-500 group-hover:rotate-12">
                <FiAward size={20} aria-hidden />
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-starlight">
                {c.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.issuer}</p>
              <div className="mt-4 font-mono text-xs text-aurora">{c.year}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
