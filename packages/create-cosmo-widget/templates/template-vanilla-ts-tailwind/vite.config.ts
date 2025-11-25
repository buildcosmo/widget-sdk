import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { cosmo } from '@buildcosmo/vite-plugin';

export default defineConfig({
  plugins: [
    tailwindcss(),
    cosmo()
  ],
});
