export function setCurrent(localId: string, editorEl: HTMLElement) {
	editorEl.dataset.id = localId
	localStorage.setItem('opened', localId)
	return localId
}

export function getCurrent() {
	return localStorage.getItem('opened') || ''
}