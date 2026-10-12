import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navSections, profile } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      let current = "hero";
      for (const s of navSections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = s.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Primary"
        className={`glass mt-4 flex items-center gap-1 rounded-full px-3 transition-all duration-500 ${
          scrolled ? "py-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : "py-2.5"
        }`}
      >
        <button
          onClick={() => go("hero")}
          className="mr-2 flex items-center gap-2 rounded-full px-2 py-1"
          aria-label="Back to top"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stellar opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-stellar" />
          </span>
          <span className="hidden font-mono text-xs tracking-widest text-starlight sm:block">
            {profile.name.split(" ")[0]?.toUpperCase() ?? "HOME"}
          </span>
        </button>
        {navSections.slice(1).map((s) => (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            aria-current={active === s.id ? "true" : undefined}
            className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
              active === s.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-starlight"
            }`}
          >
            {active === s.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-stellar"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 hidden md:inline">{s.label}</span>
            <span className="relative z-10 md:hidden">{s.label.slice(0, 2)}</span>
          </button>
        ))}
      </nav>
    </motion.header>
  );
}
