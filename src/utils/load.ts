import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'
import { focusToEnd } from '@utils/focusToEnd'

export function load(editor: Editor, editorEl: HTMLElement, note: Note = null) {
	if (!note)
		return

	editor.action(insert(note.content))
	focusToEnd(editorEl)
	editorEl.dataset.id = note.id

	return note.id
}