# UDesign

UDesign is the umbrella identity for Ivan Kanev's ecosystem of focused software products: UPerifery, UPlugPay, UCircuit, GitBudgetStudio, SwitchAir, AvoCue, UFood, BudgetFlowStudio, UProxi, CircuitLab Designer, and future products built around the same signature letter.

The site is built with React, TypeScript, and Vite so it can grow as a polished product hub while still deploying cleanly to GitHub Pages as static files. The brand system uses the `U` as the master mark, product names as family extensions, and a restrained dark interface with luminous cyan, signal green, white, and graphite accents.

## Technology Decision

- **React + TypeScript + Vite:** justified by the interactive app data model, filters, status board, modals, and long-term maintainability.
- **GSAP + ScrollTrigger:** used for deliberate scroll reveals and premium section motion.
- **Lenis:** used for smoother scrolling and synchronized with ScrollTrigger.
- **Three.js:** used only for the focused hero U signal scene, with reduced-motion fallback.
- **Custom CSS:** keeps the visual identity bespoke and avoids a generic component-library look.
- **Skipped for this pass:** Tailwind CSS, Motion for React, and Lucide React because the current implementation does not need them to improve quality.

## Brand Direction

- **Umbrella brand:** UDesign
- **Signature:** U / Ivan Kanev
- **Product family:** UCircuit, UPlugPlay, UPerifery, and future `U` applications
- **Voice:** precise, premium, calm, technical, founder-led
- **Motion language:** smooth reveals, dimensional depth, subtle cursor response, and reduced-motion support
- **Visual language:** black glass, thin rules, kinetic grids, luminous product tokens, tight typography, and reusable system spacing

The reusable website-development prompt lives in [docs/website-development-prompt.md](docs/website-development-prompt.md).

## Project Structure

```text
UDesign/
  index.html
  src/
    App.tsx
    data.ts
    main.tsx
    motion/
      useMotionSystem.ts
    visuals/
      HeroScene.tsx
    styles.css
  assets/
    favicon.svg
    apps/
      app icons copied from Ivan's live apps status page
    appstore-connect/
      app icons extracted from the App Store Connect status screenshot
  tools/
    check-site.mjs
  README.md
  package.json
  .nojekyll
  .gitignore
```

## Local Preview

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Quality Check

```bash
npm run check
```

The check validates the required static files and important page markers.

## GitHub Pages Deployment

### Manual Upload

The repository-root `index.html` is already compiled for GitHub Pages. If you upload files manually and set Pages to deploy from the branch root, include the whole project folder except generated local dependencies.

Upload these important files/folders:

- `index.html`
- `app.html`
- `assets/`
- `src/`
- `docs/`
- `tools/`
- `package.json`
- `pnpm-lock.yaml`
- `vite.config.ts`
- `tsconfig.json`
- `.nojekyll`

Do not upload `node_modules`.

### GitHub Actions

1. Push this folder to a GitHub repository.
2. In repository settings, open **Pages**.
3. Set the source to **GitHub Actions**.
4. Push to `main`. The included workflow builds Vite and publishes `dist`.
