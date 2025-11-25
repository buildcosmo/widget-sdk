import { defineConfig } from 'vite';
import { cosmo } from '@buildcosmo/vite-plugin';

export default defineConfig({
  plugins: [
    cosmo()
  ],
});
