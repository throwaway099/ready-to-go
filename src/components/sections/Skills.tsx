import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills, type Skill } from "@/data/portfolio";
import { SectionHeading, Reveal } from "@/components/space/Reveal";

function Planet({
  skill,
  onHover,
  active,
}: {
  skill: Skill;
  onHover: (s: Skill | null) => void;
  active: boolean;
}) {
  return (
    <motion.button
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(skill)}
      onBlur={() => onHover(null)}
      aria-label={`Skill: ${skill.name}`}
      className="absolute left-1/2 top-1/2"
      style={{ width: skill.orbitRadius * 2, height: skill.orbitRadius * 2, marginLeft: -skill.orbitRadius, marginTop: -skill.orbitRadius }}
      animate={{ rotate: 360 }}
      transition={{ duration: skill.orbitDuration, repeat: Infinity, ease: "linear" }}
    >
      <motion.span
        className="absolute block rounded-full"
        style={{
          width: skill.size,
          height: skill.size,
          left: "50%",
          top: -skill.size / 2,
          marginLeft: -skill.size / 2,
          background: `radial-gradient(circle at 32% 30%, oklch(0.9 0.05 ${skill.hue}) 0%, oklch(0.6 0.15 ${skill.hue}) 45%, oklch(0.32 0.1 ${skill.hue}) 100%)`,
          boxShadow: active
            ? `0 0 40px oklch(0.7 0.15 ${skill.hue} / 0.8), inset 0 0 20px rgba(255,255,255,0.2)`
            : `0 0 18px oklch(0.7 0.15 ${skill.hue} / 0.35)`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: skill.orbitDuration, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.15 }}
      >
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-semibold tracking-wider text-white/90">
          {skill.name}
        </span>
        {/* Orbiting particles */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0"
            animate={{ rotate: i === 0 ? 360 : -360 }}
            transition={{ duration: 5 + i * 3, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute h-1 w-1 rounded-full bg-starlight"
              style={{ left: "50%", top: -6, opacity: 0.8 }}
            />
          </motion.span>
        ))}
      </motion.span>
    </motion.button>
  );
}

export function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="02 // Capabilities" title="Skill System" />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Orbital system */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-16 w-16 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, #f2f7ff, #8fb0ff 50%, #3a55b0)",
                boxShadow: "0 0 40px rgba(140,180,255,0.6)",
              }}
            />
          </div>
          {/* Orbit guides */}
          {skills.map((s) => (
            <div
              key={`orbit-${s.name}`}
              className="absolute left-1/2 top-1/2 rounded-full border border-border/50"
              style={{
                width: s.orbitRadius * 2,
                height: s.orbitRadius * 2,
                marginLeft: -s.orbitRadius,
                marginTop: -s.orbitRadius,
              }}
            />
          ))}
          {skills.map((s) => (
            <Planet key={s.name} skill={s} onHover={setActive} active={active?.name === s.name} />
          ))}
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.15} className="glass min-h-[280px] rounded-3xl p-8">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-2 font-mono text-xs tracking-[0.3em] text-aurora">
                  PLANET.{active.name.toUpperCase()}
                </div>
                <h3 className="font-display text-3xl font-bold text-starlight">
                  {active.name}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {active.description}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <div className="text-muted-foreground">EXPERIENCE</div>
                    <div className="mt-1 text-starlight">{active.experience}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">PROJECTS</div>
                    <div className="mt-1 text-starlight">{active.projects}</div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-stellar/30 bg-stellar/10 px-3 py-1 font-mono text-xs text-stellar"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full min-h-[220px] flex-col items-center justify-center text-center"
              >
                <div className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                  AWAITING SELECTION
                </div>
                <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                  Hover over a planet to scan its technology signature.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
