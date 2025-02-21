import { exportFile } from '@scripts/actions/export'
import { publish } from '@scripts/actions/publish'
import { save } from '@scripts/note/save'
import { state } from '@scripts/state'
import { getCurrentId } from '@scripts/utils/currentNote'
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
					e.preventDefault()
					if (e.repeat) return
					if (state.empty) return

					if (e.shiftKey) {
						exportFile()
					} else {
						save('shortcut')
					}
					return
				}
				case 'KeyP': {
					e.preventDefault()
					if (e.repeat) return
					if (!e.shiftKey) return
					if (state.empty) return

					save('publish', true)
					publish()
					return
				}
				case 'KeyE': {
					e.preventDefault()
					if (e.repeat) return
					if (!e.shiftKey) return
					if (state.empty) return

					unlock()
					save('copy')
					return
				}
				case 'KeyK': {
					e.preventDefault()
					if (e.repeat) return
					console.log('key k')
					state.menu.toggle()
					return
				}
				// Mortal combat mode
				case 'KeyO': {
					e.preventDefault()
					if (e.repeat) return
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
					// Rewrite this part to state like menu.open
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