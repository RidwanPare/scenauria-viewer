import { defineConfig, type Plugin } from 'vite';
import { html as viewerHtml, css as viewerCss, js as viewerJs } from '@playcanvas/supersplat-viewer';
import type { IncomingMessage, ServerResponse } from 'node:http';

function supersplatPlugin(): Plugin {
  const viewerPage = viewerHtml.replace(
    '<link rel="stylesheet" href="./index.css">',
    `<style>${viewerCss}</style>`
  );

  return {
    name: 'supersplat-viewer',

    configureServer(server) {
      // index.js du viewer : supersplat.html le référence en module relatif
      server.middlewares.use('/index.js', (_req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
        res.end(viewerJs);
      });
      server.middlewares.use('/supersplat', (_req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(viewerPage);
      });
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'supersplat.html',
        source: viewerPage,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'index.js',
        source: viewerJs,
      });
    },
  };
}

export default defineConfig({
  server: { port: 4000 },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
  plugins: [supersplatPlugin()],
});
