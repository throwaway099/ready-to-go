import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/space/Reveal";

export function Contact() {
  const [launched, setLaunched] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (launched) return;
    setLaunched(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Transmission from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSent(true);
      setLaunched(false);
      form.reset();
      setTimeout(() => setSent(false), 4000);
    }, 900);
  };

  const inputCls =
    "w-full rounded-2xl border border-input bg-secondary/40 px-4 py-3 text-sm text-starlight placeholder:text-muted-foreground/60 outline-none transition-all focus:border-stellar/60 focus:shadow-[0_0_20px_rgba(140,180,255,0.15)]";

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="06 // Mission Control" title="Contact" />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Info panel */}
        <Reveal className="glass rounded-3xl p-8 lg:col-span-2">
          <div className="mb-6 font-mono text-xs tracking-[0.3em] text-aurora">
            COMM CHANNELS
          </div>
          <div className="space-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 text-sm text-muted-foreground transition-colors hover:text-stellar"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-stellar">
                <FiMail aria-hidden />
              </span>
              {profile.email}
            </a>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-stellar">
                <FiPhone aria-hidden />
              </span>
              {profile.phone}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-stellar">
                <FiMapPin aria-hidden />
              </span>
              {profile.location}
            </div>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Open to internships, collaborations and interesting problems.
            Transmissions typically answered within 24 hours.
          </p>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.12} className="glass rounded-3xl p-8 lg:col-span-3">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  NAME
                </label>
                <input id="contact-name" name="name" required className={inputCls} placeholder="Commander" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  EMAIL
                </label>
                <input id="contact-email" name="email" type="email" required className={inputCls} placeholder="you@galaxy.dev" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className={`${inputCls} resize-none`}
                placeholder="Describe your mission..."
              />
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                type="submit"
                data-magnetic
                disabled={launched}
                animate={
                  launched
                    ? { y: -140, x: 30, opacity: 0, rotate: 12 }
                    : { y: 0, x: 0, opacity: 1, rotate: 0 }
                }
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-stellar px-7 py-3 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_40px_rgba(140,180,255,0.5)]"
              >
                <FiSend aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                {launched ? "Launching..." : "Launch Transmission"}
              </motion.button>
              <AnimatePresence>
                {sent && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs text-aurora"
                  >
                    ✓ TRANSMISSION RELAYED
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
