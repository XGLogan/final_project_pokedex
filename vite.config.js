import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base + HashRouter lets the app work on GitHub Pages under any
// repository subpath without extra server configuration or deep-link 404s.
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
});
