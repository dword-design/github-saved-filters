import { remove } from '@dword-design/functions'

import { SLUG } from './variables.config'

export default (filter, options) => {
  const $dialog = document.createElement('details-dialog')
  $dialog.setAttribute('role', 'dialog')
  $dialog.classList.add(
    `${SLUG}-dialog`,
    'Box',
    'Box--overlay',
    'd-flex',
    'flex-column',
    'anim-fade-in',
    'fast'
  )

  const $header = document.createElement('div')
  $header.classList.add('Box-header')
  $dialog.append($header)

  const $close = document.createElement('button')
  $close.classList.add('Box-btn-octicon', 'btn-octicon', 'float-right')
  $close.setAttribute('type', 'button')
  $close.setAttribute('aria-label', 'Close dialog')
  $close.innerHTML =
    '<svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>'
  $close.setAttribute('data-close-dialog', '')
  $header.append($close)

  const $title = document.createElement('h3')
  $title.classList.add('Box-title')
  $title.innerText = `Do you really want to delete filter '${filter.name}'?`
  $header.append($title)

  const $form = document.createElement('form')
  $form.onsubmit = async event => {
    event.preventDefault()
    await browser.storage.sync.set({
      filters:
        options.savedFilters
        |> remove(_filter => _filter.query === filter.query),
    })
    window.location.reload()
  }
  $dialog.append($form)

  const $footer = document.createElement('div')
  $footer.classList.add('Box-footer', 'text-right')
  $form.append($footer)

  const $cancel = document.createElement('button')
  $cancel.type = 'button'
  $cancel.classList.add('btn', 'mr-2')
  $cancel.setAttribute('data-close-dialog', '')
  $cancel.innerText = 'Cancel'
  $cancel.autofocus = true
  $footer.append($cancel)

  const $delete = document.createElement('button')
  $delete.classList.add('btn', 'btn-danger')
  $delete.type = 'submit'
  $delete.innerText = 'Delete'
  $footer.append($delete)

  return $dialog
}
