// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://https://toms-astro-blog-site.netlify.app/",
  integrations: [sitemap(), react()],
});
