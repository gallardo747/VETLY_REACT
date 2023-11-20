// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ajusta la configuración de la salida (output) según sea necesario
    outDir: 'build',
    // Puedes ajustar la ruta del servidor si es necesario
    assetsDir: 'assets',
    chunkSizeWarningLimit: 5000,
  },
});
