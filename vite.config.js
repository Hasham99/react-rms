import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
  build: {
    chunkSizeWarningLimit: 16000,
    commonjsOptions: {
      transformMixedEsModules: true,
      // include: [/linked-dep/, /node_modules/],
    },
  },
})
