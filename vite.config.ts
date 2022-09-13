import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost'
        }
    },
    plugins: [
        react(),
        laravel({
            input: ['resources/ts/index.tsx', 'resources/css/app.css'],

            refresh: true,
        }),
    ]
})
