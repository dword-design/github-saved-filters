import { property } from '@dword-design/functions'

import buildActionButton from './model/build-action-button'
import buildHeaderNav from './model/build-header-nav'
import isApplicable from './model/is-applicable'

const run = async () => {
  const savedFilters =
    (browser.storage.sync.get('filters') |> await |> property('filters')) || []
  return Promise.all([
    buildHeaderNav({ savedFilters }),
    ...(isApplicable ? [buildActionButton({ savedFilters })] : []),
  ])
}
run()
