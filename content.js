import { property } from '@dword-design/functions'

import buildActionButton from './model/build-action-button.js'
import buildHeaderNav from './model/build-header-nav.js'
import isApplicable from './model/is-applicable.js'

const run = async () => {
  const savedFilters =
    (browser.storage.sync.get('filters') |> await |> property('filters')) || []

  return Promise.all([
    buildHeaderNav({ savedFilters }),
    ...(isApplicable ? [buildActionButton({ savedFilters })] : []),
  ])
}
run()
