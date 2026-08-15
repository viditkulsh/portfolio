# Vidit Kulshrestha — Portfolio

Portfolio for a software engineer building blockchain and fintech systems.
React 18 + Vite, deployed on Vercel.

## Quick start

```sh
npm install          # 3D deps need --legacy-peer-deps if reinstalling them
npm run dev          # http://localhost:3000
npm run build        # syncs GitHub stats, then builds to dist/
npm run preview      # serve the production build
```

## Structure

```
/                  Narrative homepage — hero, work, research, experience, skills, contact
/work              Full project index
/work/:slug        Case study with three layers of depth: overview → engineering → trade-offs
/recruiter         Dense, low-motion summary for hiring teams
/resume            Three résumé variants by role
/explore           Optional 3D district — lazy-loaded, never on the critical path
⌘K                 Command palette (an enhancement; every destination is also a visible link)
```

## Editing content

All content lives in `src/data/` — never in components.

| File | Holds |
| --- | --- |
| `portfolioData.js` | Aggregator, personal details, positioning, education |
| `sections/projectsData.js` | Every project |
| `sections/experienceData.js` | Roles |
| `sections/skillsData.js` | Skill tiers and domains |
| `sections/certificatesData.js` | Certificates (linked to real PDFs) |
| `sections/architectureData.js` | Flagship system diagrams |
| `sections/researchData.js` | Research threads |
| `sections/socialMediaData.js` | Links |

`architectureData.js` and `researchData.js` each carry a `source` field
recording where every fact came from. Anything added there needs a source —
the site's credibility depends on nothing being invented.

Run `npm run sync-github` to refresh live repo stats (also runs on `prebuild`).

## Design system

`src/styles/tokens.css` is the single source of truth for colour, type,
space and motion. `base.css` adds typography and accessibility primitives;
`components.css` adds buttons, cards and tags. Tailwind maps its utilities
onto the same custom properties, so themes are a variable swap.

Motion goes through `src/lib/motion.js` and `useMotionTier()`, which
downgrades from full motion to reduced to fully static based on
`prefers-reduced-motion` and device capability.

## Verified state

- 0 non-minor axe-core violations across all routes, including reduced motion and mobile
- Home: FCP ~156 ms, LCP ~812 ms, CLS ~0.001
- Three.js (~235 KB gz) loads only after entering `/explore`
- Keyboard: skip link first, visible focus throughout, diagram fully operable
