import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  base: process.env.NODE_ENV === 'production' ? '/nomouse-client/' : './',
  build: {
    outDir: 'dist',
  },
})
