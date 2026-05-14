import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-seo-audit-tool/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
