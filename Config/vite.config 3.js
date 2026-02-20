import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Ensures the build output goes to 'dist', which Vercel detects by default
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),      // Landing page
        dashboard: resolve(__dirname, 'dashboard.html') // Artist panel
      }
    }
  },
  // Fixes potential path issues with Vercel's cleanUrls
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});


import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Redirects API calls locally
    },
  },
  build: {
    outDir: 'dist', // Production build folder
  },
});

