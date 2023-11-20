// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src'), // Cambié '/src' a '/@' para evitar conflictos
    },
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 5000,
  },
  rollupOptions: {
    // Agrega la configuración de resolución de alias para Rollup
    plugins: [
      {
        name: 'vite-plugin-alias',
        configure(aliases) {
          // Usa el mismo alias que en la configuración de Vite para Rollup
          aliases['/@'] = path.resolve(__dirname, 'src');
        },
      },
    ],
  },
});
