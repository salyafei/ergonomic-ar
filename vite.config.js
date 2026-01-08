import { defineConfig } from 'vite';
import { resolve } from 'path';

// For GitHub Pages deployment, set base to your repo name
// e.g., base: '/ergonomic-ar/' if your repo is github.com/username/ergonomic-ar
export default defineConfig({
  base: '/ergonomic-ar/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        surfaceDetection: resolve(__dirname, 'src/scenes/surface-detection.html'),
      },

      output: {
        manualChunks: {
          'aframe': ['aframe'],
          'three': ['three'],
        },
      },
    },

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  server: {
    port: 3000,
    host: true,
    https: false, // Set to true for local HTTPS testing with self-signed cert
  },

  preview: {
    port: 4173,
    host: true,
  },

  publicDir: 'public',

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },
});
