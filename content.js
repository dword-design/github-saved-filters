import { property } from '@dword-design/functions'
import buildHeaderNav from './model/build-header-nav'
import buildActionButton from './model/build-action-button'

const run = async () => {
  if (!['/issues', '/pulls'].includes(window.location.pathname)) {
    return undefined
  }

  const savedFilters =
    (browser.storage.sync.get('githubSavedFilters')
      |> await
      |> property('githubSavedFilters')) || []

  return Promise.all([
    buildHeaderNav({ savedFilters }),
    buildActionButton({ savedFilters }),
  ])
}

run()
