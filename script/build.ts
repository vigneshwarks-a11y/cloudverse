import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, writeFile } from "fs/promises";
import path from "node:path";
import { injectRouteSeo, seoRoutePaths } from "../server/seo";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();
  await generateRouteHtmlFiles();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

async function generateRouteHtmlFiles() {
  const baseIndexPath = path.resolve("dist/public/index.html");
  const baseTemplate = await readFile(baseIndexPath, "utf-8");

  const routes = seoRoutePaths.filter((route) => route !== "/");
  for (const route of routes) {
    const routeHtml = injectRouteSeo(baseTemplate, route);
    const outputPath = path.resolve(
      "dist/public",
      route.replace(/^\/+/, ""),
      "index.html",
    );

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml, "utf-8");
  }

  console.log(`generated route HTML files: ${routes.length}`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
