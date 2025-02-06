import { clearEditor } from '@scripts/editor/clear'
import { save, toggleAutosave } from '@scripts/note/save'

export function initNavigationListener() {
	window.addEventListener('popstate', (e) => {
		e.preventDefault()
		console.debug(e)
		if (e.state.page === null) {
			save('clear')
			clearEditor()
		}
	})
}

export function initUnloadListener() {
	window.addEventListener('beforeunload', () => {
		save('unload')
	})
}
export function initFocusListener() {
	document.addEventListener('visibilitychange', () => {
		toggleAutosave(!document.hidden)
	})
}