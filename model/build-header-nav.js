import { endent, map, join } from '@dword-design/functions'
import { SLUG } from './variables.config'

export default options => {
  if (options.savedFilters.length === 0) {
    return
  }
  const $headerNav = document.querySelector('.Header nav')
  let $savedFilters = $headerNav.querySelector(`.${SLUG}-header-nav`)
  if ($savedFilters) {
    $savedFilters.remove()
  }
  $savedFilters = document.createElement('details')
  $savedFilters.classList.add(
    `${SLUG}-header-nav`,
    'dropdown',
    'details-overlay',
    'details-reset'
  )
  $savedFilters.innerHTML = endent`
    <summary class="Header-link py-2 py-lg-3 mr-0 mr-lg-3" aria-haspopup="menu" role="button">
      Saved filters <span class="dropdown-caret"></span>
    </summary>
    <details-menu class="dropdown-menu dropdown-menu-se mt-n2" role="menu">
      ${
        options.savedFilters
        |> map(
          filter =>
            `<a role="menuitem" class="dropdown-item" href="/issues?q=${encodeURIComponent(
              filter.query
            )}">${filter.name}</a>`
        )
        |> join('\n')
      }
    </details-menu>
  `
  $headerNav.prepend($savedFilters)
}
