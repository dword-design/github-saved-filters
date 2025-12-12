import { defineConfig } from 'wxt';

export default defineConfig({
  autoIcons: { developmentIndicator: false },
  manifest: {
    name: 'GitHub Saved Filters',

    permissions: ['storage'],
  },
  modules: ['@wxt-dev/auto-icons'],
});
