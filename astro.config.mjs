import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import vercel from '@astrojs/vercel'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),

  integrations: [icon()],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    }
  },

  markdown: {
    syntaxHighlight: false,
  },

  redirects: {
    // Home page
    '/hi': '/hello',
    '/good-morning': '/hello',
    '/good-afternoon': '/hello',
    '/good-evening': '/hello',
    '/about': '/hello',
    '/welcome': '/hello',

    // Example note
    '/example': '/note/example',

    // External redirects
    '/git': 'https://github.com/qurle/type'

  },

  devToolbar: {
    enabled: false
  },
});