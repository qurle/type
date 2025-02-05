import { state } from '@scripts/state'

export function toggleNotes(show: boolean) {
	if (show) {
		state.editorEl.classList.add('collapsed')
		setTimeout(() => {
			state.rootEl.classList.add('notes-shown')
		}, 50)
	} else {
		state.rootEl.classList.remove('notes-shown')
		setTimeout(() => {
			state.editorEl.classList.remove('collapsed')
		}, 50)
	}
}