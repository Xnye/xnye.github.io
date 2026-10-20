import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xnye.github.io',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
