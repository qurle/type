import { exportFile } from '@scripts/actions/export'
import { publish } from '@scripts/actions/publish'
import { save } from '@scripts/note/save'
import { state } from '@scripts/state'
import { getByClass } from '@scripts/utils/getElements'
import { clearEditor } from '@scripts/editor/clear'
import { unlock } from '@scripts/editor/lock'
import { openFilePicker } from '@scripts/actions/openFilePicker'

export function initShortcuts() {
	document.addEventListener('keydown', (e) => {
		// Ctrl / Cmd actions
		if (e.ctrlKey || e.metaKey) {
			switch (e.code) {
				case 'KeyS': {
					if (e.repeat) return
					e.preventDefault()
					if (state.empty) return

					if (e.shiftKey)
						exportFile()
					else
						save('shortcut')

					return
				}
				case 'KeyP': {
					if (e.repeat) return
					if (!e.shiftKey) return
					e.preventDefault()
					if (state.empty) return

					save('publish', true)
					publish()
					return
				}
				case 'KeyE': {
					if (e.repeat) return
					if (!e.shiftKey) return
					e.preventDefault()
					if (state.empty) return

					e.preventDefault()
					unlock()
					save('copy')
					return
				}
				case 'KeyK': {
					if (e.repeat) return
					e.preventDefault()
					state.menu.toggle()
					return
				}
				// Mortal combat mode
				case 'KeyO': {
					if (e.repeat) return
					e.preventDefault()
					openFilePicker()
					return
				}
			}
		} else {
			switch (e.code) {
				case 'Escape': {
					e.preventDefault()
					if (getByClass('is-open', document.body)) {
						return
					}
					if (state.menu.opened) {
						state.menu.toggle(false)
						state.editorEl.focus()
						return
					}
					save('clear')
					clearEditor()
					return
				}
			}
		}
	})
}