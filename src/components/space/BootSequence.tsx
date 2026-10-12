import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "INITIALIZING CORE SYSTEMS",
  "CALIBRATING NAVIGATION ARRAY",
  "ACTIVATING PARTICLE FIELD",
  "SYNCING NEURAL MODULES",
  "ENGINE STARTUP SEQUENCE",
  "ALL SYSTEMS NOMINAL",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }
    const start = performance.now();
    const duration = 2400;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // Ease-out for a premium feel
      setProgress(Math.round((1 - Math.pow(1 - p, 2.4)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setExiting(true);
        setTimeout(onDone, 700);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const lineIndex = Math.min(
    bootLines.length - 1,
    Math.floor((progress / 100) * bootLines.length),
  );

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
        >
          {/* Animated logo core */}
          <motion.div
            className="relative mb-10 h-24 w-24"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-stellar/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ borderTopColor: "transparent", borderBottomColor: "transparent" }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-aurora/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ borderLeftColor: "transparent", borderRightColor: "transparent" }}
            />
            <motion.div
              className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-stellar"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 30px rgba(140,180,255,0.8)" }}
            />
          </motion.div>

          {/* Diagnostics */}
          <div className="mb-6 h-5 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
            {bootLines[lineIndex]}
          </div>

          {/* Progress bar */}
          <div className="h-px w-64 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-stellar to-aurora"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 font-mono text-sm text-stellar">{progress}%</div>
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          className="fixed inset-0 z-[100] bg-void"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
