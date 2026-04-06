import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  base: "/AREDL-Clan-Coordination-Public/",
  plugins: [
    react(),
    basicSsl(),
    tailwindcss(),
  ],
  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:443',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://localhost:443',
        changeOrigin: true,
        secure: false,
      },
      '/login': {
        target: 'https://localhost:443',
        changeOrigin: true,
        secure: false,
      },
      '/logout': {
        target: 'https://localhost:443',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})