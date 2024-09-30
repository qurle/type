export function toggleNotes(show: boolean, editorEl: HTMLElement, rootEl: HTMLElement) {
	if (show) {
		editorEl.classList.add('collapsed')
		setTimeout(() => {
			rootEl.classList.add('notes-shown')
		}, 50)
	} else {
		rootEl.classList.remove('notes-shown')
		setTimeout(() => {
			editorEl.classList.remove('collapsed')
		}, 50)
	}
}