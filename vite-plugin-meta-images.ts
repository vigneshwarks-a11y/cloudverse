import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { injectRouteSeo } from './server/seo';

/**
 * Vite plugin that updates og:image and twitter:image meta tags
 * to point to the app's opengraph image with the correct Replit domain.
 */
export function metaImagesPlugin(): Plugin {
  let lastRoutePath = '/';

  return {
    name: 'vite-plugin-meta-images',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const rawPath = (req.url || '/').split('?')[0];
        if (req.method === 'GET' && isHtmlRoutePath(rawPath)) {
          lastRoutePath = rawPath;
        }
        next();
      });
    },
    transformIndexHtml(html, ctx) {
      const routePath =
        ctx?.path && ctx.path !== '/index.html' ? ctx.path : lastRoutePath;
      if (process.env.DEBUG_ROUTE_META === '1') {
        console.log('[meta-images] transform path:', routePath);
      }
      html = injectRouteSeo(html, routePath);

      const baseUrl = getDeploymentUrl();
      if (!baseUrl) {
        log('[meta-images] no Replit deployment domain found, skipping meta tag updates');
        return html;
      }

      // Check if opengraph image exists in public directory
      const publicDir = path.resolve(process.cwd(), 'client', 'public');
      const opengraphPngPath = path.join(publicDir, 'opengraph.png');
      const opengraphJpgPath = path.join(publicDir, 'opengraph.jpg');
      const opengraphJpegPath = path.join(publicDir, 'opengraph.jpeg');

      let imageExt: string | null = null;
      if (fs.existsSync(opengraphPngPath)) {
        imageExt = 'png';
      } else if (fs.existsSync(opengraphJpgPath)) {
        imageExt = 'jpg';
      } else if (fs.existsSync(opengraphJpegPath)) {
        imageExt = 'jpeg';
      }

      if (!imageExt) {
        log('[meta-images] OpenGraph image not found, skipping meta tag updates');
        return html;
      }

      const imageUrl = `${baseUrl}/opengraph.${imageExt}`;

      log('[meta-images] updating meta image tags to:', imageUrl);

      html = html.replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/g,
        `<meta property="og:image" content="${imageUrl}" />`
      );

      html = html.replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/g,
        `<meta name="twitter:image" content="${imageUrl}" />`
      );

      return html;
    },
  };
}

function getDeploymentUrl(): string | null {
  if (process.env.REPLIT_INTERNAL_APP_DOMAIN) {
    const url = `https://${process.env.REPLIT_INTERNAL_APP_DOMAIN}`;
    log('[meta-images] using internal app domain:', url);
    return url;
  }

  if (process.env.REPLIT_DEV_DOMAIN) {
    const url = `https://${process.env.REPLIT_DEV_DOMAIN}`;
    log('[meta-images] using dev domain:', url);
    return url;
  }

  return null;
}

function log(...args: any[]): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(...args);
  }
}

function isHtmlRoutePath(pathname: string): boolean {
  if (!pathname) return false;
  if (pathname === '/' || pathname === '/index.html') return true;

  if (pathname.startsWith('/@') || pathname.startsWith('/__')) return false;

  return !/\.[a-z0-9]+$/i.test(pathname);
}
