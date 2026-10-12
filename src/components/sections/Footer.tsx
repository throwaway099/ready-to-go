import { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";
import { SiMedium, SiDevdotto } from "react-icons/si";
import { profile } from "@/data/portfolio";

/** Constellation canvas — stars joined by faint lines, gently drifting. */
function Constellations() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? 320;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.floor(w / 60) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(150,185,255,${(0.14 * (1 - d / 130)).toFixed(3)})`;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,220,255,0.5)";
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0" />;
}

export function Footer() {
  const socials = [
    { icon: FiGithub, url: profile.socials.github, label: "GitHub" },
    { icon: FiLinkedin, url: profile.socials.linkedin, label: "LinkedIn" },
    { icon: FiTwitter, url: profile.socials.twitter, label: "Twitter" },
    { icon: FiInstagram, url: profile.socials.instagram, label: "Instagram" },
    { icon: FiYoutube, url: profile.socials.youtube, label: "YouTube" },
    { icon: SiMedium, url: profile.socials.medium, label: "Medium" },
    { icon: SiDevdotto, url: profile.socials.devto, label: "Dev.to" },
  ].filter((s) => s.url);

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      <Constellations />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-16">
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-stellar/60 hover:text-stellar hover:shadow-[0_0_24px_rgba(140,180,255,0.25)]"
            >
              <s.icon size={18} aria-hidden />
            </a>
          ))}
        </div>
        <div className="text-center">
          <div className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            DESIGNED & BUILT BY {profile.name.toUpperCase()}
          </div>
          <div className="mt-2 font-mono text-[11px] text-muted-foreground/60">
            © {new Date().getFullYear()} — Drifting through deep space
          </div>
        </div>
      </div>
    </footer>
  );
}
