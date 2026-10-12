<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Architecture Rules

- Single-page cinematic portfolio: all sections live in `src/routes/index.tsx` with anchor navigation (`#about`, `#skills`, ...), not separate routes — the design is one continuous scroll journey.
- All portfolio content (name, projects, skills, socials) is centralized in `src/data/portfolio.ts`; never hardcode content in section components.
- Animation stack: framer-motion for UI motion, Lenis for smooth scroll, canvas 2D (not WebGL/Three.js) for the starfield/constellation backgrounds — chosen for 60fps without a WebGL dependency.
- Design tokens live in `src/styles.css` (oklch); use semantic utilities (`glass`, `text-glow`, `text-gradient-stellar`) instead of hardcoded colors.
- The scroll-driven background color transition is `ScrollAtmosphere` in `src/routes/index.tsx`; section backgrounds must stay transparent so it shows through.
