import { cp, copyFile, mkdir, rename, rm, stat } from "node:fs/promises";
import { dirname } from "node:path";

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function copyFileEnsuringDirectory(source, target) {
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

if (!(await exists("dist/app.html"))) {
  throw new Error("Expected dist/app.html after Vite build.");
}

await rm("dist/index.html", { force: true });
await rename("dist/app.html", "dist/index.html");

await cp("assets/appstore-connect", "dist/assets/appstore-connect", { recursive: true });
await cp("assets/apps", "dist/assets/apps", { recursive: true });
await copyFileEnsuringDirectory("assets/favicon.svg", "dist/assets/favicon.svg");
await copyFile(".nojekyll", "dist/.nojekyll");

await cp("dist/assets/site", "assets/site", { recursive: true });
await copyFile("dist/index.html", "index.html");
