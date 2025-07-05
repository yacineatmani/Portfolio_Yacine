import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  if (mode === 'static') {
    return {
      base: '/portifolio_Yacine/', // Nom exact du repository GitHub
      plugins: [react()],
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html')
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      css: {
        postcss: './postcss.config.js'
      },
      define: {
        __APP_ENV__: JSON.stringify('static')
      }
    };
  }

  return {
    plugins: [
      laravel({
        input: [
          'resources/css/app.css',
          'resources/js/app.tsx',
        ],
        refresh: true,
      }),
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/js'),
      },
    },
  };
});