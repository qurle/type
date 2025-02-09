import { menu } from '@scripts/menu/elements'
import { exportFile } from '@scripts/note/export'
import { publish } from '@scripts/note/publish'
import { save } from '@scripts/note/save'
import { showBorders } from '@scripts/render/showBorders'
import { state } from '@scripts/state'
import { loadCurrentId } from '@scripts/utils/currentNote'
import { getByClass } from '@scripts/utils/getElements'
import { clearEditor } from '@scripts/editor/clear'
import { unlock } from '@scripts/editor/lock'
import { toggleMenu } from '@scripts/menu/toggle'

export function initShortcuts(uploadInputEl: HTMLInputElement) {
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
					publish(loadCurrentId())
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
					toggleMenu(null)
					return
				}
				// Mortal combat mode
				case 'KeyO': {
					e.preventDefault()
					if (e.repeat) return
					uploadInputEl.click()
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
					if (menu.toggleEl.classList.contains('active')) {
						toggleMenu(false)
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