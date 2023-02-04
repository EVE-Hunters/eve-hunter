import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },

  server: {
    hmr: {
      host: 'localhost',
    },
  },
  plugins: [
    react(),
    laravel({
      input: ['resources/scripts/app.tsx'],
      refresh: true,
    }),
    splitVendorChunkPlugin(),
  ],
})
