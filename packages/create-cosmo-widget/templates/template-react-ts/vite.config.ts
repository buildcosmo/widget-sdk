import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cosmo } from '@buildcosmo/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    cosmo()
  ],
});
