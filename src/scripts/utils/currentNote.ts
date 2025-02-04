export function setCurrent(id: string, editorEl: HTMLElement) {
	editorEl.dataset.id = id
	localStorage.setItem('opened', id)
	return id
}

export function getCurrent() {
	return localStorage.getItem('opened') || ''
}