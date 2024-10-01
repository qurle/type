import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'

export function load(editor: Editor, editorEl: HTMLElement, note: Note = null) {
	if (!note)
		return

	editor.action(insert(note.content))
	editorEl.focus()
	editorEl.dataset.id = note.id

	return note.id
}