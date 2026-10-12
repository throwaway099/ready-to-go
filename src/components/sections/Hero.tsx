import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FiDownload, FiMail, FiArrowDown } from "react-icons/fi";
import { profile, heroTitles } from "@/data/portfolio";

function RotatingTitle() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroTitles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-8 overflow-hidden md:h-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={heroTitles[index]}
          initial={{ y: 32, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -32, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 text-center font-mono text-lg tracking-[0.25em] text-stellar md:text-xl"
        >
          {heroTitles[index].toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function AICore() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative mx-auto mb-12 h-56 w-56 md:h-72 md:w-72"
      aria-hidden="true"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(140,180,255,0.18) 0%, rgba(120,90,220,0.08) 45%, transparent 70%)",
        }}
      />
      {/* Orbit rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-stellar/25"
          style={{
            inset: `${i * 14}%`,
            transform: `rotateX(${62 + i * 8}deg)`,
          }}
          animate={{ rotateZ: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 14 + i * 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aurora"
            style={{ boxShadow: "0 0 10px rgba(120,230,200,0.9)" }}
          />
        </motion.div>
      ))}
      {/* Core */}
      <motion.div
        className="absolute inset-[30%] rounded-full"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #f2f7ff 0%, #a9c4ff 35%, #5a7fe0 70%, #2a3a80 100%)",
          boxShadow:
            "0 0 40px rgba(140,180,255,0.7), 0 0 120px rgba(110,140,255,0.35), inset 0 0 30px rgba(255,255,255,0.25)",
        }}
      />
      {/* Emitting particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-starlight"
          animate={{
            x: [0, Math.cos((i / 10) * Math.PI * 2) * (110 + (i % 3) * 30)],
            y: [0, Math.sin((i / 10) * Math.PI * 2) * (110 + (i % 3) * 30)],
            opacity: [0.9, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration: 2.6 + (i % 4) * 0.5,
            repeat: Infinity,
            delay: i * 0.28,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24"
    >
      <AICore />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h1 className="font-display text-5xl font-bold tracking-tight text-glow md:text-8xl">
          <span className="text-gradient-stellar">{profile.name}</span>
        </h1>
        <div className="mt-6">
          <RotatingTitle />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {profile.tagline} — building intelligent systems and cinematic
          digital experiences from {profile.location}.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => go("projects")}
            data-magnetic
            className="group relative overflow-hidden rounded-full bg-stellar px-7 py-3 text-sm font-semibold text-primary-foreground transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(140,180,255,0.5)]"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
          <a
            href={profile.resumeUrl}
            data-magnetic
            className="glass flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-starlight transition-colors duration-300 hover:border-stellar/50"
          >
            <FiDownload aria-hidden /> Download Resume
          </a>
          <button
            onClick={() => go("contact")}
            data-magnetic
            className="flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:border-aurora/60 hover:text-aurora"
          >
            <FiMail aria-hidden /> Contact Me
          </button>
        </div>
      </motion.div>
      <motion.button
        onClick={() => go("about")}
        aria-label="Scroll to about section"
        className="absolute bottom-10 text-muted-foreground"
        animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiArrowDown size={22} />
      </motion.button>
    </section>
  );
}
