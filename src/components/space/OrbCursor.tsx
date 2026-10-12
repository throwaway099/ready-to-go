import { useEffect, useRef, useState } from "react";

/**
 * Glowing AI orb cursor — elastic spring follow, soft glow, particle
 * trail, and enlargement over interactive elements. Desktop only.
 */
export function OrbCursor() {
  const orbRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const orb = orbRef.current;
    const glow = glowRef.current;
    const trailCanvas = trailRef.current;
    if (!orb || !glow || !trailCanvas) return;
    const tctx = trailCanvas.getContext("2d");
    if (!tctx) return;

    document.documentElement.classList.add("orb-cursor-active");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ox = mx;
    let oy = my;
    let vx = 0;
    let vy = 0;
    let hovering = false;
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      trailCanvas.width = window.innerWidth * dpr;
      trailCanvas.height = window.innerHeight * dpr;
      trailCanvas.style.width = `${window.innerWidth}px`;
      trailCanvas.style.height = `${window.innerHeight}px`;
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; life: number; r: number };
    const particles: P[] = [];

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest("a, button, [data-magnetic]");
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      // Spring physics
      const stiffness = 0.16;
      const damping = 0.72;
      vx = (vx + (mx - ox) * stiffness) * damping;
      vy = (vy + (my - oy) * stiffness) * damping;
      ox += vx;
      oy += vy;

      const scale = hovering ? 2.2 : 1;
      orb.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%) scale(${scale})`;
      glow.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;

      // Trail particles
      if (Math.abs(vx) + Math.abs(vy) > 0.4) {
        particles.push({
          x: ox + (Math.random() - 0.5) * 6,
          y: oy + (Math.random() - 0.5) * 6,
          life: 1,
          r: Math.random() * 2.4 + 0.8,
        });
      }
      tctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.035;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        tctx.beginPath();
        tctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        tctx.fillStyle = `rgba(150, 190, 255, ${(p.life * 0.5).toFixed(3)})`;
        tctx.fill();
      }
      if (particles.length > 90) particles.splice(0, particles.length - 90);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("orb-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={trailRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90]"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[98] h-16 w-16 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(140,180,255,0.22) 0%, rgba(140,180,255,0.06) 45%, transparent 70%)",
          transition: "transform 0.18s ease-out",
        }}
      />
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-3 w-3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #eaf2ff 0%, #9db9ff 55%, rgba(157,185,255,0) 100%)",
          boxShadow:
            "0 0 12px rgba(160,195,255,0.9), 0 0 32px rgba(120,160,255,0.5)",
          transition: "transform 0.12s ease-out",
        }}
      />
    </>
  );
}
