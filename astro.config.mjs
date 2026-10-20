import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://xnye.github.io',
  // Static output, no adapters, no runtime framework.
  output: 'static',
  build: {
    // Emit /test/index.html so the URL is /test (and /test/ works too).
    format: 'directory',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
