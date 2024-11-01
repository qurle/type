import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
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
    '/hi': '/hello',
    '/good-morning': '/hello',
    '/good-afternoon': '/hello',
    '/good-evening': '/hello',
    '/about': '/hello',
    '/welcome': '/hello',

    '/example': '/note/example',
  },

  devToolbar: {
    enabled: false
  },
});