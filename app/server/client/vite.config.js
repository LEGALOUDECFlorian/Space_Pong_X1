import { defineConfig } from 'vite';

export default defineConfig({
  root: './client',
  build: {
    outDir: '../dist', // Le répertoire de sortie pour les fichiers construits
  },
  server: {
    port: 4000, // Ou un autre port que vous préférez
  },
});
