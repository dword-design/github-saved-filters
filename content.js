import { property } from '@dword-design/functions'
import buildHeaderNav from './model/build-header-nav'
import buildActionButton from './model/build-action-button'
import isApplicable from './model/is-applicable'

const run = async () => {
  if (!isApplicable) {
    return undefined
  }

  const savedFilters =
    (browser.storage.sync.get('filters') |> await |> property('filters')) || []

  return Promise.all([
    buildHeaderNav({ savedFilters }),
    buildActionButton({ savedFilters }),
  ])
}

run()
