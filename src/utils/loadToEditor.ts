import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'
import { focusToEnd } from '@utils/focusToEnd'

export function loadToEditor(editor: Editor, editorEl: HTMLElement, rootEl: HTMLElement, note: Note = null) {
	if (!note)
		return

	rootEl.classList.remove('show-notes')

	editor.action(insert(note.content))
	focusToEnd(editorEl)
	editorEl.dataset.id = note.id

	window.history.pushState({ page: note.id }, '')
	document.title = note.name

	return note.id
}