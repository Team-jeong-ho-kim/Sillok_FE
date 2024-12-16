import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: "./.vite",
  resolve: {
    
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: { port: 3001 },
  worker: {
    format: "es"
  }
})
