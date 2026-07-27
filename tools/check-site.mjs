import { readFile, stat } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "src/styles.css",
  "src/main.js",
  "assets/favicon.svg",
  ".nojekyll",
  "README.md"
];

await Promise.all(requiredFiles.map((file) => stat(file)));

const html = await readFile("index.html", "utf8");
const css = await readFile("src/styles.css", "utf8");
const js = await readFile("src/main.js", "utf8");

const checks = [
  ["title", html.includes("<title>UDesign by Ivan Kanev</title>")],
  ["description", html.includes("premium software ecosystem")],
  ["sections", ["ecosystem", "identity", "products", "contact"].every((id) => html.includes(`id="${id}"`))],
  ["reduced motion", css.includes("prefers-reduced-motion")],
  ["keyboard skip link", html.includes("Skip to content")],
  ["canvas motion", js.includes("signal-canvas")]
];

const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);

if (failed.length > 0) {
  console.error(`Site check failed: ${failed.join(", ")}`);
  process.exit(1);
}

console.log("UDesign static site check passed.");
