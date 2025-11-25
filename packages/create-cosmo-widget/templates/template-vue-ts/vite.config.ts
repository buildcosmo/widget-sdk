import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { cosmo } from '@buildcosmo/vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    cosmo()
  ],
});
