import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { cosmo } from '@buildcosmo/vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    cosmo()
  ],
});
