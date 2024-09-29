export function save(markdown: string, saveRef: 'autosave' | 'shortcut' = 'autosave') {
	localStorage.setItem('note', markdown)
	console.debug(`Saved note by ${saveRef}`)

}
