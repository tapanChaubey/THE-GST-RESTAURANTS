import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    envDir: "./",
    envFiles: [".env.production"]
  },
  envDir: './',
  envFiles: ['.env.development'],
})
