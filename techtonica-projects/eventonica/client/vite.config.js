import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Replace with your Express server's address
      '/api/events': 'http://localhost:8080', 
    },
  },
  test: {
    environment: 'jsdom', 
    globals: true,  
  },
})
