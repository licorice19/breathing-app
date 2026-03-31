import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'vite.svg'],
      manifestFilename: 'manifest.webmanifest',
      manifest: {
        name: 'Breathing App',
        short_name: 'Breathing',
        description: 'App for breathing exercises',
        start_url: '/breathing-app/',
        scope: '/breathing-app/',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/breathing-app/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/breathing-app/vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  base: '/breathing-app/',
})
