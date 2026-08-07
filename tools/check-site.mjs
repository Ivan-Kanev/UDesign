import { readFile, stat } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "app.html",
  "src/styles.css",
  "src/main.tsx",
  "src/App.tsx",
  "src/data.ts",
  "src/motion/useMotionSystem.ts",
  "src/visuals/HeroScene.tsx",
  "assets/favicon.svg",
  "assets/site",
  "assets/apps/ufood.png",
  "assets/apps/avocue.png",
  "assets/apps/switchair.png",
  "assets/apps/budgetflow.png",
  "assets/apps/uproxy.png",
  "assets/apps/ucircuit.PNG",
  "assets/apps/gitbudget.PNG",
  "assets/apps/circuitlabdesigner.png",
  "assets/appstore-connect/uperifery.png",
  "assets/appstore-connect/uplugpay.png",
  "assets/appstore-connect/ucircuit.png",
  "assets/appstore-connect/gitbudgetstudio.png",
  "assets/appstore-connect/switchair.png",
  "assets/appstore-connect/avocue.png",
  "assets/appstore-connect/ufood.png",
  "assets/appstore-connect/budgetflowstudio.png",
  "assets/appstore-connect/uproxi.png",
  "assets/appstore-connect/circuitlab-designer.png",
  ".nojekyll",
  "README.md",
  "docs/website-development-prompt.md"
];

await Promise.all(requiredFiles.map((file) => stat(file)));

const html = await readFile("index.html", "utf8");
const appHtml = await readFile("app.html", "utf8");
const css = await readFile("src/styles.css", "utf8");
const app = await readFile("src/App.tsx", "utf8");
const data = await readFile("src/data.ts", "utf8");
const motion = await readFile("src/motion/useMotionSystem.ts", "utf8");
const three = await readFile("src/visuals/HeroScene.tsx", "utf8");
const prompt = await readFile("docs/website-development-prompt.md", "utf8");

const checks = [
  ["title", html.includes("<title>UDesign by Ivan Kanev</title>")],
  ["description", appHtml.includes("UPerifery") && appHtml.includes("UPlugPay")],
  ["published root", html.includes("./assets/site/") && !html.includes("/src/main.tsx")],
  ["vite source entry", appHtml.includes('src="/src/main.tsx"')],
  ["sections", ["ecosystem", "apps", "identity", "about", "contact", "studio"].every((id) => app.includes(`id="${id}"`)) && !app.includes('id="status"')],
  ["reduced motion", css.includes("prefers-reduced-motion")],
  ["keyboard skip link", app.includes("Skip to content")],
  ["gsap scrolltrigger", motion.includes("ScrollTrigger")],
  ["lenis", motion.includes("Lenis")],
  ["three hero", three.includes("THREE")],
  ["technology prompt", prompt.includes("React, TypeScript, and Vite") && prompt.includes("GSAP ScrollTrigger")],
  ["professional contact", app.includes("handleContactSubmit") && app.includes("CONTACT_ENDPOINT") && app.includes("fetch(CONTACT_ENDPOINT") && app.includes("Send directly") && app.includes("replyTo") && app.includes("About Ivan")],
  ["working app filters", app.includes("AppFilterId") && app.includes("activeAppFilter") && app.includes("aria-pressed") && app.includes("data-filter") && css.includes(".filter-result")],
  ["language switcher", app.includes("udesign-language") && app.includes("languageOptions") && app.includes("localizedCopy") && app.includes("flag") && app.includes("Deutsch") && app.includes("Russian")],
  ["theme switcher", app.includes("udesign-theme") && app.includes("setTheme") && css.includes(':root[data-theme="light"]') && css.includes(".site-controls")],
  ["real app content", data.includes("UPerifery") && data.includes("UPlugPay") && data.includes("Ready for Distribution")]
];

const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);

if (failed.length > 0) {
  console.error(`Site check failed: ${failed.join(", ")}`);
  process.exit(1);
}

console.log("UDesign static site check passed.");
