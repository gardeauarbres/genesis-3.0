import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (Vercel injecte celles-ci)
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Polyfill simple pour process.env en production pour éviter "process is not defined"
      'process.env': env
    },
    envPrefix: ['VITE_', 'NEXT_', 'EXPO_'],
    build: {
      outDir: 'dist',
      target: 'esnext'
    }
  };
});