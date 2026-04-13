import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    allowedHosts: [
      '18f1-2a09-bac6-d7c4-10dc-00-1ae-23.ngrok-free.app',
      '.ngrok-free.app',
    ],
  },
})
