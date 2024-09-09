import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import frappeui from 'frappe-ui/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    frappeui(), 
    vue(), 
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PWA', 
        short_name: 'PWA', 
        start_url: '/pwa', 
        display: 'standalone', 
        background_color: '#ffffff', 
        theme_color: '#ffffff', 
        icons: [
          {
            src: '/assets/pwa_template/manifest/images_pwa_app.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/pwa_template/manifest/images_pwa_app.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: `../${path.basename(path.resolve('..'))}/public/pwa`,
    emptyOutDir: true,
    target: 'es2015',
    logLevel: 'debug',
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['frappe-ui > feather-icons', 'showdown', 'engine.io-client'],
  },
})
