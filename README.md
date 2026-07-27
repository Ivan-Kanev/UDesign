# UDesign

UDesign is the umbrella identity for Ivan Kanev's ecosystem of focused software products: UCircuit, UPlugPlay, UPerifery, and future products built around the same signature letter.

The site is intentionally static and dependency-free so it can be published directly with GitHub Pages from the repository root. The brand system uses the `U` as the master mark, product names as family extensions, and a restrained dark interface with luminous cyan, signal green, white, and graphite accents.

## Brand Direction

- **Umbrella brand:** UDesign
- **Signature:** U / Ivan Kanev
- **Product family:** UCircuit, UPlugPlay, UPerifery, and future `U` applications
- **Voice:** precise, premium, calm, technical, founder-led
- **Motion language:** smooth reveals, dimensional depth, subtle cursor response, and reduced-motion support
- **Visual language:** black glass, thin rules, kinetic grids, luminous product tokens, tight typography, and reusable system spacing

## Project Structure

```text
UDesign/
  index.html
  src/
    main.js
    styles.css
  assets/
    favicon.svg
  tools/
    check-site.mjs
  README.md
  package.json
  .nojekyll
  .gitignore
```

## Local Preview

```bash
npm run dev
```

Then open `http://localhost:4173`.

## Quality Check

```bash
npm run check
```

The check validates the required static files and important page markers.

## GitHub Pages Deployment

1. Push this folder to a GitHub repository.
2. In repository settings, open **Pages**.
3. Set the source to **Deploy from a branch**.
4. Choose the default branch and `/root`.
5. Save. GitHub Pages will serve `index.html` directly.

