import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://expenses-tracker-jn6x.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // ✅ fixed
      }
    }
  }
})
