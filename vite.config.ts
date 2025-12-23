import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (Sécurisé : Whitelist)
  // Vercel injecte tout, donc on ne charge que ce qui est nécessaire au frontend
  const env = loadEnv(mode, (process as any).cwd(), ['VITE_', 'NEXT_', 'EXPO_', 'API_KEY', 'GEMINI_', 'GROQ_', 'VERTEX_']);

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