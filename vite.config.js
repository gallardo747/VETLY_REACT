// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //DEBO MEJORAR ÉSTE ALIAS porque no me muestra las imagenes
  //-----------------------------------------------------------------------
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src'), // Cambié '/src' a '/@' para evitar conflictos
    },
  },
  //----------------------------------------------------------------------
  build: {
    // Ajusta la configuración de la salida (output) según sea necesario
    outDir: 'build',
    // Puedes ajustar la ruta del servidor si es necesario
    assetsDir: 'assets',
    chunkSizeWarningLimit: 5000,
  },
});
