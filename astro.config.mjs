import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],

  devToolbar: {
    enabled: false
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    }
  },

  output: "hybrid",
  adapter: vercel(),
});