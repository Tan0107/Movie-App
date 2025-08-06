import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages under a repo like github.com/yourname/movieapp
export default defineConfig({
  plugins: [react()],
  base: '/movieapp/', // <-- match your repo name
  build: {
    outDir: 'dist'
  }
})
