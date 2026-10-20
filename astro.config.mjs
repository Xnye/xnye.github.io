import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xnye.github.io',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      // Emit both palettes as CSS variables and let the site's own theme
      // switch choose one, instead of baking a single theme in.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
