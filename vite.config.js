import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'serve-root-assets',
      configureServer(server) {
        server.middlewares.use('/assets', (req, res, next) => {
          const rawUrl = req.url.split('?')[0];
          const decoded = decodeURIComponent(rawUrl.replace(/^\//, ''));
          const filePath = path.join(process.cwd(), 'assets', decoded);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            return fs.createReadStream(filePath).pipe(res);
          }
          next();
        });
      }
    },
    {
      name: 'html-transform',
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          return html
            .replace('<link rel="stylesheet" crossorigin href="./dist/assets/app.css">', '')
            .replace(
              '<script type="module" crossorigin src="./dist/assets/app.js"></script>',
              '<script type="module" src="/src/main.jsx"></script>'
            );
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    copyPublicDir: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/app.[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
