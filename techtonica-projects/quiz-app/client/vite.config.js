import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    proxy: {
      // Replace with your Express server's address
      '/api/trivia': 'http://localhost:3000', 
    },
  },
})
