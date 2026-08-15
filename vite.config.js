import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// The repo predates this migration and keeps JSX inside plain `.js` files
// (contexts, entry point). Rather than churn every import path, teach esbuild
// to parse `.js` in src/ as JSX. Remove once those files are renamed to .jsx.
const jsxInJs = {
  name: 'jsx-in-js',
  enforce: 'pre',
  config: () => ({
    esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
    optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  }),
};

export default defineConfig({
  plugins: [jsxInJs, react()],
  resolve: {
    alias: { '@': path.resolve(process.cwd(), 'src') },
  },
  server: { port: 3000, open: true },
  build: {
    target: 'es2020',
    sourcemap: false,
    // Keep the 3D world and other heavy leaves in their own chunks so the
    // main portfolio never pays for them. Route-level React.lazy does the
    // rest; this just stops vendor churn from invalidating app chunks.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/three|@react-three/.test(id)) return 'three';
          if (/gsap/.test(id)) return 'gsap';
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion';
          if (/react-dom|react-router|scheduler/.test(id)) return 'react-vendor';
        },
      },
    },
  },
});
