import { useEffect, useRef } from "react";

/**
 * Living universe background — canvas-rendered stars, nebula, dust and
 * light rays with scroll-driven parallax and subtle drift.
 * Pure canvas 2D for 60fps without a WebGL dependency.
 */

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1
  r: number;
  tw: number; // twinkle phase
  ts: number; // twinkle speed
};

type Dust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
};

export function UniverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let raf = 0;
    let scrollY = window.scrollY;
    let t = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = Math.min(420, Math.floor((w * h) / 3200));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        ts: 0.5 + Math.random() * 1.5,
      }));

      const dustCount = Math.min(70, Math.floor(w / 22));
      dust = Array.from({ length: dustCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 2.2 + 0.6,
        o: Math.random() * 0.25 + 0.05,
      }));
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Nebula clouds — large radial gradients drifting slowly
      const nebulae = [
        { x: w * 0.2 + Math.sin(t * 0.05) * 40, y: h * 0.3 - scrollY * 0.05, r: w * 0.45, c: "rgba(120, 90, 220, 0.05)" },
        { x: w * 0.8 + Math.cos(t * 0.04) * 50, y: h * 0.7 - scrollY * 0.08, r: w * 0.5, c: "rgba(60, 120, 220, 0.05)" },
        { x: w * 0.5 + Math.sin(t * 0.03) * 30, y: h * 0.5 - scrollY * 0.03, r: w * 0.35, c: "rgba(80, 200, 190, 0.035)" },
      ];
      for (const n of nebulae) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, n.c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Light ray — a soft diagonal beam
      ctx.save();
      ctx.translate(w * 0.7, -h * 0.1 - scrollY * 0.02);
      ctx.rotate(0.5 + Math.sin(t * 0.02) * 0.03);
      const ray = ctx.createLinearGradient(0, 0, 0, h * 1.6);
      ray.addColorStop(0, "rgba(140, 180, 255, 0.045)");
      ray.addColorStop(1, "rgba(140, 180, 255, 0)");
      ctx.fillStyle = ray;
      ctx.fillRect(-w * 0.06, 0, w * 0.12, h * 1.6);
      ctx.restore();

      // Stars with depth parallax + twinkle
      for (const s of stars) {
        const par = 0.12 + s.z * 0.35;
        let y = s.y - (scrollY * par) % h;
        if (y < 0) y += h;
        const twinkle = 0.55 + 0.45 * Math.sin(s.tw + t * s.ts);
        const alpha = (0.25 + s.z * 0.75) * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r * (0.7 + s.z * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 242, 255, ${alpha.toFixed(3)})`;
        ctx.fill();
        // Occasional glow on the brightest stars
        if (s.z > 0.85) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 190, 255, ${(alpha * 0.08).toFixed(3)})`;
          ctx.fill();
        }
      }

      // Floating space dust
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;
        const dy = d.y - scrollY * 0.06;
        const wrapped = ((dy % h) + h) % h;
        ctx.beginPath();
        ctx.arc(d.x, wrapped, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${d.o.toFixed(3)})`;
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
