import { find } from '@dword-design/functions'
import openSaveDialog from './open-save-dialog'
import openDeleteDialog from './open-delete-dialog'
import { SLUG } from './variables.config'

export default async options => {
  const $subnav = document.querySelector('.subnav')
  const $query = document.querySelector('.subnav-search-input')
  const filter = options.savedFilters |> find({ query: $query.value })
  let $actionButton = document.querySelector(`.${SLUG}-button`)
  if ($actionButton) {
    $actionButton.remove()
  }
  $actionButton = document.createElement('button')
  $actionButton.innerText = filter ? 'Delete' : 'Save'
  $actionButton.classList.add(
    `${SLUG}-button`,
    'btn',
    ...(filter ? ['btn-danger'] : []),
    'ml-md-2',
    'mt-2',
    'mt-md-0',
    'flex-self-start'
  )
  $subnav.append($actionButton)
  $actionButton.onclick = () => {
    if (filter) {
      openDeleteDialog(filter, options)
    } else {
      openSaveDialog(options)
    }
  }
}
