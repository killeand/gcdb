import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    https: {
      key: fs.readFileSync('./ssltls/key.pem'),
      cert: fs.readFileSync('./ssltls/cert.pem'),
    },
  }
})
