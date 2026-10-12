import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/space/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);
  const glareX = useTransform(sx, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(sy, [0, 1], ["20%", "80%"]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal
      delay={index * 0.12}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-magnetic
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -10 }}
        className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition-shadow duration-500 hover:shadow-[0_20px_80px_rgba(110,150,255,0.18)]"
      >
        {/* Moving glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(180,205,255,0.12), transparent 55%)`,
            ),
          }}
        />
        {project.featured && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-aurora/40 bg-aurora/10 px-3 py-1 font-mono text-[11px] tracking-[0.2em] text-aurora">
            <FiStar aria-hidden /> FEATURED PROJECT
          </div>
        )}
        <h3 className="font-display text-2xl font-bold text-starlight md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-stellar/30 group-hover:text-starlight"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:border-stellar/60 hover:text-stellar"
          >
            <FiGithub aria-hidden /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} live demo`}
            className="flex items-center gap-2 rounded-full bg-stellar/15 px-4 py-2 text-xs font-semibold text-stellar transition-all hover:bg-stellar/25"
          >
            <FiExternalLink aria-hidden /> Live Demo
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="03 // Missions" title="Projects" />
      <div className="grid gap-6 md:grid-cols-2" style={{ perspective: "1200px" }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
