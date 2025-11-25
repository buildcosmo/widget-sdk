import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cosmo } from '@buildcosmo/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cosmo()
  ],
});
