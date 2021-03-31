import { endent, find } from '@dword-design/functions'

import getDeleteDialog from './get-delete-dialog'
import getSaveDialog from './get-save-dialog'
import { SLUG } from './variables.config'

export default options => {
  const build = () => {
    const $subnav = document.querySelector('.subnav')

    const $query = document.querySelector('.subnav-search-input')

    const filter = options.savedFilters |> find({ query: $query.value })
    let $details = document.querySelector(`.${SLUG}-details`)
    if ($details) {
      $details.remove()
    }
    $details = document.createElement('details')
    $details.classList.add(
      `${SLUG}-details`,
      'details-reset',
      'details-overlay',
      'details-overlay-dark',
      'ml-md-2',
      'mt-2',
      'mt-md-0'
    )
    $subnav.append($details)

    const $summary = document.createElement('summary')
    $summary.innerHTML = filter
      ? endent`
        <svg class="octicon mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" width="12" height="16" aria-hidden><path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path></svg>
        Delete
      `
      : endent`
        <svg class="octicon mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="13" height="13" aria-hidden><path fill-rule="evenodd" d="M12 0H4c-.73 0-1 .27-1 1v15l5-3.09L13 16V1c0-.73-.27-1-1-1z"></path></svg>
        Save
      `
    $summary.classList.add(
      'btn',
      'd-inline-flex',
      'flex-items-center',
      ...(filter ? ['btn-danger'] : [])
    )
    $summary.setAttribute('aria-haspopup', 'dialog')
    $details.append($summary)
    $details.append(
      filter ? getDeleteDialog(filter, options) : getSaveDialog(options)
    )
    $query.oninput = build
  }

  const observer = new MutationObserver(build)
  observer.observe(document.body, { childList: true })
  build()
}
