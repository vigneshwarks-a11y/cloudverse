import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectRouteSeo } from "./seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));
  const indexTemplate = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    const html = injectRouteSeo(indexTemplate, req.originalUrl);
    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  });
}
