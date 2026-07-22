import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {
    defineConfig
} from 'vite';
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            
            manifest: {
                name: 'Versec Weather',
                short_name: 'Versec Weather',
                description: 'The best weather app, clear design',
                theme_color: '#111827',
                background_color: '#111827',
                start_url: '/',
                scope: '/',
                display: 'standalone',
                

                icons: [
                    {
                        src: '/icons/icon-192.jpg',
                        sizes: '192x192',
                        type: 'image/jpeg'
                    },
                    {
                        src: '/icons/icon-512.jpg',
                        sizes: '512x512',
                        type: 'image/jpeg'
                    }
                ]
            }
        })
    ],
    esbuild: {
        jsx: 'automatic',
    },
});