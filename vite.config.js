import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI-SEO-Audit-Tool/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
