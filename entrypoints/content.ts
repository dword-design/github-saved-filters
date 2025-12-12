import { browser } from 'wxt/browser';

export default defineContentScript({
  main: async () => {
    const { filters: savedFilters = [] } =
      await browser.storage.sync.get('filters');
    return Promise.all([
      buildHeaderNav({ savedFilters }),
      ...(isApplicable ? [buildActionButton({ savedFilters })] : []),
    ]);
  },
  matches: ['https://github.com/*'],
});
