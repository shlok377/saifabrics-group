import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        infrastructure: resolve(__dirname, 'infrastructure.html'),
        industries: resolve(__dirname, 'industries.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
