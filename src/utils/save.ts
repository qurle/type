import type { Crepe } from '@milkdown/crepe'

export function save(editor: Crepe) {
	const note = editor.getMarkdown()
	localStorage.setItem('note', note)
}
